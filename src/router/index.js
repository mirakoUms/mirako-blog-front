import { createRouter, createWebHistory } from "vue-router";
import BlogDetail from "../components/BlogDetail.vue";
import Mirako from "../views/MirakoBlog.vue";
import CategoryPage from "@/views/CategoryPage.vue";
import CategoryDetail from "@/components/CategoryDetail.vue";
import profilePage from "@/views/adminPages/admin/profilePage.vue";
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
    path: "/posts/:title",
    name: "post",
    component: BlogDetail,
  },
  {
    path: "/category",
    name: "Categories",
    component: CategoryPage,
  },
  {
    path: "/category/:categoryName",
    name: "Category",
    component: CategoryDetail,
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
  const token = localStorage.getItem("jwt_token");
  const requiresAuth = to.path === "/admin";

  if (requiresAuth && !token) {
    alert("please login first");
    next("/login");
  } else if (token && to.path === "/login") {
    next("/admin");
  } else {
    next();
  }
});

export default router;
