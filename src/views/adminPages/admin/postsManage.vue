<template>
    <div>
        <h3>Posts List</h3>
        <button @click="showCreatePostDialog = true">New Post</button>
        <button @click="showCreateCategoryDialog = true">New Category</button>

        <div v-if="showCreatePostDialog"
            style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 20px; border: 1px solid #ccc; border-radius: 8px;">
            <h3>Create New Post</h3>
            <form @submit.prevent="createPost">
                <div>
                    <label for="title">Title:</label>
                    <input id="title" v-model="newPost.title" required />
                </div>
                <div>
                    <label for="summary">Summary:</label>
                    <textarea id="summary" v-model="newPost.summary" required></textarea>
                </div>
                <div>
                    <label for="thumbnail">Thumbnail URL:</label>
                    <input id="thumbnail" v-model="newPost.thumbnail_url" />
                </div>
                <div style="margin-top: 10px;">
                    <button type="submit">Confirm</button>
                    <button type="button" @click="showCreatePostDialog = false">Cancel</button>
                </div>
            </form>
        </div>

        <div v-if="showCreateCategoryDialog"
            style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 20px; border: 1px solid #ccc; border-radius: 8px;">
            <h3>Create New Category</h3>
            <form @submit.prevent="createCategory">
                <div>
                    <label for="category_name">Category Name:</label>
                    <input id="category_name" v-model="newCategory.name" required />
                </div>
                <div style="margin-top: 10px;">
                    <button type="submit">Confirm</button>
                    <button type="button" @click="showCreateCategoryDialog = false">Cancel</button>
                </div>
            </form>
        </div>

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
                        <router-link :to="`/posts/${item.id}`" target="_blank">{{ item.title }}</router-link>
                    </td>
                    <td style="padding: 8px; white-space: nowrap;">
                        {{ item.summary }}
                    </td>
                    <td style="padding: 8px; white-space: nowrap;">
                        {{ item.category_name }}
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
                        <button @click="deletePost(item.id)" title="delele current post">Delete</button>
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
import { ref, onMounted } from 'vue';
import postsApi from '../../../api/post';
import editPostApi from '../../../api/editPost';
import categoryApi from '../../../api/category';

const posts = ref([]);
const page = ref(1);
const limit = ref(10);
const totalPages = ref(1);
const showCreatePostDialog = ref(false);
const showCreateCategoryDialog = ref(false);

const newPost = ref({
    title: '',
    summary: '',
    tag_names: '',
    thumbnail_url: ''
});

const newCategory = ref({
    name: ''
});

const fetchPosts = async () => {
    try {
        const response = await postsApi.getAll(page.value, limit.value);
        posts.value = response.data;
    } catch (err) {
        console.error('Error fetching posts:', err);
    }
};

const fetchTotalPages = async () => {
    try {
        const res = await postsApi.getTotalPosts();
        totalPages.value = Math.ceil(res.count / limit.value);
    } catch (err) {
        console.error('Error fetching total pages:', err);
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

const deletePost = async (id) => {
    if (confirm('Are you sure you want to delete this post?')) {
        try {
            await editPostApi.deletePostById(id);
            fetchPosts();
        } catch (err) {
            console.error('Error deleting post:', err);
        }
    }
};

const createPost = async () => {
    try {
        await editPostApi.createPost(newPost.value);
        showCreatePostDialog.value = false;
        fetchPosts();
        newPost.value = {
            title: '',
            summary: '',
            category_name: '',
            tag_names: '',
            thumbnail_url: ''
        };
    } catch (err) {
        console.error('Error creating post:', err);
    }
};

const createCategory = async () => {
    try {
        const res = await categoryApi.createCategory(newCategory.value);
        alert(res.message);
        showCreateCategoryDialog.value = false;
        fetchPosts();
        newCategory.value = {
            name: ''
        };
    } catch (err) {
        alert('Error creating category: ' + err);
    }
};

onMounted(async () => {
    await fetchTotalPages();
    fetchPosts();
});
</script>
