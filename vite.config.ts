import { sentryVitePlugin } from '@sentry/vite-plugin'
/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 3000,
    },
    plugins: [
        react(),
        svgr(),
        sentryVitePlugin({
            org: 'labzone',
            project: 'volebna-kalkulacka',
        }),
    ],
    build: {
        sourcemap: true,
    },
})
