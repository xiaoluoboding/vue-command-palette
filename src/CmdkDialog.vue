<template>
  <Teleport to="body">
    <Transition name="modal">
      <Cmdk :theme="theme">
        <div v-if="visible" cmdk-dialog>
          <div cmdk-dialog-mask>
            <div cmdk-dialog-wrapper>
              <div cmdk-dialog-header>
                <slot name="header" />
              </div>
              <div cmdk-dialog-body>
                <slot name="body" />
              </div>
              <div cmdk-dialog-footer>
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

defineProps<{
  visible: boolean
  theme: string
}>()

const { search, filtered } = useCmdkState()

onBeforeUnmount(() => {
  // reset the cmdk state
  search.value = ''
  filtered.value.count = 0
  filtered.value.items = new Map()
  filtered.value.groups = new Set()
})
</script>
