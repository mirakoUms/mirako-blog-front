import { defineStore } from "pinia";
import { ref, computed } from "vue";
import api from "@/api";
import router from "@/router";

export const useAuthStore = defineStore("auth", () => {
  const token = ref(localStorage.getItem("token"));
  const user = ref(JSON.parse(localStorage.getItem("user")));

  // getters
  const isAuthenticated = computed(() => !!token.value);

  // actions
  function setToken(newToken) {
    token.value = newToken;
    localStorage.setItem("token", newToken);
    // 设置 Axios 的请求头
    api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
  }

  function setUser(newUser) {
    user.value = newUser;
    localStorage.setItem("user", JSON.stringify(newUser));
  }

  function clearAuth() {
    token.value = null;
    user.value = null;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete api.defaults.headers.common["Authorization"];
  }

  async function login(credentials) {
    try {
      const loginResponse = await api.post("/auth/login", credentials);
      const { token: newToken, userId } = loginResponse.data;

      if (!newToken || !userId) {
        throw new Error("登录失败，未获取到 Token 或 User ID");
      }

      setToken(newToken);

      const meResponse = await api.post("/me", { id: userId });

      // 4. 设置用户信息，这一步和之前一样
      setUser(meResponse.data);

      // 5. 跳转到个人资料页
      await router.push("/admin/profile");
    } catch (error) {
      clearAuth();
      throw error;
    }
  }

  function logout() {
    clearAuth();
    router.push("/login");
  }

  return {
    token,
    user,
    isAuthenticated,
    login,
    logout,
    setToken,
  };
});
