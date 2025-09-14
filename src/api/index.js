import axios from 'axios'
import { useAuthStore } from "@/stores/auth";
import router from "@/router";
import { jwtDecode } from "jwt-decode";

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 5000,
})

const token = localStorage.getItem('token')
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

api.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    const token = localStorage.getItem("jwt_token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000;

        if (decoded.exp && decoded.exp < now) {
          authStore.clearAuth();
          alert("登录已过期，请重新登录");
          router.push("/login");
          throw new axios.Cancel("JWT已过期");
        }
      } catch (err) {
        console.error("JWT解析失败", err);
        authStore.clearAuth();
        router.push("/login");
        throw new axios.Cancel("JWT无效");
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!axios.isCancel(error) && error.response?.status === 401) {
      const authStore = useAuthStore();
      authStore.clearAuth();
      alert("登录已过期，请重新登录");
      router.push("/login");
    }
    return Promise.reject(error);
  }
);


export default api