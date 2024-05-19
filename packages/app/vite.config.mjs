// Plugins
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";

// Utilities
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

// Vite
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vitejs.dev/config/
export default defineConfig({
  // base: "/",
  // ssr: {
  //   noExternal: ["@blockly/blockly-component"],
  // },
  build: {
    chunkSizeWarningLimit: 550,
    rollupOptions: {
      output: {
        manualChunks: {
          "blockly/blockly": ["blockly/blockly"],
          "vuetify/vuetify": ["vuetify"],
        },
      },
    },
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) =>
            [
              "field",
              "block",
              "category",
              "xml",
              "mutation",
              "value",
              "sep",
              "shadow",
            ].includes(tag),
          whitespace: "preserve",
        },
      },
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
    }),
    // Blockly vite plugin
    viteStaticCopy({
      targets: [
        {
          src: fileURLToPath(
            new URL("./node_modules/blockly/media/*", import.meta.url),
          ),
          dest: "media",
        },
      ],
    }),
  ],
  define: { "process.env": {} },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
  },
  server: {
    // port: process.env.PORT || 8080
  },
});
