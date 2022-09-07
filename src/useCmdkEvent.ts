import mitt, { Emitter } from 'mitt'
import type { ItemInfo } from './types'

type Events = {
  selectItem: ItemInfo
}

const emitter: Emitter<Events> = mitt<Events>()

const useCmdkEvent = () => {
  return {
    emitter
  }
}

export { useCmdkEvent }
