import type { StrapiApp } from "@strapi/strapi/admin";

export default {
  config: {
    locales: ["de"],
    translations: {
      de: {
        "content-manager.plugin.name": "Inhaltsmanager",
        "components.Blocks.blocks.numberList": "Nummerierte Liste",
      },
    },
  },

  bootstrap(_app: StrapiApp) {},
};
