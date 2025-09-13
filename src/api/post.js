import api from "./index";

const postsApi = {
  async getAll() {
    try {
      const res = await api.get("/posts/all");
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
};

export default postsApi;
