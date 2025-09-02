import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vite.dev/config/
const isProd = process.env.NODE_ENV === "production";
export default defineConfig({
  base: isProd ? "/salvar3nga.github.io/Quizz/" : "/",
  plugins: [svelte()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
