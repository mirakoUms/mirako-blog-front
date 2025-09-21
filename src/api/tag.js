import api from "./index";

const tagApi = {
  async getAllTags() {
    try {
      const res = await api.get("/tag/all");
      return res.data;
    } catch (err) {
      console.error("Failed to fetch tags:", err.message);
      return [];
    }
  },
  async getTagByName(name, page, limit) {
    try {
      const res = await api.get(`/tag/${name}`, { params: { page, limit } });
      return res.data;
    } catch (err) {
      console.error(`Failed to fetch tags (name=${name})：`, err.message);
      return null;
    }
  },
};

export default tagApi;
