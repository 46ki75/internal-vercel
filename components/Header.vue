<template>
  <header class="header">
    <ElmToggleTheme />
    <ElmLoginIcon
      :is-loading="status === 'pending'"
      :is-login="error == null"
      @click="logout"
    />
  </header>
</template>

<script setup lang="ts">
import { ElmLoginIcon, ElmToggleTheme } from '@elmethis/core'

const router = useRouter()
const route = useRoute()

const { refresh, error, status } = useFetch('/api/auth/session')

const logout = async () => {
  try {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
  } catch {
    console.error('An error occured while logging out.')
  }
}

watch(
  () => route.fullPath,
  () => {
    refresh()
  }
)
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
