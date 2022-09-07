<template>
  <Cmdk.Item @select="onSelect">
    <slot />
    <div cmdk-vercel-shortcuts="">
      <kbd v-for="key in shortcut" key="key">{{ key }}</kbd>
    </div>
  </Cmdk.Item>
</template>

<script lang="ts" setup>
import { Cmdk } from '@/index'
import type { ItemInfo } from '@/types'

defineProps({
  shortcut: {
    type: Array
  }
})

const emit = defineEmits<(e: 'select', item: ItemInfo) => void>()

const onSelect = (item: ItemInfo) => {
  console.log(item)
  emit('select', item)
}
</script>
