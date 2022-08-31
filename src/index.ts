import { defineComponent, h } from 'vue'
import Empty from './CmdkEmpty.vue'
import Dialog from './CmdkDialog.vue'
import Input from './CmdkInput.vue'
import List from './CmdkList.vue'
import Group from './CmdkGroup.vue'
import Item from './CmdkItem.vue'

/**
 * Cmdk Root Node
 */
const Cmdk = defineComponent({
  name: 'Cmdk',
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'div',
        {
          'cmdk-root': ''
        },
        slots
      )
  }
})

const Separator = defineComponent({
  name: 'Cmdk.Separator',
  setup(props, { attrs, slots }) {
    return () =>
      h('div', {
        'cmdk-separator': '',
        role: 'separator'
      })
  }
})

const Loading = defineComponent({
  name: 'Cmdk.Loading',
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'div',
        {
          class: 'w-full',
          'cmdk-loading': '',
          role: 'progressbar',
          ...attrs
        },
        slots
      )
  }
})

const pkg = Object.assign(Cmdk, {
  Root: Cmdk,
  Empty,
  Loading,
  Separator,
  Dialog,
  Input,
  List,
  Group,
  Item
})

export { pkg as Cmdk }
