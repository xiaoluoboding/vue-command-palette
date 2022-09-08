<template>
  <div class="w-screen h-full flex-center">
    <div class="container mx-auto">
      <div class="w-full max-w-3xl">
        <Vercel v-if="isOpenDialog" ref="target" />
        <CmdkPlaceholder v-else />
      </div>
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
