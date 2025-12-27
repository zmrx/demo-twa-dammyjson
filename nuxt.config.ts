import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  ssr: false,

  css: ["./app/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },

  image: {
    provider: "netlify",
    domains: ["demo-twa-dammyjson.netlify.app", "cdn.dummyjson.com"],
  },

  modules: [
    // "@nuxt/hints",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/image",
    "@pinia/nuxt",
  ],
});
