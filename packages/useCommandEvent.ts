import mitt, { Emitter } from 'mitt'
import type { ItemInfo } from './types'

type Events = {
  selectItem: ItemInfo
  rerenderList: boolean
}

const emitter: Emitter<Events> = mitt<Events>()

const useCommandEvent = () => {
  return {
    emitter
  }
}

export { useCommandEvent }
