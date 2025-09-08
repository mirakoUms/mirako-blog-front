import axios from "axios";
const API_BASE_URL = "http://localhost:3000/api";
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export const getAllPosts = () => apiClient.get('/posts/all');

export const getPostById = (id) => apiClient.get(`/posts/${id}`);