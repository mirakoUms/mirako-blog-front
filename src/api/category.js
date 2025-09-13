import api from "./index";

const categoryApi = {
  async getPostsByCategory(categoryName, page, limit) {
    try {
      const res = await api.get(`/category/${categoryName}`, {
        params: { page, limit },
      });
      return res.data;
    } catch (err) {
      console.error(
        `获取分类文章失败 (category=${categoryName})：`,
        err.message
      );
      return null;
    }
  },
};

export default categoryApi;
