<template>
  <div class="w-screen h-full">
    <div class="container mx-auto max-w-5xl">
      <nav class="h-20 py-4 flex-between text-[var(--app-text)]">
        <div class="font-semibold text-xl flex-center gap-2">
          <Logo class="h-6 w-6" />
          Vue CMDK Palette
        </div>
        <div class="flex-center gap-4">
          <button
            class="opacity-50 hover:opacity-100 transition"
            @click="(e) => toggleDarkmode()"
          >
            <MoonIcon class="w-6 h-6" v-if="isDark" />
            <SunIcon class="w-6 h-6" v-else />
          </button>
          <a
            class="opacity-50 hover:opacity-100 transition"
            href="https://github.com/xiaoluoboding/vue-cmdk-palette"
          >
            <carbon:logo-github class="h-6 w-6" />
          </a>
        </div>
      </nav>
      <header class="py-20">
        <div class="font-extrabold">
          <span class="text-6xl text-neon"> A Command Palette </span>
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
            @click="isOpenDialog = true"
          >
            <span>Try it out</span>
            <span class="space-x-1 hidden sm:inline-flex">
              <span
                class="bg-gradient-to-b text-sm from-white via-white to-gray-200 pb-0.5 pt-px px-1 text-gray-800 rounded"
              >
                ⌘
              </span>
              <span
                class="bg-gradient-to-b text-sm from-white via-white to-gray-200 pb-0.5 pt-px px-1 text-gray-800 rounded"
              >
                K
              </span>
            </span>
          </button>
        </div>
      </header>

      <main class="grid grid-cols-3 gap-8">
        <div class="bg-emerald-100 p-8 rounded-md">1</div>
        <div class="bg-emerald-100 p-8 rounded-md">1</div>
        <div class="bg-emerald-100 p-8 rounded-md">1</div>
        <div class="bg-emerald-100 p-8 rounded-md">1</div>
        <div class="bg-emerald-100 p-8 rounded-md">1</div>
        <div class="bg-emerald-100 p-8 rounded-md">1</div>
      </main>

      <footer
        class="fixed bottom-4 left-0 w-full flex-center text-[var(--app-text)]"
        text="slate-900 dark:slate-300 opacity-60 sm"
      >
        <div class="copyright flex flex-col justify-center items-center">
          <p>
            Code with ❤ & ☕️ by
            <a class="text-neon" href="https://github.com/xiaoluoboding"
              >@xiaoluoboding</a
            >
            <span> © {{ new Date().getFullYear() }}</span>
          </p>
          <p class="flex items-center space-x-1">
            <carbon:logo-twitter class="text-emerald-500" />
            <span>
              <a
                href="https://twitter.com/xiaoluoboding"
                class="text-neon"
                target="_blank"
              >
                Follow me on Twitter
              </a>
            </span>
            <span class="px-2 text-sky-300">|</span>
            <carbon:cafe class="text-emerald-500" />
            <span>
              <a
                href="https://www.buymeacoffee.com/xlbd"
                target="_blank"
                class="text-neon"
              >
                Buy me a coffee
              </a>
            </span>
            <span class="px-2 text-sky-300">|</span>
            <mdi:heart class="text-emerald-500" />
            <span>
              <a
                href="https://github.com/sponsors/xiaoluoboding"
                target="_blank"
                class="text-neon"
              >
                Sponsor me on GitHub
              </a>
            </span>
          </p>
        </div>
      </footer>

      <div class="w-full mx-auto">
        <Self :visible="isOpenDialog" @select="handleChangeDialog" />
        <component :is="currentDialog" v-if="isOpenThemeDialog" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from 'vue'
import { useMagicKeys, onClickOutside } from '@vueuse/core'

import { isDark, toggleDarkmode } from '~/composables/useDarkmode'
import Linear from '~/components/cmdk/Linear.vue'
import Vercel from '~/components/cmdk/vercel/Vercel.vue'
import Raycast from '~/components/cmdk/raycast/Raycast.vue'
import Self from '~/components/cmdk/Self.vue'
import Logo from '~/components/icons/Logo.vue'
import SunIcon from '~/components/icons/SunIcon.vue'
import MoonIcon from '~/components/icons/MoonIcon.vue'

const isOpenDialog = ref(false)
const isOpenThemeDialog = ref(false)
const selectedView = ref('')
// const target = ref(null)
const currentDialog = computed(() => {
  if (selectedView.value === 'Linear') return Linear
  if (selectedView.value === 'Vercel') return Vercel
  if (selectedView.value === 'Raycast') return Raycast
})

const keys = useMagicKeys()
const CmdK = keys['Meta+K']
const Escape = keys['Escape']

const handleChangeDialog = (view: string) => {
  selectedView.value = view
  isOpenDialog.value = false
  isOpenThemeDialog.value = true
}

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
    isOpenThemeDialog.value = false
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
