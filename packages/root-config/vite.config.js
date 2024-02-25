import "dotenv/config";
import { defineConfig } from "vite";
console.log(process.env.MF_VUE_APP_BASE_URL);
export default defineConfig({
  define: {
    "process.env.MF_VUE_APP_BASE_URL": JSON.stringify(
      process.env.MF_VUE_APP_BASE_URL
    ),
  },
  build: {
    rollupOptions: {
      input: {
        "client-config": "./browser/root-config.js",
      },
      preserveEntrySignatures: "exports-only",
      output: {
        dir: "./server/dist/client-dist",
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "[name].js",
      },
    },
  },
});
