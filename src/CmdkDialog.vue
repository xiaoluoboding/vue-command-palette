<template>
  <Teleport to="body">
    <Transition name="modal">
      <Cmdk :theme="theme" @keydown="(e) => emit('keydown', e)">
        <div v-if="visible" cmdk-dialog>
          <div cmdk-dialog-mask>
            <div cmdk-dialog-wrapper>
              <div cmdk-dialog-header>
                <slot name="header" />
              </div>
              <div cmdk-dialog-body>
                <slot name="body" />
              </div>
              <div cmdk-dialog-footer v-if="$slots.footer">
                <slot name="footer" />
              </div>
            </div>
          </div>
        </div>
      </Cmdk>
    </Transition>
  </Teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Cmdk.Dialog'
})
</script>

<script lang="ts" setup>
import { onBeforeUnmount } from 'vue'

import Cmdk from './Cmdk.vue'
import { useCmdkState } from './useCmdkState'
import { useCmdkEvent } from './useCmdkEvent'
import type { ItemInfo } from './types'

defineProps<{
  visible: boolean
  theme: string
}>()

const emit = defineEmits<{
  (e: 'select-item', item: ItemInfo): void
  (e: 'keydown', ke: KeyboardEvent): void
}>()

const { search, filtered } = useCmdkState()
const { emitter } = useCmdkEvent()

emitter.on('selectItem', (item) => {
  emit('select-item', item)
})

onBeforeUnmount(() => {
  // reset the cmdk state
  search.value = ''
  filtered.value.count = 0
  filtered.value.items = new Map()
  filtered.value.groups = new Set()
})
</script>
