import { createRouter, createWebHistory } from "vue-router";

const adminChildrenRoutes = [
  {
    path: "profile",
    name: "Profile",
    component: () => import("@/views/adminPages/admin/profilePage.vue"),
    meta: { title: "Profile" },
  },
  {
    path: "posts",
    name: "AdminPosts",
    component: () => import("@/views/adminPages/admin/postsManage.vue"),
    meta: { title: "AdminPosts" },
  },
  {
    path: "posts/edit/:id",
    name: "Edit",
    component: () => import("@/components/admin/EditPage.vue"),
    meta: { title: "Edit" },
    props: true,
  },
];

const mainChildrenRoutes = [
  {
    path: "/test",
    name: "Test",
    meta: { title: "Test" },
    component: () => import("@/views/TestPage.vue"),
  },
  {
    path: "/posts",
    name: "Posts",
    meta: { title: "Posts" },
    component: () => import("@/views/MirakoBlog.vue"),
  },
  {
    path: "/posts/:title",
    name: "Post",
    meta: { title: "Post Detail" },
    component: () => import("@/components/BlogDetail.vue"),
  },
  {
    path: "/categories",
    name: "Categories",
    meta: { title: "Categories" },
    component: () => import("@/views/CategoryPage.vue"),
  },
  {
    path: "/categories/:categoryName",
    name: "Category",
    meta: { title: "Category Detail" },
    component: () => import("@/components/CategoryDetail.vue"),
  },
  {
    path: "/tags",
    name: "Tags",
    meta: { title: "Tags" },
    component: () => import("@/views/TagPage.vue"),
  },
  {
    path: "/tags/:tagName",
    name: "Tag",
    meta: { title: "Tags Detail" },
    component: () => import("@/components/TagDetail.vue"),
  },
]

const routes = [
  {
    path: "/",
    name: "Homepage",
    meta: { title: "Home" },
    component: () => import("@/views/IndexLayout.vue"),
    children: mainChildrenRoutes,
  },
  {
    path: "/login",
    name: "Login",
    meta: { title: "Login" },
    component: () => import("@/views/adminPages/loginPage.vue"),
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("@/views/adminPages/admin/AdminLayout.vue"),
    redirect: "/admin/profile",
    children: adminChildrenRoutes,
  },
  {
    path: "/error",
    name: "Error",
    component: () => import("@/views/ERROR.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("jwt_token");
  const requiresAuth = to.path.startsWith("/admin");

  // Check if the route exists
  const routeExists = routes.some((route) =>
    to.matched.some((match) => match.path === route.path)
  );
  if (!routeExists) {
    next({ name: "Error", query: { code: 404, message: "Page Not Found" } });
    return;
  }

  // Check authentication for admin routes
  if (requiresAuth && !token) {
    alert("Please login first");
    next("/login");
    return;
  } else if (token && to.path === "/login") {
    next("/admin");
    return;
  }

  // Set document title
  const title = to.meta?.title;
  if (title) {
    const dynamicTitle =
      (to.name === "post" && to.params.title) ||
      (to.name === "Category" && to.params.categoryName) ||
      (to.name === "Tag" && to.params.tagName);
    document.title = `Mirako's Blog - ${dynamicTitle || title}`;
  } else {
    document.title = "Mirako's Blog";
  }

  // Scroll to top on route change
  window.scrollTo(0, 0);
  next();
});

export default router;
