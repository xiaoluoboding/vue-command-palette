<template>
  <div :class="theme" @keydown="handleKeyDown" ref="commandRef">
    <div command-root>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Command'
})
</script>

<script lang="ts" setup>
import { provide, ref, onMounted, watch, nextTick, computed } from 'vue'
import { refDebounced, useDebounceFn } from '@vueuse/core'
import Fuse from 'fuse.js'

import { useCommandState } from './useCommandState'
import { useCommandEvent } from './useCommandEvent'
import { findNextSibling, findPreviousSibling } from './utils'
import type { ItemInfo } from './types'

const ITEM_SELECTOR = '[command-item=""]'
const ITEM_KEY_SELECTOR = 'command-item-key'
// const LIST_SELECTOR = `[command-list-sizer=""]`
const GROUP_SELECTOR = `[command-group=""]`
const GROUP_KEY_SELECTOR = 'command-group-key'
// const GROUP_ITEMS_SELECTOR = `[command-group-items=""]`
const GROUP_HEADING_SELECTOR = `[command-group-heading=""]`
const VALID_ITEM_SELECTOR = `${ITEM_SELECTOR}:not([aria-disabled="true"])`
const SELECTED_ITEM_SELECTOR = `${ITEM_SELECTOR}[aria-selected="true"]`
const SELECT_EVENT = `command-item-select`
const VALUE_ATTR = `data-value`

const fuseOptions = {
  threshold: 0.2,
  keys: ['label']
}

const props = defineProps({
  theme: {
    type: String,
    default: 'default'
  }
})

const emit = defineEmits<{
  (e: 'select-item', item: ItemInfo): void
}>()

provide('theme', props.theme || 'default')
const { selectedNode, search, dataValue, filtered } = useCommandState()
const { emitter } = useCommandEvent()

const commandRef = ref<HTMLElement>()
const commandList = refDebounced(ref(new Map()), 333)
const allItemIds = refDebounced(ref<Set<string>>(new Set()), 333) // [...itemIds]
const allGroupIds = refDebounced(ref<Map<string, Set<string>>>(new Map())) // groupId -> [...itemIds]

const commandFuseList = computed(() => {
  const fuseList = [] as any[]
  for (const [key, label] of commandList.value.entries()) {
    fuseList.push({
      key,
      label
    })
  }
  return fuseList
})

const fuse = computed(() => {
  const fuseIndex = Fuse.createIndex(fuseOptions.keys, commandFuseList.value)
  return new Fuse(commandFuseList.value, fuseOptions, fuseIndex)
})

const scrollSelectedIntoView = () => {
  const item = getSelectedItem()

  if (item) {
    if (item.parentElement?.firstElementChild === item) {
      // First item in Group, ensure heading is in view
      item
        .closest(GROUP_SELECTOR)
        ?.querySelector(GROUP_HEADING_SELECTOR)
        ?.scrollIntoView({ block: 'nearest' })
    }

    // Ensure the item is always in view
    item.scrollIntoView({ block: 'nearest' })
  }
}

/** Getters */

const getSelectedItem = () => {
  return commandRef.value?.querySelector(SELECTED_ITEM_SELECTOR)
}

const getValidItems = (
  rootNode: HTMLElement | undefined = commandRef.value
) => {
  const allItemEl = rootNode?.querySelectorAll(
    VALID_ITEM_SELECTOR
  ) as NodeListOf<HTMLElement>
  return allItemEl ? Array.from(allItemEl) : []
}

const getValidGroups = () => {
  const allGroupEl = commandRef.value?.querySelectorAll(
    GROUP_SELECTOR
  ) as NodeListOf<HTMLElement>
  return allGroupEl ? Array.from(allGroupEl) : []
}

const selectedFirstItem = () => {
  const [firstItem] = getValidItems()
  if (firstItem && firstItem.getAttribute(ITEM_KEY_SELECTOR)) {
    selectedNode.value = firstItem.getAttribute(ITEM_KEY_SELECTOR) || ''
  }
}

/** Setters */

/**
 * set the selected item index by index
 */
const updateSelectedToIndex = (index: number) => {
  const items = getValidItems()
  const item = items[index]
  if (item) {
    selectedNode.value = item.getAttribute(ITEM_KEY_SELECTOR) || ''
  }
}

const updateSelectedByChange = (change: 1 | -1) => {
  const selected = getSelectedItem()
  const items = getValidItems()
  const index = items.findIndex((item) => item === selected)

  // Get item at this index
  const newSelected = items[index + change]
  if (newSelected) {
    selectedNode.value = newSelected.getAttribute(ITEM_KEY_SELECTOR) || ''
  } else {
    // no valid idx, then go to the first/last of item
    change > 0
      ? updateSelectedToIndex(0)
      : updateSelectedToIndex(items.length - 1)
  }
}

const updateSelectedToGroup = (change: 1 | -1) => {
  const selected = getSelectedItem()
  let group = selected?.closest(GROUP_SELECTOR)
  let item: HTMLElement | null | undefined = null
  // console.group('update selected to group')
  // console.log(selected)
  // console.log(group)

  while (group && !item) {
    group =
      change > 0
        ? findNextSibling(group, GROUP_SELECTOR)
        : findPreviousSibling(group, GROUP_SELECTOR)
    item = group?.querySelector(VALID_ITEM_SELECTOR)
  }
  // console.log(group)
  // console.log(item)
  // console.groupEnd()

  if (item) {
    selectedNode.value = item.getAttribute(ITEM_KEY_SELECTOR) || ''
  } else {
    updateSelectedByChange(change)
  }
}

const first = () => updateSelectedToIndex(0)
const last = () => updateSelectedToIndex(getValidItems().length - 1)

const next = (e: KeyboardEvent) => {
  e.preventDefault()
  if (e.metaKey) {
    // Last item
    last()
  } else if (e.altKey) {
    // Next group
    updateSelectedToGroup(1)
  } else {
    // Next item
    updateSelectedByChange(1)
  }
}

const prev = (e: KeyboardEvent) => {
  e.preventDefault()
  if (e.metaKey) {
    // First item
    first()
  } else if (e.altKey) {
    // Previous group
    updateSelectedToGroup(-1)
  } else {
    // Previous item
    updateSelectedByChange(-1)
  }
}

const handleKeyDown = (e: KeyboardEvent) => {
  // console.log('keydown', e)
  switch (e.key) {
    case 'n':
    case 'j': {
      // vim keybind down
      if (e.ctrlKey) {
        next(e)
      }
      break
    }
    case 'ArrowDown': {
      next(e)
      break
    }
    case 'p':
    case 'k': {
      // vim keybind up
      if (e.ctrlKey) {
        prev(e)
      }
      break
    }
    case 'ArrowUp': {
      prev(e)
      break
    }
    case 'Home': {
      // First item
      first()
      break
    }
    case 'End': {
      // Last item
      last()
      break
    }
    case 'Enter': {
      // Trigger item handleSelect
      const item = getSelectedItem()
      if (item) {
        const event = new Event(SELECT_EVENT)
        item.dispatchEvent(event)
      }
    }
  }
}

/**
 * Filters the current items.
 */
const filterItems = () => {
  if (!search.value) {
    filtered.value.count = allItemIds.value.size
    // Do nothing, each item will know to show itself because search is empty
    return
  }

  // Reset the groups
  filtered.value.groups = new Set('')

  const items = new Map()

  const list = fuse.value.search(search.value).map((r) => r.item)

  // transform list to map
  for (const { key, label } of list) {
    items.set(key, label)
  }

  // Check which groups have at least 1 item shown
  for (const [groupId, itemIdsInGroup] of allGroupIds.value) {
    for (const itemId of itemIdsInGroup) {
      if (items.get(itemId)) {
        filtered.value.groups.add(groupId)
      }
    }
  }

  nextTick(() => {
    filtered.value.count = items.size
    filtered.value.items = items
  })
}

const initStore = () => {
  const items = getValidItems()
  const groups = getValidGroups()

  for (const item of items) {
    const itemKey = item.getAttribute(ITEM_KEY_SELECTOR) || ''
    const itemLabel = item.getAttribute(VALUE_ATTR) || ''
    allItemIds.value.add(itemKey)
    commandList.value.set(itemKey, itemLabel)
    filtered.value.count = commandList.value.size
  }

  // map the items in group
  for (const group of groups) {
    const itemsInGroup = getValidItems(group)
    const groupId = group.getAttribute(GROUP_KEY_SELECTOR) || ''
    const itemIds = new Set('')

    for (const item of itemsInGroup) {
      const itemKey = item.getAttribute(ITEM_KEY_SELECTOR) || ''
      itemIds.add(itemKey)
    }
    allGroupIds.value.set(groupId, itemIds)
  }
}

/**
 * handle scroll into view
 */
watch(
  () => selectedNode.value,
  (newVal) => {
    if (newVal) {
      nextTick(scrollSelectedIntoView)
    }
  },
  { deep: true }
)
/**
 * when search's value is changed, trigger filter action
 */
watch(
  () => search.value,
  (newVal) => {
    filterItems()
    nextTick(selectedFirstItem)
  }
)

emitter.on('selectItem', (item) => {
  emit('select-item', item)
})

const debouncedEmit = useDebounceFn((isRerender: Boolean) => {
  if (isRerender) {
    initStore()
    nextTick(selectedFirstItem)
  }
}, 100)

emitter.on('rerenderList', debouncedEmit)

onMounted(() => {
  initStore()
  selectedFirstItem()
})
</script>
