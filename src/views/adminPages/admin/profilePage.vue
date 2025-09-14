<template>
  <div class="profile-container">
    <h3>ME</h3>
    <div v-if="authStore.user">
      <p><strong>UID:</strong> {{ authStore.user.user.id }}</p>
      <p><strong>username:</strong> {{ authStore.user.user.username }}</p>
      <p><strong>email:</strong> {{ authStore.user.user.email }}</p>
      </div>
    <div v-else>
      <p>loading info...</p>
    </div>
    <button @click="handleLogout">logout</button>
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