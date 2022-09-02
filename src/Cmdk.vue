<template>
  <div :class="theme" @keydown.prevent="handleKeyDown" ref="cmdkRef">
    <div cmdk-root>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Cmdk'
})
</script>

<script lang="ts" setup>
import { provide, ref, onMounted, watch, nextTick } from 'vue'
import { useCmdkState } from './useCmdkState'

const ITEM_SELECTOR = '[cmdk-item=""]'
const ITEM_KEY_SELECTOR = 'cmdk-item-key'
const LIST_SELECTOR = `[cmdk-list-sizer=""]`
const GROUP_SELECTOR = `[cmdk-group=""]`
const GROUP_ITEMS_SELECTOR = `[cmdk-group-items=""]`
const GROUP_HEADING_SELECTOR = `[cmdk-group-heading=""]`
const VALID_ITEM_SELECTOR = `${ITEM_SELECTOR}:not([aria-disabled="true"])`
const SELECTED_ITEM_SELECTOR = `${ITEM_SELECTOR}[aria-selected="true"]`
const SELECT_EVENT = `cmdk-item-select`
const VALUE_ATTR = `data-value`

const props = defineProps({
  theme: {
    type: String,
    default: 'default'
  }
})

provide('theme', props.theme || 'default')
const { selectedNode } = useCmdkState()

const cmdkRef = ref<HTMLElement>()

const scrollSelectedIntoView = () => {
  const item = getSelectedItem()

  if (item) {
    // console.log(item)
    if (item.parentElement?.firstChild === item) {
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
  return cmdkRef.value?.querySelector(SELECTED_ITEM_SELECTOR)
}

const getValidItems = () => {
  const allItemEl = cmdkRef.value?.querySelectorAll(
    ITEM_SELECTOR
  ) as NodeListOf<Element>
  return Array.from(allItemEl)
}

const selectedFirstItem = () => {
  const [firstItem] = getValidItems()
  if (firstItem.getAttribute(ITEM_KEY_SELECTOR)) {
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
  }
}

const updateSelectedToGroup = (change: 1 | -1) => {}

const first = () => updateSelectedToIndex(0)
const last = () => updateSelectedToIndex(getValidItems().length - 1)

const next = (e: KeyboardEvent) => {
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
  e.preventDefault()
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

watch(
  () => selectedNode.value,
  (newVal) => {
    if (newVal) {
      nextTick(() => scrollSelectedIntoView())
    }
  }
)

onMounted(() => {
  selectedFirstItem()
})
</script>
