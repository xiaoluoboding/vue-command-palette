import { defineConfig, UserConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import UnoCSS from 'unocss/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'


// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  let userConfig: UserConfig = {}

  console.log(command)
  console.log(mode)

  if (mode === 'lib') {
    userConfig.build = {
      lib: {
        entry: resolve(__dirname, 'packages/index.ts'),
        name: 'VueCommandPalette',
        fileName: 'vue-command-palette'
      },
      outDir: 'lib',
      emptyOutDir: true,
      sourcemap: false,
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: {
            vue: 'Vue'
          }
        }
      }
    }
  }

  return {
    resolve: {
      alias: {
        '@': resolve(__dirname, '/packages'),
        '~': resolve(__dirname, '/src')
      }
    },
    plugins: [
      vue(),
      vueSetupExtend(),
      dts({
        outputDir: 'lib/types',
        include: './packages',
      }),
      UnoCSS(),
      Components({
        resolvers: [
          IconsResolver({
            prefix: ''
          })
        ]
      }),
      Icons()
    ],
    ...userConfig
  }
})
