<template>
  <div cmdk-item="" role="option">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Cmdk.Item'
})
</script>
