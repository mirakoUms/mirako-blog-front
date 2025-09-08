<template>
  <div>
    <h1>文章详情</h1>
    <div v-if="post">
      <h2>{{ post.title }}</h2>
      <p>{{ post.content }}</p>
    </div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>加载中...</div>
  </div>
</template>

<script setup>
import { getPostById } from '../api/post';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const post = ref(null);
const route = useRoute();

onMounted(async () => {
    try {
      const id = route.params.id;
      const response = await getPostById(id);
      post.value = response.data.data;
    } catch (err) {
      throw new Error('无法加载文章');
    }
});

</script>

<style scoped>
/* 添加一些样式 */
</style>