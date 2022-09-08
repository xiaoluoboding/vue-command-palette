<template>
  <div>
    <Cmdk.Group heading="Projects">
      <Item
        v-for="item in items1"
        :key="item.label"
        :shortcut="item.shortcut"
        :data-value="item.label"
      >
        <component :is="item.icon" />
        {{ item.label }}
      </Item>
    </Cmdk.Group>
    <Cmdk.Group heading="Teams">
      <Item
        v-for="item in items2"
        :key="item.label"
        :shortcut="item.shortcut"
        :data-value="item.label"
      >
        <component :is="item.icon" />
        {{ item.label }}
      </Item>
    </Cmdk.Group>
    <Cmdk.Group heading="Help">
      <Item
        v-for="item in items3"
        :key="item.label"
        :shortcut="item.shortcut"
        :data-value="item.label"
      >
        <component :is="item.icon" />
        {{ item.label }}
      </Item>
    </Cmdk.Group>
    <Cmdk.Group heading="Preference">
      <Item
        v-for="item in items4"
        :key="item.label"
        :shortcut="item.shortcut"
        :data-value="item.label"
      >
        <component :is="item.icon" />
        {{ item.label }}
      </Item>
    </Cmdk.Group>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useDark } from '@vueuse/core'

import { Cmdk } from '@/index'
import Item from './Item.vue'
import ProjectsIcon from '~/components/icons/VercelProjectsIcon.vue'
import PlusIcon from '~/components/icons/VercelPlusIcon.vue'
import TeamsIcon from '~/components/icons/VercelTeamsIcon.vue'
import DocsIcon from '~/components/icons/VercelDocsIcon.vue'
import FeedbackIcon from '~/components/icons/VercelFeedbackIcon.vue'
import ContactIcon from '~/components/icons/VercelContactIcon.vue'
import SunIcon from '~/components/icons/SunIcon.vue'
import MoonIcon from '~/components/icons/MoonIcon.vue'

const isDark = useDark()

const items1 = [
  {
    icon: ProjectsIcon,
    label: 'Search Projects...',
    shortcut: ['S', 'P']
  },
  {
    icon: PlusIcon,
    label: 'Create New Project...'
  }
]

const items2 = [
  {
    icon: TeamsIcon,
    label: 'Search Team...',
    shortcut: ['⇧', 'P']
  },
  {
    icon: PlusIcon,
    label: 'Create New Team...'
  }
]

const items3 = [
  {
    icon: DocsIcon,
    label: 'Search Docs...',
    shortcut: ['⇧', 'D']
  },
  {
    icon: FeedbackIcon,
    label: 'Send Feedback...'
  },
  {
    icon: ContactIcon,
    label: 'Contact Support'
  }
]

const items4 = computed(() => {
  return isDark.value
    ? [
        {
          icon: MoonIcon,
          label: 'Toggle Dark Mode',
          shortcut: ['G', 'T']
        }
      ]
    : [
        {
          icon: SunIcon,
          label: 'Toggle Dark Mode',
          shortcut: ['G', 'T']
        }
      ]
})
</script>
