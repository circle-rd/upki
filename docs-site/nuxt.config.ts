export default defineNuxtConfig({
  extends: ["docus"],
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL ?? "/upki-ca/",
  },
  site: {
    url: process.env.NUXT_SITE_URL ?? "https://docs.circle-cyber.com/upki-ca",
  },
  llms: {
    title: "uPKI CA",
    description:
      "Self-hosted Certificate Authority — private PKI with zero internet dependency.",
    full: {
      title: "uPKI CA — Complete Documentation",
      description:
        "Complete documentation for uPKI CA, a self-hosted Certificate Authority for private networks with zero internet dependency.",
    },
  },
});
