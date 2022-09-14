<template>
  <Teleport to="body">
    <Transition name="command-dialog" appear>
      <Command
        :theme="theme"
        @keydown="(e) => emit('keydown', e)"
        v-if="visible"
      >
        <div command-dialog>
          <div command-dialog-mask>
            <div command-dialog-wrapper>
              <div command-dialog-header>
                <slot name="header" />
              </div>
              <div command-dialog-body>
                <slot name="body" />
              </div>
              <div command-dialog-footer v-if="$slots.footer">
                <slot name="footer" />
              </div>
            </div>
          </div>
        </div>
      </Command>
    </Transition>
  </Teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Command.Dialog'
})
</script>

<script lang="ts" setup>
import { onBeforeUnmount } from 'vue'

import Command from './Command.vue'
import { useCommandState } from './useCommandState'
import { useCommandEvent } from './useCommandEvent'
import type { ItemInfo } from './types'

defineProps<{
  visible: boolean
  theme: string
}>()

const emit = defineEmits<{
  (e: 'select-item', item: ItemInfo): void
  (e: 'keydown', ke: KeyboardEvent): void
}>()

const { search, filtered } = useCommandState()
const { emitter } = useCommandEvent()

emitter.on('selectItem', (item) => {
  emit('select-item', item)
})

onBeforeUnmount(() => {
  // reset the command state
  search.value = ''
  filtered.value.count = 0
  filtered.value.items = new Map()
  filtered.value.groups = new Set()
})
</script>
