<template>
  <div cmdk-list="" role="listbox" aria-label="Suggestions">
    <div cmdk-list-sizer>
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
