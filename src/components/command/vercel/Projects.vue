<template>
  <div>
    <Item v-for="(name, idx) in countries" :data-value="name">
      {{ name }}
    </Item>
  </div>
</template>

<script lang="ts" setup>
import Item from './Item.vue'

defineProps({
  countries: { type: Array, required: true },
})
</script>
