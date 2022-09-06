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
import { ref, watchEffect } from 'vue'

const listRef = ref<HTMLDivElement>()
const heightRef = ref<HTMLDivElement>()

watchEffect(() => {
  if (listRef.value && heightRef.value) {
    const sizer = heightRef.value
    const wrapper = listRef.value
    const observer = new ResizeObserver(() => {
      const height = sizer.getBoundingClientRect().height
      wrapper.style.setProperty('--cmdk-list-height', `${height.toFixed(1)}px`)
    })
    observer.observe(sizer)
  }
})
</script>
