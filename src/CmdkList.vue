<template>
  <div cmdk-list="" role="listbox" aria-label="Suggestions" ref="listRef">
    <div cmdk-list-sizer ref="heightRef">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Cmdk.List'
})
</script>

<script lang="ts" setup>
import { ref, watchEffect, onBeforeUnmount } from 'vue'

import { useCmdkEvent } from './useCmdkEvent'

const { emitter } = useCmdkEvent()

const listRef = ref<HTMLDivElement>()
const heightRef = ref<HTMLDivElement>()

let observer: ResizeObserver | null = null
let sizer: HTMLDivElement | undefined

/**
 * Contains `Item`, `Group`, and `Separator`.
 * Use the `--cmdk-list-height` CSS variable to animate height based on the number of results.
 */
watchEffect(() => {
  sizer = heightRef.value
  const wrapper = listRef.value

  if (sizer && wrapper) {
    observer = new ResizeObserver((entries) => {
      const height = sizer?.getBoundingClientRect().height
      wrapper?.style.setProperty(
        '--cmdk-list-height',
        `${height?.toFixed(1)}px`
      )
      emitter.emit('rerenderList', true)
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
