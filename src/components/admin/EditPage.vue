<template>
  <div class="edit-page">
    <div v-if="post">
      <h3>{{ post.title }}</h3>
      <form @submit.prevent="savePost">
        TITLE: <input type="text" v-model="modifiedPost.title" />
        <br><br>

        SUMMARY: <input type="text" v-model="modifiedPost.summary" />
        <br><br>

        THUMBNAIL: <input type="text" v-model="modifiedPost.thumbnail_url" />
        <br><br>

        GENRE:
        <select name="category" id="category" v-model="modifiedPost.category_id">
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
        <br><br>

        文章内容:
        <textarea v-model="modifiedPost.content"></textarea>
        <br><br>

        <button type="submit">保存</button>
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

const modifiedPost = ref({
  title: "",
  summary: "",
  thumbnail_url: "",
  category_id: "",
  content: ""
});

const post = ref(null);
const categories = ref(null);
const route = useRoute();
const error = ref(null);

const getPostInfo = async () => {
  try {
    const id = route.params.id;
    if (!id) {
      throw new Error("文章ID不存在");
    }

    const response = await postsApi.getById(id);
    if (!response || !response.data) {
      throw new Error("未能获取文章数据");
    }

    post.value = response.data;

    if (!categories.value || !Array.isArray(categories.value)) {
      throw new Error("分类数据未加载或无效");
    }

    modifiedPost.value = {
      ...post.value,
      category_id: categories.value.find(c => c.name === post.value.category_name)?.id || ""
    };
  } catch (err) {
    console.error(err);
    error.value = "加载文章失败，请稍后重试";
  }
};

const getAllCategory = async () => {
  try {
    const res = await catgoryApi.getAllCategory();
    categories.value = res.data;
  } catch (err) {
    error.value = "加载失败";
    throw new Error('无法加载category');
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
h4 {
  margin-bottom: 15px;
  color: #333;
}

input[type="text"],
textarea {
  margin-top: 5px;
}

textarea {
  min-height: 100px;
  resize: vertical;
}
</style>