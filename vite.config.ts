import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import UnoCSS from 'unocss/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, '/src'),
      '~': resolve(__dirname, '/app')
    }
  },
  plugins: [
    vue(),
    dts({
      include: './src'
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
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
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
})
