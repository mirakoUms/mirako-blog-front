import api from "./index";

const postsApi = {
  async getAll(page, limit) {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const res = await api.get("/posts", {
        params: { page, limit },
      });
      return res.data;
    } catch (err) {
      return null;
    }
  },

  async getById(id) {
    try {
      const res = await api.get(`/posts/${id}`);
      return res.data;
    } catch (err) {
      return err.response;
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

  async checkPostExistence(title) {
    try {
      const res = await api.get(`/posts/check-if-exists/${title}`);
      return res.data.exists;
    } catch (err) {
      console.error(`检查文章存在失败 (title=${title})：`, err.message);
      return null;
    }
  },
};
export default postsApi;
