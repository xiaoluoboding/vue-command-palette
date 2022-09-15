# Command Palette for Vue

![vue-command-palette minzip package size](https://img.shields.io/bundlephobia/minzip/vue-command-palette)
![vue-command-palette package version](https://img.shields.io/npm/v/vue-command-palette.svg?colorB=green)

> A fast, composable, unstyled `command` + `k` interface (Command Palette) for Vue.

## Preview

![Preview](vue-command-palette.gif)

## Features

- 🧩 [Compound Component](https://kentcdodds.com/blog/compound-components-with-react-hooks) Design
- 💄 Completely unstyled, but more customizable
- 🔍 Fuzzy search support to find relevant command
- ⌨️ keyboard shortcut support to bind custom keybindings to your command

## Install

```bash
yarn add vue-command-palette
//
pnpm add vue-command-palette
```

## Usage

Then you can import the `Command` [Compound Component](https://kentcdodds.com/blog/compound-components-with-react-hooks) in your project.

```vue
<template>
  <Command theme="custom">
    <Command.Input placeholder="Type a command or search..." />
    <Command.List>
      <Command.Empty>No results found.</Command.Empty>

      <Command.Group heading="Letters">
        <Command.Item>a</Command.Item>
        <Command.Item>b</Command.Item>
        <Command.Separator />
        <Command.Item>c</Command.Item>
      </Command.Group>

      <Command.Item>Apple</Command.Item>
    </Command.List>
  </Command>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Command } from 'vue-command-palette'
</script>

<style>
// import your custom css
@import '~/assets/css/custom.css';
</style>
```

or in a dialog:

```vue
<template>
  <Command.Dialog :visible="visible" theme="custom">
    <template #header>
      <Command.Input placeholder="Type a command or search..." />
    </template>
    <template #body>
      <Command.List>
        <Command.Empty>No results found.</Command.Empty>

        <Command.Group heading="Letters">
          <Command.Item>a</Command.Item>
          <Command.Item>b</Command.Item>
          <Command.Separator />
          <Command.Item>c</Command.Item>
        </Command.Group>

        <Command.Item>Apple</Command.Item>
      </Command.List>
    </template>
  </Command.Dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Command } from 'vue-command-palette'

const visible = ref(false)
</script>

<style>
// import your custom css
@import '~/assets/css/custom.css';
</style>
```

### Events

### Styling

### Animation

## Compound components

### Command

### Command.Dialog

### Command.Input

### Command.List

### Command.Group

### Command.Item

### Command.Separator

### Command.Empty

### Command.Loading

## Inspiration

- [cmdk](https://github.com/pacocoursey/cmdk) - Fast, unstyled command menu React component.
- [kbar](https://github.com/timc1/kbar) - fast, portable, and extensible cmd+k interface for your site.

## License

MIT [@xiaoluoboding](https://github.com/xiaoluoboding)
