<template>
  <Cmdk.Dialog :visible="true" theme="algolia">
    <template #header>
      <Cmdk.Input placeholder="Type a command or search..." />
    </template>
    <template #body>
      <Cmdk.List>
        <Cmdk.Empty>No results found.</Cmdk.Empty>
        <Cmdk.Group heading="Theme">
          <Cmdk.Item
            v-for="item in items"
            :data-value="item.label"
            @select="handleSelectTheme"
          >
            <component :is="item.icon" />
            <div>{{ item.label }}</div>
            <div cmdk-linear-shortcuts class="hidden">
              <svg width="20" height="20" viewBox="0 0 20 20">
                <g
                  stroke="currentColor"
                  fill="none"
                  fill-rule="evenodd"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M18 3v4c0 2-2 4-4 4H2"></path>
                  <path d="M8 17l-6-6 6-6"></path>
                </g>
              </svg>
            </div>
          </Cmdk.Item>
        </Cmdk.Group>
      </Cmdk.List>
      <Cmdk.Group heading="Preference">
        <Cmdk.Item
          v-for="item in preferenceItems"
          :key="item.label"
          :data-value="item.label"
          @select="() => toggleDarkmode()"
        >
          <MoonIcon class="w-6 h-6" v-if="isDark" />
          <SunIcon class="w-6 h-6" v-else />
          {{ item.label }}
          <div cmdk-linear-shortcuts class="hidden">
            <svg width="20" height="20" viewBox="0 0 20 20">
              <g
                stroke="currentColor"
                fill="none"
                fill-rule="evenodd"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M18 3v4c0 2-2 4-4 4H2"></path>
                <path d="M8 17l-6-6 6-6"></path>
              </g>
            </svg>
          </div>
        </Cmdk.Item>
      </Cmdk.Group>
    </template>
    <template #footer>
      <div class="cmdk-palette-logo">
        <a
          href="https://github.com/xiaoluoboding/vue-cmdk-palette"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="cmdk-palette-Label">Search by</span>
          <Logo />
        </a>
      </div>
      <ul class="cmdk-palette-commands">
        <li>
          <kbd class="cmdk-palette-commands-key"
            ><svg width="15" height="15" aria-label="Enter key" role="img">
              <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.2"
              >
                <path
                  d="M12 3.53088v3c0 1-1 2-2 2H4M7 11.53088l-3-3 3-3"
                ></path>
              </g></svg></kbd
          ><span class="cmdk-palette-Label">to select</span>
        </li>
        <li>
          <kbd class="cmdk-palette-commands-key"
            ><svg width="15" height="15" aria-label="Arrow down" role="img">
              <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.2"
              >
                <path d="M7.5 3.5v8M10.5 8.5l-3 3-3-3"></path>
              </g></svg></kbd
          ><kbd class="cmdk-palette-commands-key"
            ><svg width="15" height="15" aria-label="Arrow up" role="img">
              <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.2"
              >
                <path d="M7.5 11.5v-8M10.5 6.5l-3-3-3 3"></path>
              </g></svg></kbd
          ><span class="cmdk-palette-Label">to navigate</span>
        </li>
        <li>
          <kbd class="cmdk-palette-commands-key"
            ><svg width="15" height="15" aria-label="Escape key" role="img">
              <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.2"
              >
                <path
                  d="M13.6167 8.936c-.1065.3583-.6883.962-1.4875.962-.7993 0-1.653-.9165-1.653-2.1258v-.5678c0-1.2548.7896-2.1016 1.653-2.1016.8634 0 1.3601.4778 1.4875 1.0724M9 6c-.1352-.4735-.7506-.9219-1.46-.8972-.7092.0246-1.344.57-1.344 1.2166s.4198.8812 1.3445.9805C8.465 7.3992 8.968 7.9337 9 8.5c.032.5663-.454 1.398-1.4595 1.398C6.6593 9.898 6 9 5.963 8.4851m-1.4748.5368c-.2635.5941-.8099.876-1.5443.876s-1.7073-.6248-1.7073-2.204v-.4603c0-1.0416.721-2.131 1.7073-2.131.9864 0 1.6425 1.031 1.5443 2.2492h-2.956"
                ></path>
              </g></svg></kbd
          ><span class="cmdk-palette-Label">to close</span>
        </li>
      </ul>
    </template>
  </Cmdk.Dialog>
</template>

<script lang="ts" setup>
import { Cmdk } from '../../../src/index'
import { isDark, toggleDarkmode } from '~/composables/useDarkmode'
import RaycastIcon from '~/components/icons/RaycastIcon.vue'
import LinearIcon from '~/components/icons/LinearIcon.vue'
import VercelIcon from '~/components/icons/VercelIcon.vue'
import SunIcon from '~/components/icons/SunIcon.vue'
import MoonIcon from '~/components/icons/MoonIcon.vue'
import Logo from '~/components/icons/Logo.vue'

const emit = defineEmits(['select'])

const items = [
  {
    icon: LinearIcon,
    label: 'Linear',
    shortcut: ['L']
  },
  {
    icon: RaycastIcon,
    label: 'Raycast',
    shortcut: ['R']
  },
  {
    icon: VercelIcon,
    label: 'Vercel',
    shortcut: ['V']
  }
]

const preferenceItems = [
  {
    icon: SunIcon,
    label: 'Toggle Dark Mode',
    shortcut: ['G', 'T']
  }
]

const handleSelectTheme = (item: any) => {
  emit('select', item.value)
}
</script>

<style lang="scss">
@import '~/assets/scss/algolia.scss';
</style>
