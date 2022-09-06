<template>
  <div
    cmdk-item=""
    role="option"
    :aria-selected="selectedNode === itemId"
    :key="itemId"
    :cmdk-item-key="itemId"
    v-show="isRender"
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
import { computed } from 'vue'
import { nanoid } from 'nanoid'

import { useCmdkState } from './useCmdkState'

const { selectedNode, filtered, isSearching } = useCmdkState()

const itemId = computed(() => `cmdk-item-${nanoid()}`)

const isRender = computed(() => {
  const itemKey = filtered.value.items.get(itemId)

  return !isSearching.value ? true : itemKey !== undefined
})
</script>
