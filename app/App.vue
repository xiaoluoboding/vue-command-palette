<template>
  <div class="w-screen h-full">
    <div class="container mx-auto max-w-5xl">
      <nav class="h-20 py-8 flex-between text-[var(--app-text)]">
        <div class="font-semibold text-xl">Vue CMDK Palette</div>
        <div>
          <a
            class="opacity-50 hover:opacity-100 transition"
            href="https://github.com/xiaoluoboding/vue-cmdk-palette"
          >
            <carbon:logo-github class="h-8 w-8" />
          </a>
        </div>
      </nav>
      <header class="py-20">
        <div class="font-extrabold">
          <span
            class="text-6xl bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent"
          >
            A Command Palette
          </span>
          <div class="text-6xl text-[var(--app-text)]">for Vue</div>
        </div>
        <div
          class="text-2xl font-semibold text-slate-700 py-4 dark:text-slate-200"
        >
          Fast, composable, unstyled command palette for Vue.
        </div>
        <div class="flex gap-4 mt-16">
          <a
            class="bg-gray-200 hover:bg-gray-300 transition rounded-full text-lg font-semibold py-3 px-6 w-full sm:w-auto text-center"
            href="https://github.com/xiaoluoboding/vue-cmdk-palette"
            >Documentation</a
          >
          <button
            class="bg-emerald-400 hover:bg-emerald-500 flex items-center justify-center space-x-3 transition rounded-full text-white text-lg font-semibold py-3 px-6 w-full sm:w-auto cursor-pointer"
          >
            <span>Try it out</span
            ><span class="space-x-1 hidden sm:inline-flex"
              ><span
                class="bg-gradient-to-b text-sm from-white via-white to-gray-200 pb-0.5 pt-px px-1 text-gray-800 rounded"
                >⌘</span
              ><span
                class="bg-gradient-to-b text-sm from-white via-white to-gray-200 pb-0.5 pt-px px-1 text-gray-800 rounded"
                >K</span
              ></span
            >
          </button>
        </div>
      </header>
      <div class="w-full">
        <Vercel v-if="isOpenDialog" ref="target" />
        <CmdkPlaceholder v-else />
      </div>
      <footer class="flex-between text-[var(--app-text)]">
        <div class="py-16 flex flex-col gap-2">
          <p class="font-semibold">Vue CMDK palette</p>
          <p>Fast, composable, unstyled command palette for Vue.</p>
        </div>
        <div class="flex-center">
          <a
            class="opacity-50 hover:opacity-100 transition"
            href="https://github.com/xiaoluoboding/vue-cmdk-palette"
          >
            <carbon:logo-github class="h-8 w-8" />
          </a>
        </div>
      </footer>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useMagicKeys, onClickOutside } from '@vueuse/core'

import Linear from '~/components/cmdk/Linear.vue'
import Vercel from '~/components/cmdk/vercel/Vercel.vue'
import Raycast from '~/components/cmdk/raycast/Raycast.vue'
import CmdkPlaceholder from '~/components/common/CmdkPlaceholder.vue'

const isOpenDialog = ref(false)
const target = ref(null)

const keys = useMagicKeys()
const CmdK = keys['Meta+K']
const Escape = keys['Escape']

watch(CmdK, (v) => {
  if (v) {
    console.log('Meta + K has been pressed')
    isOpenDialog.value = true
  }
})
watch(Escape, (v) => {
  if (v) {
    console.log('Escape has been pressed')
    isOpenDialog.value = false
  }
})
// onClickOutside(target, (event) => {
//   console.log('Clicked the outside element of Command K Palette')
//   isOpenDialog.value = false
// })
</script>

<style>
html,
body,
#app {
  height: 100%;
}
body {
  margin: 0;
  padding: 0;
}

ul {
  margin: 0;
  padding: 0;
}
</style>
