<template>
  <div class="edit-page">
    <div v-if="post">
      <h3>{{ post.title }}</h3>
      <form @submit.prevent="savePost">
        TITLE: <input required type="text" v-model="modifiedPost.title" />
        <br><br>

        SUMMARY: <input required type="text" v-model="modifiedPost.summary" />
        <br><br>

        THUMBNAIL: <input required type="text" v-model="modifiedPost.thumbnail_url" />
        <br><br>

        GENRE:
        <select required name="category" id="category" v-model="modifiedPost.category_id">
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
        <br><br>

        Post CONTENT:
        <textarea v-model="modifiedPost.content"></textarea>
        <br><br>

        <button type="submit">Save</button>
      </form>
    </div>
    <div v-else>loading post...</div>
  </div>
</template>

<script setup>
import postsApi from '../../api/post';
import editPostApi from '../../api/editPost';
import catgoryApi from '../../api/category';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
const modifiedPost = ref({});

const post = ref(null);
const categories = ref(null);
const route = useRoute();
const error = ref(null);

const getPostInfo = async () => {
  try {
    const id = route.params.id;
    const response = await postsApi.getById(id);
    post.value = response.data;

    modifiedPost.value = {
      ...post.value,
      category_id: categories.value.find(c => c.name === post.value.category_name)?.id || ""
    };
  } catch (err) {
    console.error(err);
    error.value = "load post failed, please try again later";
  }
};

const getAllCategory = async () => {
  try {
    const res = await catgoryApi.getAllCategory();
    categories.value = res.data;
  } catch (err) {
    error.value = "load category failed, please try again later";
    throw new Error('category load failed');
  }
};

const savePost = async () => {
  try {
    const [infoResponse, contentResponse] = await Promise.all([
      editPostApi.savePostInfo(modifiedPost.value),
      editPostApi.savePostContent(modifiedPost.value)
    ]);

    if (infoResponse.data > 0 || contentResponse.data > 0) {
      alert("Saved successfully!");
    } else {
      alert("No changes were made.");
    }
  } catch (err) {
    console.error(err);
    alert("Save failed! Please try again later.");
  }
};

onMounted(async () => {
  try {
    await Promise.all([getAllCategory(), getPostInfo()]);
  } catch (err) {
    console.error("Error during initialization:", err);
  }
});
</script>

<style scoped>
input[type="text"],
textarea {
  margin-top: 5px;
}

textarea {
  min-height: 100px;
  resize: vertical;
}
</style>