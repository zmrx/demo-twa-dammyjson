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

  image: (() => {
    if (import.meta.env.NODE_ENV === "development") {
      return {
        provider: "none",
      };
    }

    return {
      provider: "none",
      domains: ["demo-twa-dammyjson.netlify.app", "cdn.dummyjson.com"],
      quality: 80,
      format: ["webp", "jpeg", "png"],
      densities: [1, 2],
    };
  })(),

  modules: [
    // "@nuxt/hints",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/image",
    "@pinia/nuxt",
  ],
});
