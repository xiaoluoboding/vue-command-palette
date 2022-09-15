import { defineComponent, h, computed } from 'vue'
import Command from './Command.vue'
import Dialog from './CommandDialog.vue'
import Group from './CommandGroup.vue'
import Input from './CommandInput.vue'
import Item from './CommandItem.vue'
import List from './CommandList.vue'
import { useCommandState } from './useCommandState'

/**
 * Command Empty Node
 */
const Empty = defineComponent({
  name: 'Command.Empty',
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
  name: 'Command.Loading',
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
  name: 'Command.Separator',
  setup(props, { attrs, slots }) {
    return () =>
      h('div', {
        'command-separator': '',
        role: 'separator',
        ...attrs
      })
  }
})

const pkg = Object.assign(Command, {
  Dialog,
  Empty,
  Group,
  Input,
  Item,
  List,
  Loading,
  Separator,
  Root: Command
})

export { pkg as Command }
