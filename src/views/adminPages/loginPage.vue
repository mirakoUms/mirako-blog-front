<template>
  <div class="login-container">
    <h2>登录</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">用户名:</label>
        <input type="text" id="username" v-model="username" required  autocomplete="username"/>
      </div>
      <div>
        <label for="password">密码:</label>
        <input type="password" id="password" v-model="password" required autocomplete="current-password"/>
      </div>
      <button type="submit" :disabled="loading">
        {{ loading ? '登录中...' : '登录' }}
      </button>
      <p v-if="error" class="error-message">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref(null)

const handleLogin = async () => {
  loading.value = true
  error.value = null
  try {
    await authStore.login({
      username: username.value,
      password: password.value,
    })
  } catch (err) {
    if (err.response) {
      if (err.response.status === 401) {
        error.value = "invalid credentials";
      } else {
        error.value = err.response.data?.message || "Unknown error";
      }
      console.warn(`login failed: [${err.response.status}]: ${error.value}`);
    } else if (err.request) {
      error.value = "No response from server, please check your internet or try again later.";
      console.warn("Login failed, no response from server.");
    } else {
      error.value = "网络异常，请稍后重试。";
      console.warn("登录异常：", err.message);
    }
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped></style>