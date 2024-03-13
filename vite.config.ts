import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import pages from "vite-plugin-pages";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/admin/",
  resolve: {
    alias: { "@/": `${path.resolve(__dirname, "src")}/` },
  },
  plugins: [
    vue(),
    pages({ extensions: ["vue", "ts", "js", "jsx", "tsx"] }),
    vueJsx(),
  ],
  // https://vitejs.dev/config/#server-proxy
  // api returns relative urls to attachments
  // rewrite then in dev mode
  // in production mode nginx takes care of that
  server: {
    proxy: {
      "/attachments": `https://${process.env.VITE_DOMAIN}`,
    },
  },
});
