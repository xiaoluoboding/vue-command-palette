<template>
  <Cmdk.Dialog :visible="true" theme="linear">
    <template #header>
      <Cmdk.Input placeholder="Type a command or search..." />
    </template>
    <template #body>
      <!-- <Cmdk.Loading> Hang on... </Cmdk.Loading> -->
      <Cmdk.List>
        <Cmdk.Empty>No results found.</Cmdk.Empty>
        <Cmdk.Item v-for="item in items" :cmdk-data-value="item.label">
          <component :is="item.icon" />
          <div>{{ item.label }}</div>
          <div cmdk-linear-shortcuts>
            <kbd v-for="key in item.shortcut" key="key">{{ key }}</kbd>
          </div>
        </Cmdk.Item>
        <Cmdk.Group heading="Web Dev Tools">
          <Cmdk.Item cmdk-data-value="GitHub">
            <div>GitHub</div>
          </Cmdk.Item>
          <Cmdk.Separator />
          <Cmdk.Item cmdk-data-value="Vite">
            <div>Vite</div>
          </Cmdk.Item>
          <Cmdk.Item cmdk-data-value="Vue">
            <div>Vue</div>
          </Cmdk.Item>
        </Cmdk.Group>
      </Cmdk.List>
    </template>
    <template #footer>
      <ul class="cmdk-palette--footer-right">
        <li>
          <kbd class="cmdk-palette--key">
            <svg width="15" height="15" aria-label="Enter key" role="img">
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
              </g>
            </svg>
          </kbd>
          <span class="cmdk-palette--label">to select</span>
        </li>
        <li>
          <kbd class="cmdk-palette--key">
            <svg width="15" height="15" aria-label="Arrow down" role="img">
              <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.2"
              >
                <path d="M7.5 3.5v8M10.5 8.5l-3 3-3-3"></path>
              </g>
            </svg>
          </kbd>
          <kbd class="cmdk-palette--key">
            <svg width="15" height="15" aria-label="Arrow up" role="img">
              <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.2"
              >
                <path d="M7.5 11.5v-8M10.5 6.5l-3-3-3 3"></path>
              </g>
            </svg>
          </kbd>
          <span class="cmdk-palette--label">to navigate</span>
        </li>
        <li>
          <kbd class="cmdk-palette--key">
            <svg width="15" height="15" aria-label="Escape key" role="img">
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
              </g>
            </svg>
          </kbd>
          <span class="cmdk-palette--label">to close</span>
        </li>
      </ul>
      <div class="cmdk-palette-footer-left">Linear</div>
    </template>
  </Cmdk.Dialog>
</template>

<script lang="ts" setup>
import { Cmdk } from '../../../src/index'
import LinearAssignToIcon from '../icons/LinearAssignToIcon.vue'
import LinearAssignToMeIcon from '../icons/LinearAssignToMeIcon.vue'
import LinearChangeStatusIcon from '../icons/LinearChangeStatusIcon.vue'
import LinearChangePriorityIcon from '../icons/LinearChangePriorityIcon.vue'
import LinearChangeLabelsIcon from '../icons/LinearChangeLabelsIcon.vue'
import LinearRemoveLabelIcon from '../icons/LinearRemoveLabelIcon.vue'
import LinearSetDueDateIcon from '../icons/LinearSetDueDateIcon.vue'

const items = [
  {
    icon: LinearAssignToIcon,
    label: 'Assign to...',
    shortcut: ['A']
  },
  {
    icon: LinearAssignToMeIcon,
    label: 'Assign to me',
    shortcut: ['I']
  },
  {
    icon: LinearChangeStatusIcon,
    label: 'Change status...',
    shortcut: ['S']
  },
  {
    icon: LinearChangePriorityIcon,
    label: 'Change priority...',
    shortcut: ['P']
  },
  {
    icon: LinearChangeLabelsIcon,
    label: 'Change labels...',
    shortcut: ['L']
  },
  {
    icon: LinearRemoveLabelIcon,
    label: 'Remove label...',
    shortcut: ['⇧', 'L']
  },
  {
    icon: LinearSetDueDateIcon,
    label: 'Set due date...',
    shortcut: ['⇧', 'D']
  }
]
</script>

<style lang="scss">
@import '~/assets/scss/linear.scss';
</style>
