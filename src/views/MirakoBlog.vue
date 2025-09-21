<template>
  <div>
    <h1>文章列表</h1>

    <ul>
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

    <div style="margin-top: 10px;">
      <button @click="prevPage" :disabled="page === 1">上一页</button>
      <span>第 {{ page }} 页</span>
      <button @click="nextPage" :disabled="page === totalPages">下一页</button>
    </div>
  </div>
</template>

<script setup>
import postsApi from '../api/post';
import { ref, onMounted } from 'vue';

const posts = ref([]);
const page = ref(1);
const limit = ref(5);
const totalPages = ref(1);

const fetchPosts = async () => {
  try {
    const response = await postsApi.getAll(page.value, limit.value);
    posts.value = response.data;
  } catch (err) {
    console.error(err);
  }
};

const fetchTotalPages = async () => {
  try {
    const res = await postsApi.getTotalPosts();
    totalPages.value = Math.ceil(res.count / limit.value);
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

onMounted(async () => {
  await fetchTotalPages();
  fetchPosts();
});
</script>
