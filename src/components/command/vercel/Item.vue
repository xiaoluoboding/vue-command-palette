<template>
  <CommandItem @select="onSelect">
    <slot />
    <div command-vercel-shortcuts="">
      <kbd v-for="key in shortcut" key="key">{{ key }}</kbd>
    </div>
  </CommandItem>
</template>

<script lang="ts" setup>
import CommandItem from '@/CommandItem.vue'

import type { ItemInfo } from '@/types'

defineProps({
  shortcut: {
    type: Array
  }
})

const emit = defineEmits<(e: 'select', item: ItemInfo) => void>()

const onSelect = (item: ItemInfo) => emit('select', item)
</script>
