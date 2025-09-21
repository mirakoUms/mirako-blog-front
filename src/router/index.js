import { createRouter, createWebHistory } from "vue-router";
import BlogDetail from "../components/BlogDetail.vue";
import Mirako from "../views/MirakoBlog.vue";
import CategoryPage from "@/views/CategoryPage.vue";
import CategoryDetail from "@/components/CategoryDetail.vue";
import TagPage from "@/views/TagPage.vue";
import TagDetail from "@/components/TagDetail.vue";
import adminHome from "@/views/adminPages/admin/AdminLayout.vue";
import profilePage from "@/views/adminPages/admin/profilePage.vue";
import loginPage from "@/views/adminPages/loginPage.vue";
import postsManage from "@/views/adminPages/admin/postsManage.vue";
import editPage from "@/components/admin/EditPage.vue";

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
    path: "/categories",
    name: "Categories",
    component: CategoryPage,
  },
  {
    path: "/categories/:categoryName",
    name: "Category",
    component: CategoryDetail,
  },
  {
    path: "/tags",
    name: "Tags",
    component: TagPage,
  },
  {
    path: "/tags/:tagName",
    name: "Tag",
    component: TagDetail,
  },
  {
    path: "/login",
    name: "login",
    component: loginPage,
  },
  {
    path: "/admin",
    name: "Admin",
    component: adminHome,
    redirect: "/admin/profile",
    children: [
      {
        path: "profile",
        name: "Profile",
        component: profilePage,
        meta: { title: "Profile" },
      },
      {
        path: "posts",
        name: "Posts",
        component: postsManage,
        meta: { title: "Posts" },
      },
      {
        path: "posts/edit/:id",
        name: "Edit",
        component: editPage,
        meta: { title: "Edit" },
        props: true,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("jwt_token");
  const requiresAuth = to.path.startsWith("/admin");

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
