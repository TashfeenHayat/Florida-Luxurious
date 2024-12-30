import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  root: ".", // Ensure Vite looks in the right directory for index.html
  plugins: [react()],
  optimizeDeps: {
    exclude: ["jquery"], // Exclude jQuery from optimization
  },
});
