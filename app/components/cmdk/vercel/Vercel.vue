<template>
  <Cmdk.Dialog
    :visible="true"
    theme="vercel"
    @select-item="handleSelectItem"
    @keydown="handleKeyDown"
  >
    <template #header>
      <Cmdk.Input placeholder="What do you need?" />
    </template>
    <template #body>
      <!-- <Cmdk.Loading> Hang on... </Cmdk.Loading> -->
      <Cmdk.List ref="dialogRef">
        <Cmdk.Empty>No results found.</Cmdk.Empty>
        <Transition name="pop-page">
          <KeepAlive>
            <component :is="currentView" :key="activePage" />
          </KeepAlive>
        </Transition>
      </Cmdk.List>
    </template>
  </Cmdk.Dialog>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

import { Cmdk } from '@/index'
import { ItemInfo } from '@/types'

import Home from './Home.vue'
import Projects from './Projects.vue'

const activePage = ref('home')

const currentView = computed(() => {
  return activePage.value === 'home' ? Home : Projects
})

const isHomePage = computed(() => activePage.value === 'home')
const togglePage = () => {
  activePage.value = isHomePage.value ? 'projects' : 'home'
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (isHomePage.value) {
    return
  }

  if (e.key === 'Backspace') {
    e.preventDefault()
    togglePage()
  }
}

const handleSelectItem = (item: ItemInfo) => {
  if (item.value === 'Search Projects...') {
    togglePage()
  }
}
</script>

<style lang="scss">
@import '~/assets/scss/vercel.scss';

.pop-page-enter-active {
  animation: scale-in 0.2s;
}
.pop-page-leave-active {
  animation: scale-in 0.2s reverse;
}

@keyframes scale-in {
  0% {
    transform: scale(0.96);
    opacity: 0;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
