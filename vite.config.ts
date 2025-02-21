import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'
import path from "path"

export default defineConfig({
 base: "/",
 plugins: [
    react(),
    tailwindcss(),
 ],
 preview: {
  port: 5000,
  strictPort: true,
 },
 server: {
  port: 5000,
  strictPort: true,
  host: true,
  origin: "http://localhost:5000",
 },
 resolve: {
   alias: {
     "@": path.resolve(__dirname, "./src"),
   },
 },
});