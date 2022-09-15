<template>
  <div command-list="" role="listbox" aria-label="Suggestions" ref="listRef">
    <div command-list-sizer ref="heightRef">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Command.List'
})
</script>

<script lang="ts" setup>
import { ref, watchEffect, onBeforeUnmount, nextTick } from 'vue'

import { useCommandEvent } from './useCommandEvent'

const { emitter } = useCommandEvent()

const listRef = ref<HTMLDivElement>()
const heightRef = ref<HTMLDivElement>()

let observer: ResizeObserver | null = null
let sizer: HTMLDivElement | undefined

/**
 * Contains `Item`, `Group`, and `Separator`.
 * Use the `--command-list-height` CSS variable to animate height based on the number of results.
 */
watchEffect(() => {
  sizer = heightRef.value
  const wrapper = listRef.value

  if (sizer && wrapper) {
    observer = new ResizeObserver((entries) => {
      nextTick(() => {
        const height = sizer?.offsetHeight

        wrapper?.style.setProperty(
          '--command-list-height',
          `${height?.toFixed(1)}px`
        )
        emitter.emit('rerenderList', true)
      })
    })
    observer.observe(sizer)
  }
})

onBeforeUnmount(() => {
  if (observer !== null && sizer) {
    observer.unobserve(sizer)
  }
})
</script>
