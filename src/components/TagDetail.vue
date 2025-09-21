<template>
  <div>
    <h1>{{ route.params.tagName }}</h1>
    <router-link
            v-for="post in posts"
            :key="post.id"
            :to="`/posts/${post.id}`"
            >{{ post.title }}</router-link
        >
    <br/>
    <router-link :to="`/posts`">TOP</router-link>
  </div>
</template>

<script setup>
import tagApi from '../api/tag';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const posts = ref([]);
const route = useRoute();

onMounted(async () => {
  try {
    const tagName = route.params.tagName;
    const response = await tagApi.getTagByName(tagName, 1, 10);
    posts.value = response.data;
  } catch (err) {
    console.error(err);
  }
});
</script>