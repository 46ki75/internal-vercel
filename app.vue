<template>
  <ClientOnly>
    <Suspense>
      <template #default>
        <NuxtLayout name="default">
          <NuxtPage
            :transition="{
              enterActiveClass: 'fade-enter-active',
              leaveActiveClass: 'fade-leave-active',
              enterFromClass: 'fade-enter-from',
              leaveToClass: 'fade-leave-to',
              mode: 'out-in'
            }"
          />
        </NuxtLayout>
      </template>

      <template #fallback><Fallback /></template>
    </Suspense>
  </ClientOnly>
</template>

<style lang="scss">
body {
  transition: background-color 200ms;

  background-color: rgba(0, 0, 0, 0.05);
  [data-theme='dark'] & {
    background-color: rgba(0, 0, 0, 0.85);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 100ms;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
