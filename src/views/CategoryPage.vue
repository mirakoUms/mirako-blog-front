<template>
  <div>
    <h1>文章列表</h1>

    <ul>
      <li v-for="item in posts" :key="item.id">
        <router-link :to="`/posts/${item.id}`">{{ item.title }}</router-link>
        &nbsp;
        <router-link :to="`/category/${item.category_name}`">
          <span style="border-radius: 5px; background-color: bisque;">
            {{ item.category_name }}
          </span>
        </router-link>
        &nbsp;
        <span style="font-size: small; color: gray;">{{ item.tag_names }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import categoryApi from '../api/category';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const posts = ref([]);
const route = useRoute();

onMounted(async () => {
  try {
    const categoryName = route.params.category_name;
    const response = await categoryApi.getPostsByCategory(categoryName);
    console.log(response.data)
    posts.value = response.data;
  } catch (err) {
    console.error(err);
  }
});
</script>