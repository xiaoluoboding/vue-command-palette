<template>
  <input
    cmdk-input=""
    autoComplete="off"
    autoCorrect="off"
    :spellCheck="false"
    aria-autocomplete="list"
    role="combobox"
    :aria-expanded="true"
    :placeholder="placeholder"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Cmdk.Input',

  props: {
    placeholder: String
  }
})
</script>
