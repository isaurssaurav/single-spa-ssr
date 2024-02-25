import { defineConfig } from 'vite'

export default defineConfig({
  build:{
    rollupOptions:{
        input:{
            "client-config": './browser/root-config.js',
        },
        preserveEntrySignatures: "exports-only",
        output: {
            dir: "./server/dist/client-dist",
            assetFileNames: "assets/[name][extname]",
            entryFileNames: "[name].js",
          }
    }
  }
})
