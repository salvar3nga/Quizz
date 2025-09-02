import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vite.dev/config/
export default defineConfig({
  base: "/Quizz/",
  plugins: [svelte()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
