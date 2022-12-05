<template>
  <CommandDialog :visible="true" theme="linear">
    <template #header>
      <div command-linear-badge="">Issue - FUN-343</div>
      <CommandInput placeholder="Type a command or search..." />
    </template>
    <template #body>
      <!-- <CommandLoading> Hang on... </CommandLoading> -->
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandItem
          v-for="item in items"
          :data-value="item.label"
          :shortcut="item.shortcut"
          :perform="item.perform"
          @select="handleSelectItem"
        >
          <component :is="item.icon" />
          <div>{{ item.label }}</div>
          <div command-linear-shortcuts>
            <kbd v-for="key in item.shortcut" key="key">{{ key }}</kbd>
          </div>
        </CommandItem>
      </CommandList>
    </template>
  </CommandDialog>
</template>

<script lang="ts" setup>
import Command from '@/Command.vue'
import CommandDialog from '@/CommandDialog.vue'
import CommandInput from '@/CommandInput.vue'
import CommandList from '@/CommandList.vue'
import { Empty as CommandEmpty, Loading as CommandLoading, Separator as CommandSeparator } from '@/index'
import CommandItem from '@/CommandItem.vue'

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
    shortcut: ['A'],
    perform: () => {
      console.log('action')
    }
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
