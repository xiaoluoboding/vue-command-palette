<template>
  <Cmdk.Dialog
    :visible="true"
    theme="raycast"
    @select-item="handleSelectItem"
    @keydown="handleKeyDown"
  >
    <template #header>
      <div cmdk-raycast-top-shine="" />
      <Cmdk.Input placeholder="Search for apps and commands..." />
      <hr cmdk-raycast-loader="" />
    </template>
    <template #body>
      <!-- <Cmdk.Loading> Hang on... </Cmdk.Loading> -->
      <Cmdk.List ref="dialogRef">
        <Cmdk.Empty>No results found.</Cmdk.Empty>
        <Home />
      </Cmdk.List>
    </template>
    <template #footer>
      <RaycastDarkIcon v-if="isDark" />
      <RaycastLightIcon v-else />
      <button cmdk-raycast-open-trigger="">
        Open Application
        <kbd>↵</kbd>
      </button>

      <hr />
      <button cmdk-raycast-subcommand-trigger="">
        Actions
        <kbd>⌘</kbd>
        <kbd>K</kbd>
      </button>
    </template>
  </Cmdk.Dialog>
</template>

<script lang="ts" setup>
import { isDark } from '~/composables/useDarkmode'

import { Cmdk } from '@/index'
import { ItemInfo } from '@/types'
import Home from './Home.vue'
import RaycastLightIcon from '~/components/icons/RaycastLightIcon.vue'
import RaycastDarkIcon from '~/components/icons/RaycastDarkIcon.vue'

const handleKeyDown = (e: KeyboardEvent) => {
  console.log(e)
}

const handleSelectItem = (item: ItemInfo) => {
  console.log(item)
}
</script>

<style lang="scss">
@import '~/assets/scss/raycast.scss';
</style>
