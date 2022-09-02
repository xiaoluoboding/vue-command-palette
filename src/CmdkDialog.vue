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
export default {
  name: 'Cmdk.Dialog'
}
</script>

<script lang="ts" setup>
import Cmdk from './Cmdk.vue'

defineProps<{
  visible: boolean
  theme: string
}>()
</script>
