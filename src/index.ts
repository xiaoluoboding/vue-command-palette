import { defineComponent, h } from 'vue'

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

const pkg = Object.assign(Cmdk, {
  Root: Cmdk
})

export { pkg as Cmdk }
