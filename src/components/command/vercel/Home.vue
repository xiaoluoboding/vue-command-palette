<template>
  <div>
    <CommandGroup heading="Projects">
      <Item
        v-for="item in items1"
        :key="item.label"
        :shortcut="item.shortcut"
        :data-value="item.label"
      >
        <component :is="item.icon" />
        {{ item.label }}
      </Item>
    </CommandGroup>
    <CommandGroup heading="Teams">
      <Item
        v-for="item in items2"
        :key="item.label"
        :shortcut="item.shortcut"
        :data-value="item.label"
      >
        <component :is="item.icon" />
        {{ item.label }}
      </Item>
    </CommandGroup>
    <CommandGroup heading="Help">
      <Item
        v-for="item in items3"
        :key="item.label"
        :shortcut="item.shortcut"
        :data-value="item.label"
      >
        <component :is="item.icon" />
        {{ item.label }}
      </Item>
    </CommandGroup>
    <CommandGroup heading="Preference">
      <Item
        v-for="item in items4"
        :key="item.label"
        :shortcut="item.shortcut"
        :data-value="item.label"
      >
        <MoonIcon v-if="isDark" />
        <SunIcon v-else />
        {{ item.label }}
      </Item>
    </CommandGroup>
  </div>
</template>

<script lang="ts" setup>
import { Command } from '@/index'

import { isDark } from '~/composables/useDarkmode'
import Item from './Item.vue'
import ProjectsIcon from '~/components/icons/VercelProjectsIcon.vue'
import PlusIcon from '~/components/icons/VercelPlusIcon.vue'
import TeamsIcon from '~/components/icons/VercelTeamsIcon.vue'
import DocsIcon from '~/components/icons/VercelDocsIcon.vue'
import FeedbackIcon from '~/components/icons/VercelFeedbackIcon.vue'
import ContactIcon from '~/components/icons/VercelContactIcon.vue'
import SunIcon from '~/components/icons/SunIcon.vue'
import MoonIcon from '~/components/icons/MoonIcon.vue'

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

const items4 = [
  {
    icon: SunIcon,
    label: 'Toggle Dark Mode',
    shortcut: ['G', 'T']
  }
]
</script>
