import type { DefineComponent } from 'vue'

export interface Command {
  Empty: DefineComponent<{}, {}, any>
  Loading: DefineComponent<{}, {}, any>
  Separator: DefineComponent<{}, {}, any>
  Item?: DefineComponent<{}, {}, any>
  List?: DefineComponent<{}, {}, any>
  Group?: DefineComponent<{}, {}, any>
  Dialog?: DefineComponent<{}, {}, any>
  Input?: DefineComponent<{}, {}, any>
}

export type ItemInfo = {
  key: string
  value: string
}
