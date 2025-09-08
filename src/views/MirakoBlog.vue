<template>
  <div>
    <h1>文章列表</h1>
    <ul>
      <li v-for="item in posts" :key="item.id">
        <router-link :to="`/posts/${item.id}`">{{ item.title }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { getAllPosts } from '../api/post';
import { ref, onMounted } from 'vue';

const posts = ref([]);

onMounted(async () => {
  try {
    const response = await getAllPosts();
    posts.value = response.data.data;
  } catch (err) {
    console.error(err);
  }
});
</script>

<style scoped>
/* 添加一些样式 */
</style>