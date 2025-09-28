<template>
  <div>
    <h1>文章列表</h1>

    <ul v-if="posts.length > 0">
      <li v-for="item in posts" :key="item.id">
        <router-link :to="`/posts/${item.id}`">{{ item.title }}</router-link>
        &nbsp;
        <router-link :to="`/categories/${item.category_name}`">
          <span style="border-radius: 5px; background-color: bisque;">
            {{ item.category_name }}
          </span>
        </router-link>
        &nbsp;
        <span style="font-size: small; color: gray;">{{ item.tag_names }}</span>
      </li>
    </ul>

    <p v-else-if="isLoading">加载中...</p>

    <p v-else>没有文章</p>

    <div style="margin-top: 10px;">
      <button @click="prevPage" :disabled="page === 1">上一页</button>
      <span>第 {{ page }} 页</span>
      <button @click="nextPage" :disabled="page === totalPages || totalPages === 0">下一页</button>
    </div>
  </div>
</template>

<script setup>
import postsApi from '../api/post';
import { ref, onMounted } from 'vue';
import { startProgress, doneProgress } from "../utils/nprogress";

const posts = ref([]);
const page = ref(1);
const limit = ref(5);
const totalPages = ref(1);
const isLoading = ref(false);

const fetchPosts = async () => {
  try {
    isLoading.value = true;
    const response = await postsApi.getAll(page.value, limit.value);
    const data = response?.data ?? [];
    posts.value = data;
    return response;
  } catch (err) {
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

const fetchTotalPages = async () => {
  try {
    const response = await postsApi.getTotalPosts();
    totalPages.value = Math.ceil(response.count / limit.value);
    return response;
  } catch (err) {
    console.error(err);
  }
};

const prevPage = () => {
  if (page.value > 1) {
    page.value--;
    fetchPosts();
  }
};

const nextPage = () => {
  if (page.value < totalPages.value) {
    page.value++;
    fetchPosts();
  }
};

onMounted(() => {
  startProgress();
  Promise.all([fetchTotalPages(), fetchPosts()])
    .catch((err) => console.error(err))
    .finally(() => { doneProgress(); });
});
</script>
