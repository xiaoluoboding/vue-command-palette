<template>
  <input
    ref="inputRef"
    command-input=""
    auto-focus
    auto-complete="off"
    auto-correct="off"
    :spell-check="false"
    aria-autocomplete="list"
    role="combobox"
    :aria-expanded="true"
    :placeholder="placeholder"
    :value="localSearch"
    @input="handleInput"
  />
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'

export default defineComponent({
  name: 'Command.Input'
})
</script>

<script lang="ts" setup>
import { computed } from 'vue'
import { useCommandState } from './useCommandState'

defineProps<{
  placeholder: string
  value?: string
}>()

const emit = defineEmits<{
  (e: 'input', ie: InputEvent): void
  (e: 'update:value', val: any): void
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const { search } = useCommandState()
const localSearch = computed(() => search.value)

const handleInput = (e: Event) => {
  const event = e as InputEvent
  const input = e.target as HTMLInputElement
  search.value = input?.value
  emit('input', event)
  emit('update:value', search.value)
}

watchEffect(() => {
  inputRef.value?.focus()
})
</script>
