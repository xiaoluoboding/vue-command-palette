<template>
  <CommandItem @select="onSelect">
    <slot />
    <span command-raycast-meta="">
      {{ isCommand ? 'Command' : 'Application' }}
    </span>
  </CommandItem>
</template>

<script lang="ts" setup>
import CommandItem from '@/CommandItem.vue'
import type { ItemInfo } from '@/types'

defineProps({
  isCommand: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits<(e: 'select', item: ItemInfo) => void>()

const onSelect = (item: ItemInfo) => emit('select', item)
</script>
