export default defineNuxtConfig({
  compatibilityDate: "2024-07-15",
  modules: ["../src/module"],
  matomo: {
    enabled: true,
    debug: true,
    host: "https://usage.jrvs.de",
    siteId: 3,
  },
  devtools: { enabled: true },
});
