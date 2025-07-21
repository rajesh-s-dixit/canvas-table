import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

// https://vite.dev/config/
export default defineConfig({
   resolve: {
    alias: {
      "@": path.resolve(__dirname, "../"),
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@public": path.resolve(__dirname, "public"),
      "@src": path.resolve(__dirname, "src"),
      "@types": path.resolve(__dirname, "src/types"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@constants": path.resolve(__dirname, "src/constants"),
    },
  },
  plugins: [react()],
})
