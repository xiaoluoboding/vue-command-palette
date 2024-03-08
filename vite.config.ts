import { URL, fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import type { UserConfig } from 'vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const userConfig: UserConfig = {}

  console.log(command)
  console.log(mode)

  if (mode === 'lib') {
    userConfig.build = {
      lib: {
        entry: resolve(__dirname, 'packages/index.ts'),
        name: 'VueCommandPalette',
        fileName: 'vue-command-palette',
      },
      outDir: 'lib',
      emptyOutDir: true,
      sourcemap: true,
      rollupOptions: {
        external: ['vue', 'fuse.js'],
        output: [
          {
            format: 'cjs',
            entryFileNames: 'vue-command-palette.cjs'
          },
          {
            format: 'es',
            entryFileNames: 'vue-command-palette.js',
            preserveModules: false
          }
        ],
      },
    }
  }

  return {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./packages', import.meta.url)),
        '~': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    plugins: [
      vue(),
      UnoCSS(),
      Components({
        resolvers: [
          IconsResolver({
            prefix: '',
          }),
        ],
      }),
      Icons(),
    ],
    ...userConfig,
  }
})
