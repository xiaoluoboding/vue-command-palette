<template>
  <Teleport to="body" ref="dialogRef">
    <Transition name="command-dialog" appear>
      <Command :theme="theme" v-if="visible">
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

<script lang="ts" setup>
import { onBeforeUnmount, ref } from 'vue'
import { whenever } from '@vueuse/core'

import Command from './Command.vue'
import { useCommandState } from './useCommandState'
import { useCommandEvent } from './useCommandEvent'
import type { ItemInfo } from './types'

const props = defineProps<{
  visible: boolean
  theme: string
}>()

const emit = defineEmits<{
  (e: 'select-item', item: ItemInfo): void
}>()

const { search, filtered } = useCommandState()
const { emitter } = useCommandEvent()
const dialogRef = ref<HTMLDivElement>()

emitter.on('selectItem', (item) => {
  emit('select-item', item)
})

const resetStore = () => {
  // reset the command state
  search.value = ''
  filtered.value.count = 0
  filtered.value.items = new Map()
  filtered.value.groups = new Set()
}

whenever(() => props.visible, resetStore)

onBeforeUnmount(resetStore)
</script>
