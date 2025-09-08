import { createRouter, createWebHistory } from 'vue-router';
import BlogDetail from '../components/BlogDetail.vue';
import Mirako from '../views/MirakoBlog.vue';

const routes = [
  {
    path: '/posts',
    name: 'home',
    component: Mirako,
    children: [
      {
        path: ':id',
        name: 'post',
        component: BlogDetail
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
