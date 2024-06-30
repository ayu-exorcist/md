import { URL, fileURLToPath } from 'node:url'
import process from 'node:process'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

function getProcessEnvByMode(mode) {
  const processEnv = {}

  const publicEnvKeys = [
    'NODE_DEBUG',
    'VITE_SERVER_ENV',
  ]

  const env = loadEnv(mode, process.cwd())

  for (const key in publicEnvKeys) {
    processEnv[key] = env[key]
  }

  return processEnv
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === `production`

  const processEnv = getProcessEnvByMode(mode)

  return {
    base: processEnv.VITE_SERVER_ENV === `NETLIFY` ? `/` : `/md/`, // 基本路径, 建议以绝对路径跟随访问目录
    define: {
      process,
      'process.env': processEnv,
    },
    plugins: [
      vue(),
      nodePolyfills({
        include: ['path', 'util', 'timers', 'stream', 'fs'],
        overrides: {
          // Since `fs` is not supported in browsers, we can use the `memfs` package to polyfill it.
          fs: 'memfs',
        },
        protocolImports: true,
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    css: {
      devSourcemap: !isProd,
    },
    build: {
      sourcemap: !isProd,
    },
  }
})
