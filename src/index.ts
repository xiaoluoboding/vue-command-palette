import { defineComponent, h, computed } from 'vue'
import Cmdk from './Cmdk.vue'
import Dialog from './CmdkDialog.vue'
import Group from './CmdkGroup.vue'
import Input from './CmdkInput.vue'
import Item from './CmdkItem.vue'
import List from './CmdkList.vue'
import { useCmdkState } from './useCmdkState'

/**
 * Cmdk Empty Node
 */
const Empty = defineComponent({
  name: 'Cmdk.Empty',
  setup(props, { attrs, slots }) {
    const { filtered } = useCmdkState()
    const isRender = computed(() => filtered.value.count === 0)
    return () =>
      isRender.value
        ? h(
            'div',
            {
              'cmdk-empty': '',
              role: 'presentation',
              ...attrs
            },
            slots
          )
        : h('div')
  }
})

/**
 * Cmdk Loading Node
 */
const Loading = defineComponent({
  name: 'Cmdk.Loading',
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'div',
        {
          'cmdk-loading': '',
          role: 'progressbar',
          ...attrs
        },
        slots
      )
  }
})

/**
 * Cmdk Separator Node
 */
const Separator = defineComponent({
  name: 'Cmdk.Separator',
  setup(props, { attrs, slots }) {
    return () =>
      h('div', {
        'cmdk-separator': '',
        role: 'separator',
        ...attrs
      })
  }
})

const pkg = Object.assign(Cmdk, {
  Dialog,
  Empty,
  Group,
  Input,
  Item,
  List,
  Loading,
  Separator,
  Root: Cmdk
})

export { pkg as Cmdk }
