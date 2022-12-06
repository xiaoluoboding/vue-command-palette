import { defineComponent, h, computed } from 'vue'
import Command from './Command.vue'
import CommandDialog from './CommandDialog.vue'
import CommandGroup from './CommandGroup.vue'
import CommandInput from './CommandInput.vue'
import CommandItem from './CommandItem.vue'
import CommandList from './CommandList.vue'
import { useCommandState } from './useCommandState'
import { useCommandEvent } from './useCommandEvent'

export { useCommandState, useCommandEvent }
export * from './types'
/**
 * Command Empty Node
 */
const CommandEmpty = defineComponent({
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
const CommandLoading = defineComponent({
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
const CommandSeparator = defineComponent({
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



export { Command, CommandDialog, CommandGroup, CommandInput, CommandItem, CommandList, CommandEmpty, CommandLoading, CommandSeparator }

