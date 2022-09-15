<template>
  <div
    ref="itemRef"
    command-item=""
    role="option"
    :aria-selected="selectedNode === itemId"
    :aria-disabled="!isRender"
    :key="itemId"
    :command-item-key="itemId"
    v-show="isRender"
    @click="handleSelect"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Command.Item'
})
</script>

<script lang="ts" setup>
import { computed, ref, watchEffect, onBeforeUnmount } from 'vue'
import { nanoid } from 'nanoid'
import { useMagicKeys, whenever } from '@vueuse/core'

import { useCommandState } from './useCommandState'
import { useCommandEvent } from './useCommandEvent'
import type { ItemInfo, Noop } from './types'

const SELECT_EVENT = `command-item-select`
const VALUE_ATTR = `data-value`

const props = defineProps<{
  shortcut?: string[]
  perform?: Noop
}>()

const emit = defineEmits<{
  (e: 'select', itemInfo: ItemInfo): void
}>()

const { current } = useMagicKeys()
const { selectedNode, filtered, isSearching } = useCommandState()
const { emitter } = useCommandEvent()

const itemRef = ref<HTMLDivElement>()

const itemId = computed(() => `command-item-${nanoid()}`)

const isRender = computed(() => {
  const itemKey = filtered.value.items.get(itemId.value)

  return !isSearching.value ? true : itemKey !== undefined
})

const currentKeys = computed(() => Array.from(current))

const handleSelect = () => {
  const itemInfo = {
    key: itemId.value,
    value: itemRef.value?.getAttribute(VALUE_ATTR) || ''
  }
  emit('select', itemInfo)
  emitter.emit('selectItem', itemInfo)
}

whenever(currentKeys, (v) => {
  if (props.shortcut && props.shortcut.length > 0) {
    const hasKey = props.shortcut.every((key) => current.has(key.toLowerCase()))
    if (hasKey && props.perform) {
      props.perform()
    }
  }
})

watchEffect(() => {
  itemRef.value?.addEventListener(SELECT_EVENT, handleSelect)
})

onBeforeUnmount(() => {
  itemRef.value?.removeEventListener(SELECT_EVENT, handleSelect)
})
</script>
