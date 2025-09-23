<template>
  <div>
    <h1>文章详情</h1>
    <div v-if="post">
      <h2>{{ post.title }}</h2>
      <p>{{ post.content }}</p>
    </div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>加载中...</div>
    <router-link :to="`/`">TOP</router-link>
  </div>
</template>

<script setup>
import postsApi from '../api/post';
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const post = ref(null);
const error = ref(null);
const route = useRoute();
const router = useRouter();

const fetchPost = async (title) => {
  try {
    const res = await postsApi.getById(title);
    if (!res.data) {
      router.replace({
        name: 'Error',
        query: { code: 404, message: 'Post Not Found' },
      });
    } else {
      post.value = res.data;
    }
  } catch (err) {
    router.replace({
      name: 'Error',
      query: { code: 500, message: 'Failed to load post' },
    });
  }
};

onMounted(() => {
  fetchPost(route.params.title);
});

watch(
  () => route.params.title,
  (newTitle) => {
    fetchPost(newTitle);
  }
);
</script>
