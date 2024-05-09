import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import stylelint from 'vite-plugin-stylelint';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills(),
    tsconfigPaths(),
    stylelint({
      fix: true,
      cache: false,
      config: {
        extends: ["stylelint-config-css-modules"],
      },
    }),
  ],
});
