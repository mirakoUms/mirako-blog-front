<template>
  <div>
    <h1>文章详情</h1>
    <div v-if="post">
      <h2>{{ post.title }}</h2>
      <p>{{ post.content }}</p>
    </div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>加载中...</div>
    <router-link :to="`/posts`">TOP</router-link>
  </div>
</template>

<script setup>
import postsApi from '../api/post';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const post = ref(null);
const route = useRoute();
const error = ref(null);

onMounted(async () => {
  try {
    const title = route.params.title;
    const response = await postsApi.getById(title);
    post.value = response.data;
  } catch (err) {
    error.value = "加载失败";
    throw new Error('无法加载文章');
  }
});

</script>