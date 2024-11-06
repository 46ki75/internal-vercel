<template>
  <header class="header">
    <div class="icon-container">
      <NuxtLink to="/" class="icon">
        <HomeIcon class="icon" />
      </NuxtLink>
      <NuxtLink to="/anki" class="icon">
        <TagIcon class="icon" />
      </NuxtLink>
      <NuxtLink to="/translate" class="icon">
        <LanguageIcon />
      </NuxtLink>
      <NuxtLink to="/color" class="anki">
        <SwatchIcon class="icon" />
      </NuxtLink>
    </div>

    <div class="icon-container">
      <ElmToggleTheme />
      <ElmLoginIcon
        :is-loading="authStore.isCheckSessionLoading"
        :is-login="!authStore.isCheckSessionError"
        @click="
          async () => {
            const isSuccess = await authStore.logout()
            if (isSuccess) $router.push('/login')
          }
        "
      />
    </div>
  </header>
</template>

<script setup lang="ts">
import { ElmLoginIcon, ElmToggleTheme } from '@elmethis/core'
import {
  HomeIcon,
  LanguageIcon,
  SwatchIcon,
  TagIcon
} from '@heroicons/vue/24/solid'

import { useAuthStore } from '~/stores/authStore'

const authStore = useAuthStore()

const route = useRoute()
const router = useRouter()

const checkSession = async () => {
  const isSuccess = await authStore.checkSession()
  if (!isSuccess) router.push('/login')
}

watch(() => route.path, checkSession)
onMounted(checkSession)
</script>

<style scoped lang="scss">
.header {
  box-sizing: border-box;
  padding: 0 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  height: 3rem;
  box-shadow: 0 0 0.25rem rgba(black, 0.2);

  .icon-container {
    display: flex;
    gap: 0.5rem;

    .icon {
      all: unset;
      padding: 2px;
      width: 24px;
      height: 24px;
      border-radius: 0.25rem;
      transition: background-color 200ms;
      cursor: pointer;

      color: rgba(black, 0.7);
      fill: rgba(black, 0.7);
      [data-theme='dark'] & {
        color: rgba(white, 0.7);
        fill: rgba(white, 0.7);
      }

      &:hover {
        background-color: rgba(black, 0.1);
        [data-theme='dark'] & {
          background-color: rgba(white, 0.1);
        }
      }
    }
  }
}
</style>
