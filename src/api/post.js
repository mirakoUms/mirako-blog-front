import api from "./index";

const postsApi = {
  async getAll(page, limit) {
    try {
      const res = await api.get("/posts", {
        params: { page, limit },
      });
      return res.data;
    } catch (err) {
      console.error("获取所有文章失败：", err.message);
      return null;
    }
  },

  async getById(id) {
    try {
      const res = await api.get(`/posts/${id}`);
      return res.data;
    } catch (err) {
      console.error(`获取文章失败 (id=${id})：`, err.message);
      return null;
    }
  },

  async getTotalPosts() {
    try {
      const res = await api.get(`/posts/count`);
      return res.data.data[0];
    } catch (err) {
      console.error(`获取count失败`, err.message);
      return null;
    }
  },

  async deletePostById(id) {
    try {
      const res = await api.delete(`/edit-posts/delete/${id}`);
      return res.data;
    } catch (err) {
      console.error(`delete failed`, err.message);
      return null;
    }
  },
};

export default postsApi;
