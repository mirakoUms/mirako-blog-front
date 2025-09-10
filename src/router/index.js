import { createRouter, createWebHistory } from "vue-router";
import BlogDetail from "../components/BlogDetail.vue";
import Mirako from "../views/MirakoBlog.vue";
import profilePage from "@/views/adminPages/admin/profilePage.vue"
import loginPage from "@/views/adminPages/loginPage.vue";

const routes = [
  {
    path: "/",
    name: "homepage",
    redirect: "/posts",
  },
  {
    path: "/posts",
    name: "posts",
    component: Mirako,
  },
  {
    path: "/posts/:id",
    name: "post",
    component: BlogDetail,
  },
  {
    path: "/login",
    name: "login",
    component: loginPage,
  },
  {
    path: "/admin/profile",
    name: "admin",
    component: profilePage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('jwt_token');
    const requiresAuth = to.path === '/admin';

    if (requiresAuth && !token) {
        alert('pls login first')
        next('/login');
    } else if (token && to.path === '/login') {
        next('/admin');
    } else {
        next();
    }
});

export default router;
