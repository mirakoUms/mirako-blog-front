import { createRouter, createWebHistory } from "vue-router";
import BlogDetail from "../components/BlogDetail.vue";
import Mirako from "../views/MirakoBlog.vue";

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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
