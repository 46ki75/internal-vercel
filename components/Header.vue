<template>
  <header class="header">
    <ElmInlineText text="HEADER" />
    <ElmToggleTheme />
  </header>
</template>

<script setup lang="ts">
import { ElmInlineText, ElmToggleTheme } from '@elmethis/core'
</script>

<style scoped lang="scss">
.header {
  box-sizing: border-box;
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  height: 3rem;
  box-shadow: 0 0 0.25rem rgba(black, 0.2);
}
</style>
