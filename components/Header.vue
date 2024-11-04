<template>
  <header class="header">
    <div class="icon-container">
      <HomeIcon class="icon" @click="$router.push('/')" />
      <TagIcon class="icon" @click="$router.push('/anki')" />
      <SwatchIcon class="icon" @click="$router.push('/color')" />
    </div>

    <div class="icon-container">
      <ElmToggleTheme />
      <ElmLoginIcon
        :is-loading="isLoading"
        :is-login="!isError"
        @click="logout"
      />
    </div>
  </header>
</template>

<script setup lang="ts">
import { ElmLoginIcon, ElmToggleTheme } from '@elmethis/core'
import { HomeIcon, SwatchIcon, TagIcon } from '@heroicons/vue/24/solid'

const router = useRouter()
const route = useRoute()

const isLoading = ref(false)
const isError = ref(false)

const checkSession = async () => {
  isLoading.value = true
  isError.value = false
  try {
    const response = await fetch('/api/auth/session')
    if (!response.ok) {
      throw new Error('You are not logged in.')
    }
  } catch (error) {
    isError.value = true
    router.push('/login')
  } finally {
    isLoading.value = false
  }
}

const logout = async () => {
  try {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
  } catch {
    console.error('An error occured while logging out.')
  }
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
      padding: 2px;
      width: 24px;
      transition: background-color 200ms;
      cursor: pointer;

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
