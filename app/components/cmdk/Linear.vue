<template>
  <Cmdk.Dialog :visible="true" theme="linear">
    <template #header>
      <div cmdk-linear-badge="">Issue - FUN-343</div>
      <Cmdk.Input placeholder="Type a command or search..." />
    </template>
    <template #body>
      <!-- <Cmdk.Loading> Hang on... </Cmdk.Loading> -->
      <Cmdk.List>
        <Cmdk.Empty>No results found.</Cmdk.Empty>
        <Cmdk.Item
          v-for="item in items"
          :data-value="item.label"
          @select="handleSelectItem"
        >
          <component :is="item.icon" />
          <div>{{ item.label }}</div>
          <div cmdk-linear-shortcuts>
            <kbd v-for="key in item.shortcut" key="key">{{ key }}</kbd>
          </div>
        </Cmdk.Item>
      </Cmdk.List>
    </template>
  </Cmdk.Dialog>
</template>

<script lang="ts" setup>
import { Cmdk } from '../../../src/index'
import LinearAssignToIcon from '../icons/LinearAssignToIcon.vue'
import LinearAssignToMeIcon from '../icons/LinearAssignToMeIcon.vue'
import LinearChangeStatusIcon from '../icons/LinearChangeStatusIcon.vue'
import LinearChangePriorityIcon from '../icons/LinearChangePriorityIcon.vue'
import LinearChangeLabelsIcon from '../icons/LinearChangeLabelsIcon.vue'
import LinearRemoveLabelIcon from '../icons/LinearRemoveLabelIcon.vue'
import LinearSetDueDateIcon from '../icons/LinearSetDueDateIcon.vue'

const items = [
  {
    icon: LinearAssignToIcon,
    label: 'Assign to...',
    shortcut: ['A']
  },
  {
    icon: LinearAssignToMeIcon,
    label: 'Assign to me',
    shortcut: ['I']
  },
  {
    icon: LinearChangeStatusIcon,
    label: 'Change status...',
    shortcut: ['S']
  },
  {
    icon: LinearChangePriorityIcon,
    label: 'Change priority...',
    shortcut: ['P']
  },
  {
    icon: LinearChangeLabelsIcon,
    label: 'Change labels...',
    shortcut: ['L']
  },
  {
    icon: LinearRemoveLabelIcon,
    label: 'Remove label...',
    shortcut: ['⇧', 'L']
  },
  {
    icon: LinearSetDueDateIcon,
    label: 'Set due date...',
    shortcut: ['⇧', 'D']
  }
]

const handleSelectItem = (item: any) => {
  console.log(item)
}
</script>

<style lang="scss">
@import '~/assets/scss/linear.scss';
</style>
