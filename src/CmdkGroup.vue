<template>
  <div cmdk-group="" role="presentation">
    <div cmdk-group-heading="" v-if="heading">
      {{ heading }}
    </div>
    <div cmdk-group-items="" role="group">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Cmdk.Group',

  props: {
    heading: String
  }
})
</script>
