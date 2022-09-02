<template>
  <input
    ref="inputRef"
    cmdk-input=""
    auto-focus
    auto-complete="off"
    auto-correct="off"
    :spell-check="false"
    aria-autocomplete="list"
    role="combobox"
    :aria-expanded="true"
    :placeholder="placeholder"
    @input="handleInput"
  />
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'

export default defineComponent({
  name: 'Cmdk.Input'
})
</script>

<script lang="ts" setup>
const props = defineProps<{
  placeholder: string
}>()

const emit = defineEmits<{
  (e: 'input', InputEvent): void
}>()

const inputRef = ref<HTMLInputElement | null>(null)

const handleInput = (e: Event) => {
  console.log('input', e)
  emit('input', e)
}

watchEffect(() => {
  inputRef.value?.focus()
})
</script>
