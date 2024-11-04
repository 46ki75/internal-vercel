<template>
  <Header />
  <main class="main">
    <slot />
  </main>
</template>

<style scoped lang="scss">
.main {
  height: min-content;
  margin: 0;
  padding: 0.5rem;
}
</style>
