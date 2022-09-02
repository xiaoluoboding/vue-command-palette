<template>
  <div
    cmdk-item=""
    role="option"
    :aria-selected="selectedNode === itemId"
    :key="itemId"
    :cmdk-item-key="itemId"
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
import { useCmdkState } from './useCmdkState'
import { nanoid } from 'nanoid'

const { selectedNode } = useCmdkState()

const itemId = nanoid()
</script>
