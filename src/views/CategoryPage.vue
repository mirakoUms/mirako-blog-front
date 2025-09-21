<template>
  <div>
    <h1>List of Genres</h1>
    {{ posts }}
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
        <span style="font-size: small; color: gray;">{{ item.post_count }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import categoryApi from '../api/category';
import { ref, onMounted } from 'vue';

const posts = ref([]);

onMounted(async () => {
  try {
    const response = await categoryApi.getAllCategory();
    posts.value = response.data;
  } catch (err) {
    console.error(err);
  }
});
</script>