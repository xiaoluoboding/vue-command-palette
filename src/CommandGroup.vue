<template>
  <div
    command-group=""
    role="presentation"
    v-show="isRender"
    :key="groupId"
    :command-group-key="groupId"
    :data-value="heading"
  >
    <div command-group-heading="" v-if="heading">
      {{ heading }}
    </div>
    <div command-group-items="" role="group">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Command.Group'
})
</script>

<script lang="ts" setup>
import { computed } from 'vue'
import { nanoid } from 'nanoid'

import { useCommandState } from './useCommandState'

const groupId = computed(() => `command-group-${nanoid()}`)

defineProps<{
  heading: string
}>()

const { filtered, isSearching } = useCommandState()

const isRender = computed(() =>
  !isSearching.value ? true : filtered.value.groups.has(groupId.value)
)
</script>
