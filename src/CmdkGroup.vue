<template>
  <div cmdk-group="" role="presentation" v-if="isRender">
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
  name: 'Cmdk.Group'
})
</script>

<script lang="ts" setup>
import { computed } from 'vue'
import { useCmdkState } from './useCmdkState'

const groupId = 'dd'

defineProps<{
  heading: string
}>()

const { filtered, isSearching } = useCmdkState()

const isRender = computed(() =>
  !isSearching.value ? true : filtered.value.groups.has(groupId)
)
</script>
