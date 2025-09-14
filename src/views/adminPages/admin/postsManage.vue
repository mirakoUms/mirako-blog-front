<template>
    <div>
        <h3>Posts List</h3>

        <table style="width: auto; border-collapse: collapse; font-size: xx-small;">
            <thead>
                <tr>
                    <th style="text-align: left; padding: 8px;">author</th>
                    <th style="text-align: left; padding: 8px;">title</th>
                    <th style="text-align: left; padding: 8px;">summary</th>
                    <th style="text-align: left; padding: 8px;">genre</th>
                    <th style="text-align: left; padding: 8px;">tags</th>
                    <th style="text-align: left; padding: 8px;">PIC</th>
                    <th style="text-align: left; padding: 8px;">created</th>
                    <th style="text-align: left; padding: 8px;">updated</th>
                    <th style="text-align: left; padding: 8px;">opration</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in posts" :key="item.id">
                    <td style="padding: 8px; white-space: nowrap;">
                        {{ item.username }}
                    </td>
                    <td style="padding: 8px; white-space: nowrap;">
                        <router-link :to="`/posts/${item.id}`">{{ item.title }}</router-link>
                    </td>
                    <td style="padding: 8px; white-space: nowrap;">
                        {{ item.summary }}
                    </td>
                    <td style="padding: 8px; white-space: nowrap;">
                        <router-link :to="`/category/${item.category_name}`">
                            <span style="border-radius: 5px; background-color: bisque; padding: 2px 6px;">
                                {{ item.category_name }}
                            </span>
                        </router-link>
                    </td>
                    <td style="padding: 8px; white-space: nowrap;">
                        <span style="font-size: small; color: gray;">{{ item.tag_names }}</span>
                    </td>
                    <td style="padding: 8px; white-space: nowrap;">
                        <img width="32px" :src="item.thumbnail_url" />
                    </td>
                    <td style="padding: 8px; white-space: nowrap;">
                        {{ item.created_at }}
                    </td>
                    <td style="padding: 8px; white-space: nowrap;">
                        {{ item.updated_at }}
                    </td>
                    <td>
                        <router-link :to="{ name: 'Edit', params: { id: item.id } }">Edit</router-link>&nbsp;
                        <button @click="deletePost(item.id)"  title="delele current post">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>


        <div style="margin-top: 10px;">
            <button @click="prevPage" :disabled="page === 1">PREV</button>
            <span>{{ page }}</span>
            <button @click="nextPage" :disabled="page === totalPages">NEXT</button>
        </div>
    </div>
</template>

<script setup>
import postsApi from '../../../api/post';
import { ref, onMounted } from 'vue';
const posts = ref([]);
const page = ref(1);
const limit = ref(10);
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

async function deletePost(id) {
    if (confirm('确定要删除这篇文章吗？')) {
        await postsApi.deletePostById(id);
        fetchPosts();
    }
}
</script>
