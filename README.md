# Command Palette for Vue 3

## Preview

## Features

- 🧩 [Compound Component](https://kentcdodds.com/blog/compound-components-with-react-hooks) Design
-

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
      <Command.Item>Command 1</Command.Item>
      <Command.Item>Command 2</Command.Item>
      <Command.Item>Command 3</Command.Item>
    </Command.List>
  </Command>
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
        <Command.Item>Command 1</Command.Item>
        <Command.Item>Command 2</Command.Item>
        <Command.Item>Command 3</Command.Item>
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

## License

MIT [@xiaoluoboding](https://github.com/xiaoluoboding)
