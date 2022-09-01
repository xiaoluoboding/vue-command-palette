<template>
  <Teleport to="body">
    <Transition name="modal">
      <div :class="theme">
        <div cmdk-root>
          <div cmdk-dialog--mask v-if="visible">
            <div cmdk-dialog--wrapper>
              <div cmdk-dialog--header>
                <slot name="header" />
              </div>
              <div cmdk-dialog--body>
                <slot name="body" />
              </div>
              <div cmdk-dialog--footer>
                <slot name="footer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts">
export default {
  name: 'Cmdk.Dialog'
}
</script>

<script lang="ts" setup>
import { inject } from 'vue'

defineProps<{
  visible: Boolean
}>()

const theme = inject('theme')
</script>
