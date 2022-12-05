import { defineComponent, h, computed } from 'vue'
import Command from './Command.vue'
import Dialog from './CommandDialog.vue'
import Group from './CommandGroup.vue'
import Input from './CommandInput.vue'
import Item from './CommandItem.vue'
import List from './CommandList.vue'
import { useCommandState } from './useCommandState'
import { useCommandEvent } from './useCommandEvent'

export { useCommandState, useCommandEvent }
export * from './types'
/**
 * Command Empty Node
 */
const Empty = defineComponent({
  name: 'CommandEmpty',
  setup(props, { attrs, slots }) {
    const { filtered } = useCommandState()
    const isRender = computed(() => filtered.value.count === 0)
    return () =>
      isRender.value
        ? h(
            'div',
            {
              'command-empty': '',
              role: 'presentation',
              ...attrs
            },
            slots
          )
        : h('div', {
            'command-empty': 'hidden',
            role: 'presentation',
            style: {
              display: 'none'
            },
            ...attrs
          })
  }
})

/**
 * Command Loading Node
 */
const Loading = defineComponent({
  name: 'CommandLoading',
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'div',
        {
          'command-loading': '',
          role: 'progressbar',
          ...attrs
        },
        slots
      )
  }
})

/**
 * Command Separator Node
 */
const Separator = defineComponent({
  name: 'CommandSeparator',
  setup(props, { attrs, slots }) {
    return () =>
      h('div', {
        'command-separator': '',
        role: 'separator',
        ...attrs
      })
  }
})



export { Command, Dialog, Group, Input, Item, List, Empty, Loading, Separator }

