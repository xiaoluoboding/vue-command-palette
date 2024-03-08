<script lang="ts" setup>
import Home from './Home.vue'
import { isDark } from '~/composables/useDarkmode'

import { Command } from '@/index'
import type { ItemInfo } from '@/types'
import RaycastLightIcon from '~/components/icons/RaycastLightIcon.vue'
import RaycastDarkIcon from '~/components/icons/RaycastDarkIcon.vue'

function handleSelectItem(item: ItemInfo) {
  console.log(item)
}
</script>

<template>
  <Command.Dialog
    :visible="true"
    theme="raycast"
    @select-item="handleSelectItem"
  >
    <template #header>
      <div command-raycast-top-shine="" />
      <Command.Input placeholder="Search for apps and commands..." />
      <hr command-raycast-loader="">
    </template>
    <template #body>
      <!-- <Command.Loading> Hang on... </Command.Loading> -->
      <Command.List ref="dialogRef">
        <Command.Empty>No results found.</Command.Empty>
        <Home />
      </Command.List>
    </template>
    <template #footer>
      <RaycastDarkIcon v-if="isDark" />
      <RaycastLightIcon v-else />
      <button command-raycast-open-trigger="">
        Open Application
        <kbd>↵</kbd>
      </button>

      <hr>
      <button command-raycast-subcommand-trigger="">
        Actions
        <kbd>⌘</kbd>
        <kbd>K</kbd>
      </button>
    </template>
  </Command.Dialog>
</template>

<style lang="scss">
@import '~/assets/scss/raycast.scss';
</style>
