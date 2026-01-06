// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import { resolve } from "path";
import dts from "file:///home/project/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "/home/project";
var vite_config_default = defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      include: ["src"]
    })
  ],
  build: {
    lib: {
      entry: resolve(__vite_injected_original_dirname, "src/index.ts"),
      name: "PoolvoUI",
      formats: ["es", "cjs"],
      fileName: (format) => `poolvo-ui.${format === "es" ? "js" : "cjs"}`
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime"
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJztcbmltcG9ydCBkdHMgZnJvbSAndml0ZS1wbHVnaW4tZHRzJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIGR0cyh7XG4gICAgICBpbnNlcnRUeXBlc0VudHJ5OiB0cnVlLFxuICAgICAgaW5jbHVkZTogWydzcmMnXSxcbiAgICB9KSxcbiAgXSxcbiAgYnVpbGQ6IHtcbiAgICBsaWI6IHtcbiAgICAgIGVudHJ5OiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9pbmRleC50cycpLFxuICAgICAgbmFtZTogJ1Bvb2x2b1VJJyxcbiAgICAgIGZvcm1hdHM6IFsnZXMnLCAnY2pzJ10sXG4gICAgICBmaWxlTmFtZTogKGZvcm1hdCkgPT4gYHBvb2x2by11aS4ke2Zvcm1hdCA9PT0gJ2VzJyA/ICdqcycgOiAnY2pzJ31gLFxuICAgIH0sXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgZXh0ZXJuYWw6IFsncmVhY3QnLCAncmVhY3QtZG9tJywgJ3JlYWN0L2pzeC1ydW50aW1lJ10sXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgZ2xvYmFsczoge1xuICAgICAgICAgIHJlYWN0OiAnUmVhY3QnLFxuICAgICAgICAgICdyZWFjdC1kb20nOiAnUmVhY3RET00nLFxuICAgICAgICAgICdyZWFjdC9qc3gtcnVudGltZSc6ICdqc3hSdW50aW1lJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF5TixTQUFTLG9CQUFvQjtBQUN0UCxTQUFTLGVBQWU7QUFDeEIsT0FBTyxTQUFTO0FBRmhCLElBQU0sbUNBQW1DO0FBSXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxNQUNGLGtCQUFrQjtBQUFBLE1BQ2xCLFNBQVMsQ0FBQyxLQUFLO0FBQUEsSUFDakIsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLEtBQUs7QUFBQSxNQUNILE9BQU8sUUFBUSxrQ0FBVyxjQUFjO0FBQUEsTUFDeEMsTUFBTTtBQUFBLE1BQ04sU0FBUyxDQUFDLE1BQU0sS0FBSztBQUFBLE1BQ3JCLFVBQVUsQ0FBQyxXQUFXLGFBQWEsV0FBVyxPQUFPLE9BQU8sS0FBSztBQUFBLElBQ25FO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDYixVQUFVLENBQUMsU0FBUyxhQUFhLG1CQUFtQjtBQUFBLE1BQ3BELFFBQVE7QUFBQSxRQUNOLFNBQVM7QUFBQSxVQUNQLE9BQU87QUFBQSxVQUNQLGFBQWE7QUFBQSxVQUNiLHFCQUFxQjtBQUFBLFFBQ3ZCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
