import api from "./index";

const categoryApi = {
  async getAllCategory() {
    try {
      const res = await api.get("/category/all");
      return res.data;
    } catch (err) {
      console.error("fetch category failed:", err.message);
      return null;
    }
  },
  async getPostsByCategory(categoryName, page, limit) {
    try {
      const res = await api.get(`/category/${categoryName}`, {
        params: { page, limit },
      });
      return res.data;
    } catch (err) {
      console.error(
        `Failed to fetch posts (category=${categoryName})：`,
        err.message
      );
      return null;
    }
  },
  async createCategory(params) {
    try {
      const res = await api.post("/category/new-category", params, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
        },
      });
      return res.data;
    } catch (err) {
      if (err.status === 409) {
        return { message: err.message, data: 0 };
      }
      return null;
    }
  },
};

export default categoryApi;
