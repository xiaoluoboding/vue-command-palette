<template>
  <div
    ref="itemRef"
    cmdk-item=""
    role="option"
    :aria-selected="selectedNode === itemId"
    :aria-disabled="!isRender"
    :key="itemId"
    :cmdk-item-key="itemId"
    v-show="isRender"
    @click="handleSelect"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Cmdk.Item'
})
</script>

<script lang="ts" setup>
import { computed, ref, watchEffect, onBeforeUnmount } from 'vue'
import { nanoid } from 'nanoid'

import { useCmdkState } from './useCmdkState'
import { useCmdkEvent } from './useCmdkEvent'
import type { ItemInfo } from './types'

const SELECT_EVENT = `cmdk-item-select`
const VALUE_ATTR = `data-value`

const emit = defineEmits<{
  (e: 'select', itemInfo: ItemInfo): void
}>()

const { selectedNode, filtered, isSearching } = useCmdkState()
const { emitter } = useCmdkEvent()

const itemRef = ref<HTMLDivElement>()

const itemId = computed(() => `cmdk-item-${nanoid()}`)

const isRender = computed(() => {
  const itemKey = filtered.value.items.get(itemId.value)

  return !isSearching.value ? true : itemKey !== undefined
})

const handleSelect = () => {
  const itemInfo = {
    key: itemId.value,
    value: itemRef.value?.getAttribute(VALUE_ATTR) || ''
  }
  emit('select', itemInfo)
  emitter.emit('selectItem', itemInfo)
}

watchEffect(() => {
  itemRef.value?.addEventListener(SELECT_EVENT, handleSelect)
})

onBeforeUnmount(() => {
  itemRef.value?.removeEventListener(SELECT_EVENT, handleSelect)
})
</script>
