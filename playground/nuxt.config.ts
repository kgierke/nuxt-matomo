export default defineNuxtConfig({
  modules: ["../src/module"],
  matomo: {
    enabled: true,
    debug: true,
    host: "https://usage.jrvs.de",
    siteId: 3,
  },
  devtools: { enabled: true },
});
