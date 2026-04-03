const PROPERTY_MODEL_UID = "api::property.property";

type PropertyWhere = {
  id?: number;
  documentId?: string;
};

type PropertyRow = {
  id?: number;
  documentId?: string;
  titel?: string;
  slug?: string;
};

function toSlug(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function getDraftSafeSlug(source: string) {
  const slug = toSlug(source);

  if (slug) {
    return slug;
  }

  return `immobilie-${Date.now()}`;
}

async function getCurrentProperty(where: PropertyWhere | undefined) {
  if (!where) {
    return null;
  }

  if (where.documentId) {
    return (await strapi.db.query(PROPERTY_MODEL_UID).findOne({
      where: { documentId: where.documentId },
      select: ["id", "documentId", "titel", "slug"],
    })) as PropertyRow | null;
  }

  if (where.id) {
    return (await strapi.db.query(PROPERTY_MODEL_UID).findOne({
      where: { id: where.id },
      select: ["id", "documentId", "titel", "slug"],
    })) as PropertyRow | null;
  }

  return null;
}

async function getUniqueSlug(baseSlug: string, currentDocumentId?: string) {
  const entries = (await strapi.db.query(PROPERTY_MODEL_UID).findMany({
    where: {
      slug: {
        $startsWith: baseSlug,
      },
    },
    select: ["slug", "documentId"],
  })) as Array<Pick<PropertyRow, "slug" | "documentId">>;

  const occupied = new Set(
    entries
      .filter((entry) => entry.slug && entry.documentId !== currentDocumentId)
      .map((entry) => entry.slug as string),
  );

  if (!occupied.has(baseSlug)) {
    return baseSlug;
  }

  let counter = 2;

  while (occupied.has(`${baseSlug}-${counter}`)) {
    counter += 1;
  }

  return `${baseSlug}-${counter}`;
}

async function ensureSlug(event: {
  params: {
    data: Record<string, unknown>;
    where?: PropertyWhere;
  };
}) {
  const { data, where } = event.params;
  const currentProperty = await getCurrentProperty(where);
  const explicitSlug =
    typeof data.slug === "string" ? data.slug.trim() : undefined;
  const explicitTitle =
    typeof data.titel === "string" ? data.titel.trim() : undefined;
  const currentSlug = currentProperty?.slug?.trim() ?? "";
  const currentTitle = currentProperty?.titel?.trim() ?? "";
  const hasManualSlug = Boolean(explicitSlug && explicitSlug.length > 0);
  const hasUpdatedTitle = Boolean(explicitTitle && explicitTitle.length > 0);

  if (!hasManualSlug && !hasUpdatedTitle && currentSlug) {
    data.slug = currentSlug;
    return;
  }

  const source = explicitSlug || explicitTitle || currentTitle;

  if (!source) {
    return;
  }

  const baseSlug = getDraftSafeSlug(source);
  data.slug = await getUniqueSlug(baseSlug, currentProperty?.documentId);
}

export default {
  async beforeCreate(event: {
    params: { data: Record<string, unknown>; where?: PropertyWhere };
  }) {
    await ensureSlug(event);
  },

  async beforeUpdate(event: {
    params: { data: Record<string, unknown>; where?: PropertyWhere };
  }) {
    await ensureSlug(event);
  },
};
