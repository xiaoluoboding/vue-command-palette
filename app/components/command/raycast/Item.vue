<template>
  <Command.Item @select="onSelect">
    <slot />
    <span command-raycast-meta="">
      {{ isCommand ? 'Command' : 'Application' }}
    </span>
  </Command.Item>
</template>

<script lang="ts" setup>
import { Command } from '@/index'
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
