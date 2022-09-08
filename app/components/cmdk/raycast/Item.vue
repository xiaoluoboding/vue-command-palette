<template>
  <Cmdk.Item @select="onSelect">
    <slot />
    <span cmdk-raycast-meta="">
      {{ isCommand ? 'Command' : 'Application' }}
    </span>
  </Cmdk.Item>
</template>

<script lang="ts" setup>
import { Cmdk } from '@/index'
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
