<template>
  <div cmdk-list="" role="listbox" aria-label="Suggestions">
    <div cmdk-list-sizer>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Cmdk.List'
}
</script>

<script lang="ts" setup></script>
