<template>
  <div class="profile-container">
    <h2>个人资料</h2>
    <div v-if="authStore.user">
      <p><strong>ID:</strong> {{ authStore.user.user.id }}</p>
      <p><strong>用户名:</strong> {{ authStore.user.user.username }}</p>
      <p><strong>邮箱:</strong> {{ authStore.user.user.email }}</p>
      </div>
    <div v-else>
      <p>正在加载用户信息...</p>
    </div>
    <button @click="handleLogout">退出登录</button>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const handleLogout = () => {
  authStore.logout()
}
</script>

<style scoped>

</style>