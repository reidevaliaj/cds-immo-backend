import type { Core } from "@strapi/strapi";
import { randomUUID } from "node:crypto";
import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { propertySeed } from "./data/property-seed";

const CLIENT_ROLE_CODE = "client-properties-manager";
const CLIENT_ROLE_NAME = "Client Immobilien";
const PROPERTY_MODEL_UID = "api::property.property";
const CLIENT_PROPERTY_FIELDS = [
  "titel",
  "slug",
  "objektgruppe",
  "ort",
  "region",
  "preisText",
  "schlafzimmer",
  "badezimmer",
  "garage",
  "pool",
  "kurzbeschreibung",
  "beschreibung",
  "eckdaten",
  "highlights",
  "vermarktungsstatus",
  "featured",
  "vorschauBild",
  "bildergalerie",
] as const;

function createDocumentId() {
  return randomUUID().replace(/-/g, "").slice(0, 24);
}

function parseJsonValue(value: unknown) {
  if (typeof value !== "string" || value.trim().length === 0) {
    return {};
  }

  try {
    return JSON.parse(value);
  } catch {
    return {};
  }
}

async function ensureAdminPermission(
  strapi: Core.Strapi,
  action: string,
  subject: string | null,
  properties: Record<string, unknown>,
) {
  const knex = strapi.db.connection;
  const timestamp = new Date();
  const serialized = JSON.stringify(properties);

  const existingPermissions = await knex("admin_permissions")
    .where({ action, subject })
    .select(["id", "properties"]);

  const exactMatch = existingPermissions.find((permission) => {
    const normalized = JSON.stringify(parseJsonValue(permission.properties));

    return normalized === serialized;
  });

  if (exactMatch?.id) {
    return exactMatch.id as number;
  }

  const [permissionId] = await knex("admin_permissions").insert({
    document_id: createDocumentId(),
    action,
    subject,
    action_parameters: "{}",
    properties: serialized,
    conditions: "[]",
    created_at: timestamp,
    updated_at: timestamp,
    published_at: timestamp,
  });

  return Number(permissionId);
}

async function ensureClientRole(strapi: Core.Strapi) {
  const knex = strapi.db.connection;
  const timestamp = new Date();

  let role = await knex("admin_roles")
    .where({ code: CLIENT_ROLE_CODE })
    .first(["id", "code", "name"]);

  if (!role) {
    const [roleId] = await knex("admin_roles").insert({
      document_id: createDocumentId(),
      name: CLIENT_ROLE_NAME,
      code: CLIENT_ROLE_CODE,
      description:
        "Client role with access only to Immobilien and the media library.",
      created_at: timestamp,
      updated_at: timestamp,
      published_at: timestamp,
    });

    role = await knex("admin_roles")
      .where({ id: roleId })
      .first(["id", "code", "name"]);

    strapi.log.info(`[client-role] Created role "${CLIENT_ROLE_NAME}".`);
  }

  if (!role?.id) {
    return;
  }

  const propertyPermissionIds = await Promise.all(
    ["create", "read", "update"].map((actionName) =>
      ensureAdminPermission(
        strapi,
        `plugin::content-manager.explorer.${actionName}`,
        PROPERTY_MODEL_UID,
        { fields: [...CLIENT_PROPERTY_FIELDS] },
      ),
    ),
  );

  const desiredRules = [
    {
      action: "plugin::content-manager.explorer.delete",
      subject: PROPERTY_MODEL_UID,
    },
    {
      action: "plugin::content-manager.explorer.publish",
      subject: PROPERTY_MODEL_UID,
    },
    { action: "plugin::upload.read", subject: null },
    { action: "plugin::upload.assets.create", subject: null },
    { action: "plugin::upload.assets.update", subject: null },
    { action: "plugin::upload.assets.download", subject: null },
    { action: "plugin::upload.assets.copy-link", subject: null },
    { action: "plugin::upload.configure-view", subject: null },
  ];

  const allPermissions = await knex("admin_permissions").select([
    "id",
    "action",
    "subject",
  ]);

  const permissionMap = new Map<string, number>();

  for (const permission of allPermissions) {
    const key = `${permission.action}::${permission.subject ?? "null"}`;
    const current = permissionMap.get(key);

    if (!current || permission.id > current) {
      permissionMap.set(key, permission.id);
    }
  }

  const sharedPermissionIds = desiredRules
    .map((rule) =>
      permissionMap.get(`${rule.action}::${rule.subject ?? "null"}`),
    )
    .filter((value): value is number => Number.isInteger(value));

  const permissionIds = [...propertyPermissionIds, ...sharedPermissionIds];

  await knex("admin_permissions_role_lnk").where({ role_id: role.id }).del();

  if (permissionIds.length > 0) {
    await knex("admin_permissions_role_lnk").insert(
      permissionIds.map((permissionId, index) => ({
        permission_id: permissionId,
        role_id: role.id,
        permission_ord: index + 1,
      })),
    );
  }

  strapi.log.info(
    `[client-role] Synced ${permissionIds.length} permissions for "${CLIENT_ROLE_NAME}".`,
  );
}

async function ensurePublicPropertyApiAccess(strapi: Core.Strapi) {
  const roleService = strapi
    .plugin("users-permissions")
    .service("role");
  const roles = await roleService.find();
  const publicRole = roles.find((role) => role.type === "public");

  if (!publicRole?.id) {
    return;
  }

  const roleDetails = await roleService.findOne(publicRole.id);
  const propertyPermissions =
    roleDetails.permissions?.["api::property"]?.controllers?.property;

  if (!propertyPermissions) {
    return;
  }

  propertyPermissions.find.enabled = true;
  propertyPermissions.findOne.enabled = true;

  await roleService.updateRole(publicRole.id, {
    name: roleDetails.name,
    description: roleDetails.description,
    permissions: roleDetails.permissions,
  });

  strapi.log.info(
    `[public-api] Enabled property find + findOne for the public role.`,
  );
}

async function ensureSeedProperties(strapi: Core.Strapi) {
  const existingRows = await strapi.db.connection("properties")
    .select(["slug"])
    .groupBy("slug");
  const existingSlugs = new Set(
    existingRows
      .map((row: { slug?: string }) => row.slug)
      .filter((slug: string | undefined): slug is string => Boolean(slug)),
  );

  let createdCount = 0;

  for (const property of propertySeed) {
    if (existingSlugs.has(property.slug)) {
      continue;
    }

    const { coverImageUrl: _coverImageUrl, ...seedData } = property;

    await strapi.documents(PROPERTY_MODEL_UID).create({
      data: seedData,
      status: "published",
    });

    createdCount += 1;
  }

  strapi.log.info(
    `[property-seed] ${createdCount} properties created, ${propertySeed.length - createdCount} already existed.`,
  );
}

type PropertyDocument = {
  documentId?: string;
  slug?: string;
  titel?: string;
  eckdaten?: string;
  schlafzimmer?: string | null;
  badezimmer?: string | null;
  garage?: string | null;
  pool?: string | null;
  vorschauBild?: { id?: number } | null;
  bildergalerie?: Array<{ id?: number }> | null;
};

function normalizePropertySlug(slug?: string) {
  return slug?.replace(/-\d+$/, "") ?? "";
}

function normalizePropertyTitle(title?: string) {
  return (
    title
      ?.normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim() ?? ""
  );
}

function normalizeAmenityToken(value?: string) {
  return (
    value
      ?.normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ß/g, "ss")
      .toLowerCase()
      .trim() ?? ""
  );
}

function parseAmenityValues(eckdaten?: string) {
  const lines = eckdaten
    ?.split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  if (!lines?.length) {
    return {} as Record<"schlafzimmer" | "badezimmer" | "garage" | "pool", string>;
  }

  const values: Partial<
    Record<"schlafzimmer" | "badezimmer" | "garage" | "pool", string>
  > = {};

  for (const line of lines) {
    const parts = line.split(":");
    const label = normalizeAmenityToken(parts.shift());
    const rawValue = parts.join(":").trim();
    const value = rawValue || "inklusive";
    const wholeLine = normalizeAmenityToken(line);

    if (!values.schlafzimmer && label.includes("schlafzimmer")) {
      values.schlafzimmer = value;
    }

    if (
      !values.badezimmer &&
      (label.includes("badezimmer") ||
        label.includes("bader") ||
        label === "bad")
    ) {
      values.badezimmer = value;
    }

    if (
      !values.garage &&
      (label.includes("garage") ||
        label.includes("garagenplatze") ||
        label.includes("parkplatz") ||
        label.includes("stellplatz"))
    ) {
      values.garage = value;
    }

    if (!values.pool && label.includes("pool")) {
      values.pool = value;
    }

    if (!values.garage && wholeLine.includes("garage")) {
      values.garage = "inklusive";
    }

    if (!values.pool && wholeLine.includes("pool")) {
      values.pool = "inklusive";
    }
  }

  return values;
}

async function ensurePropertyMedia(strapi: Core.Strapi) {
  const uploadService = strapi.plugin("upload").service("upload");
  const fileService = strapi.plugin("upload").service("file");
  const documents = (await strapi.documents(PROPERTY_MODEL_UID).findMany({
    status: "published",
    fields: ["documentId", "slug", "titel"],
    populate: {
      vorschauBild: true,
      bildergalerie: true,
    },
  })) as PropertyDocument[];

  const propertiesBySlug = new Map<string, PropertyDocument>();
  const propertiesByTitle = new Map<string, PropertyDocument>();

  for (const document of documents) {
    const canonicalSlug = normalizePropertySlug(document.slug);

    if (canonicalSlug && !propertiesBySlug.has(canonicalSlug)) {
      propertiesBySlug.set(canonicalSlug, document);
    }

    const canonicalTitle = normalizePropertyTitle(document.titel);

    if (canonicalTitle && !propertiesByTitle.has(canonicalTitle)) {
      propertiesByTitle.set(canonicalTitle, document);
    }
  }

  let uploadedCount = 0;
  let assignedCount = 0;
  let skippedCount = 0;
  let failedCount = 0;

  for (const property of propertySeed) {
    const canonicalSlug = normalizePropertySlug(property.slug);
    const document =
      propertiesBySlug.get(canonicalSlug) ??
      propertiesByTitle.get(normalizePropertyTitle(property.titel));

    if (!document?.documentId) {
      skippedCount += 1;
      continue;
    }

    try {
      const hasPreviewImage = Boolean(document.vorschauBild?.id);
      const galleryIds = (document.bildergalerie ?? [])
        .map((image) => image.id)
        .filter((value): value is number => Number.isInteger(value));
      const needsGallery = galleryIds.length === 0;

      if (hasPreviewImage && !needsGallery) {
        continue;
      }

      const mediaKey = `property-cover-${canonicalSlug || property.slug}`;
      let media = await strapi.db.query("plugin::upload.file").findOne({
        where: { alternativeText: mediaKey },
      });

      if (!media) {
        const tmpDirectory = await mkdtemp(
          path.join(os.tmpdir(), "cds-immo-media-"),
        );

        try {
          const { file } = await fileService.fetchUrlToInputFile(
            property.coverImageUrl,
            tmpDirectory,
            15 * 1024 * 1024,
          );
          const uploaded = await uploadService.upload({
            data: {
              fileInfo: {
                name: `${canonicalSlug || property.slug}.jpg`,
                alternativeText: mediaKey,
                caption: property.titel,
              },
            },
            files: file,
          });

          media = Array.isArray(uploaded) ? uploaded[0] : uploaded;
          uploadedCount += media?.id ? 1 : 0;
        } finally {
          await rm(tmpDirectory, { recursive: true, force: true });
        }
      }

      if (!media?.id) {
        skippedCount += 1;
        continue;
      }

      await strapi.documents(PROPERTY_MODEL_UID).update({
        documentId: document.documentId,
        status: "published",
        data: {
          vorschauBild: hasPreviewImage ? document.vorschauBild?.id : media.id,
          bildergalerie: needsGallery ? [media.id] : galleryIds,
        },
      });

      assignedCount += 1;
    } catch (error) {
      failedCount += 1;
      strapi.log.warn(
        `[property-media] Failed to sync "${property.titel}" (${property.slug}): ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      );
    }
  }

  strapi.log.info(
    `[property-media] ${uploadedCount} images uploaded, ${assignedCount} properties synced with media, ${skippedCount} skipped, ${failedCount} failed.`,
  );
}

async function ensurePropertyAmenityFields(strapi: Core.Strapi) {
  const documents = (await strapi.documents(PROPERTY_MODEL_UID).findMany({
    status: "published",
    fields: [
      "documentId",
      "eckdaten",
      "schlafzimmer",
      "badezimmer",
      "garage",
      "pool",
    ] as any,
  })) as PropertyDocument[];

  let updatedCount = 0;
  let skippedCount = 0;

  for (const document of documents) {
    if (!document.documentId) {
      skippedCount += 1;
      continue;
    }

    const parsed = parseAmenityValues(document.eckdaten);
    const nextData: Partial<
      Record<"schlafzimmer" | "badezimmer" | "garage" | "pool", string>
    > = {};

    if (!document.schlafzimmer && parsed.schlafzimmer) {
      nextData.schlafzimmer = parsed.schlafzimmer;
    }

    if (!document.badezimmer && parsed.badezimmer) {
      nextData.badezimmer = parsed.badezimmer;
    }

    if (!document.garage && parsed.garage) {
      nextData.garage = parsed.garage;
    }

    if (!document.pool && parsed.pool) {
      nextData.pool = parsed.pool;
    }

    if (Object.keys(nextData).length === 0) {
      skippedCount += 1;
      continue;
    }

    await strapi.documents(PROPERTY_MODEL_UID).update({
      documentId: document.documentId,
      status: "published",
      data: nextData as any,
    });

    updatedCount += 1;
  }

  strapi.log.info(
    `[property-amenities] ${updatedCount} properties updated, ${skippedCount} skipped.`,
  );
}

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await ensureClientRole(strapi);
    await ensurePublicPropertyApiAccess(strapi);
    await ensureSeedProperties(strapi);
    await ensurePropertyAmenityFields(strapi);
    await ensurePropertyMedia(strapi);
  },
};
