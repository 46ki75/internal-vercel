<script setup lang="ts">
import { ElmPagetop } from '@elmethis/core'
</script>

<template>
  <Header />
  <main class="main">
    <slot />
  </main>
  <ElmPagetop />
</template>

<style scoped lang="scss">
.main {
  height: min-content;
  margin: 0;
  padding: 0.5rem;
}
</style>
