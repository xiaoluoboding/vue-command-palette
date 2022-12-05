<template>
  <CommandDialog
    :visible="true"
    theme="raycast"
    @select-item="handleSelectItem"
  >
    <template #header>
      <div command-raycast-top-shine="" />
      <CommandInput placeholder="Search for apps and commands..." />
      <hr command-raycast-loader="" />
    </template>
    <template #body>
      <!-- <CommandLoading> Hang on... </CommandLoading> -->
      <CommandList ref="dialogRef">
        <CommandEmpty>No results found.</CommandEmpty>
        <Home />
      </CommandList>
    </template>
    <template #footer>
      <RaycastDarkIcon v-if="isDark" />
      <RaycastLightIcon v-else />
      <button command-raycast-open-trigger="">
        Open Application
        <kbd>↵</kbd>
      </button>

      <hr />
      <button command-raycast-subcommand-trigger="">
        Actions
        <kbd>⌘</kbd>
        <kbd>K</kbd>
      </button>
    </template>
  </CommandDialog>
</template>

<script lang="ts" setup>
import { isDark } from '~/composables/useDarkmode'

import CommandList from '@/CommandList.vue'
import CommandDialog from '@/CommandDialog.vue'
import CommandInput from '@/CommandInput.vue'
import { Empty as CommandEmpty, Loading as CommandLoading, Separator as CommandSeparator } from '@/index'

import { ItemInfo } from '@/types'
import Home from './Home.vue'
import RaycastLightIcon from '~/components/icons/RaycastLightIcon.vue'
import RaycastDarkIcon from '~/components/icons/RaycastDarkIcon.vue'

const handleSelectItem = (item: ItemInfo) => {
  console.log(item)
}
</script>

<style lang="scss">
@import '~/assets/scss/raycast.scss';
</style>
