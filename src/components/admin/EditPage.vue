<template>
  <div class="edit-page">
    <div v-if="post">
      <h3>{{ post.title }}</h3>
      <form>
        TITLE: <input type="text" v-model="post.title" />
        <br><br>
        SUMMARY: <input type="text" v-model="post.summary" />
        <br><br>
        THUMBNAIL: <input type="text" v-model="post.thumbnail_url" />
        <br><br>
        GENRE: <select name="languages" id="language">
          <option value="select">-- Select a language --</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="csharp">C#</option>
        </select>
        <br><br>
        文章内容: <textarea v-model="post.content"></textarea>
        <br><br>
        <button @click="savePost">保存</button>
      </form>
    </div>
    <div v-else>正在加载文章...</div>
  </div>
</template>

<script setup>
import postsApi from '../../api/post';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const post = ref(null);
const route = useRoute();
const error = ref(null);

onMounted(async () => {
  try {
    const id = route.params.id;
    const response = await postsApi.getById(id);
    post.value = response.data;
  } catch (err) {
    error.value = "加载失败";
    throw new Error('无法加载文章');
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