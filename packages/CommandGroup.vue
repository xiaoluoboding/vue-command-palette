<script lang="ts" setup>
import { computed } from 'vue'
import { nanoid } from 'nanoid'

import { useCommandState } from './useCommandState'
import type { CommandGroupProps } from './types';

defineOptions({
  name: 'Command.Group',
})

defineProps<CommandGroupProps>()

const groupId = computed(() => `command-group-${nanoid()}`)

const { filtered, isSearching } = useCommandState()

const isRender = computed(() =>
  !isSearching.value ? true : filtered.value.groups.has(groupId.value),
)
</script>

<template>
  <div
    v-show="isRender"
    :key="groupId"
    command-group=""
    role="presentation"
    :command-group-key="groupId"
    :data-value="heading"
  >
    <div v-if="heading" command-group-heading="">
      {{ heading }}
    </div>
    <div command-group-items="" role="group">
      <slot />
    </div>
  </div>
</template>
