import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build:{
    rollupOptions:{
        input:{
            web: './entry/web.js',
            node: './entry/node.js'
        },
        preserveEntrySignatures: "exports-only",
        output: {
            dir: "dist",
            assetFileNames: "assets/[name][extname]",
            entryFileNames: "[name].js",
          }
    }
  }
})
