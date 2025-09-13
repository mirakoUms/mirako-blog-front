<template>
    123
</template>

<script setup>
import categoryApi from '../api/category';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const posts = ref([]);
const route = useRoute();

onMounted(async () => {
  try {
    const categoryName = route.params.categoryName;
    const response = await categoryApi.getPostsByCategory(categoryName, 1, 10);
    console.log(response.data)
    posts.value = response.data;
  } catch (err) {
    console.error(err);
  }
});
</script>