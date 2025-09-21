<template>
  <div>
    <h1>List of Tags</h1>
    <span style="padding: 3px;" v-for="post in posts" :key="post.id">
        <router-link :to="`/tags/${post.tag_name}`">
            <span>
            {{ post.tag_name }} ({{ post.post_count }})
            </span>
        </router-link>
        &nbsp;
    </span>
  </div>
</template>

<script setup>
import tagApi from '../api/tag';
import { ref, onMounted } from 'vue';

const posts = ref([]);

onMounted(async () => {
  try {
    const response = await tagApi.getAllTags();
    posts.value = response.data;
  } catch (err) {
    console.error(err);
  }
});
</script>