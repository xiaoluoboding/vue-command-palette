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
    :value="localSearch"
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
import { computed } from 'vue'
import { useCmdkState } from './useCmdkState'

const props = defineProps<{
  placeholder: string
}>()

const emit = defineEmits<{
  (e: 'input', ie: InputEvent): void
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const { search } = useCmdkState()
const localSearch = computed(() => search.value)

const handleInput = (e: Event) => {
  const event = e as InputEvent
  const input = e.target as HTMLInputElement
  search.value = input?.value
  emit('input', event)
}

watchEffect(() => {
  inputRef.value?.focus()
})
</script>
