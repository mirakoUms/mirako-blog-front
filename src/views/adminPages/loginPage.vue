<template>
  <div class="login-container">
    <h2>登录</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">用户名</label>
        <input type="text" id="username" v-model="username" required autocomplete="username" />
      </div>
      <div class="form-group">
        <label for="password">密码</label>
        <input type="password" id="password" v-model="password" required autocomplete="current-password" />
      </div>
      <button type="submit" :disabled="loading" class="login-button">
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

<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #555;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

input:focus {
  outline: none;
}

.login-button {
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button:disabled {
  cursor: not-allowed;
}

.error-message {
  margin-top: 10px;
  color: #d9534f;
  text-align: center;
}
</style>