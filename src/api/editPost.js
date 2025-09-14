import api from "./index";

const editPostApi = {
  async savePostInfo(params) {
    try {
      const res = await api.patch(
        `/edit-posts/edit-info-part/${params.id}`,
        params,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
          },
        }
      );
      return res.data;
    } catch (err) {
      console.error("Save post failed:", err.message);
      return null;
    }
  },

  async savePostContent(params) {
    try {
      const res = await api.patch(`/edit-posts/save/${params.id}`, params, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
        },
      });
      return res.data;
    } catch (err) {
      console.error("Save post failed:", err.message);
      return null;
    }
  },

  async deletePostById(id) {
    try {
      const res = await api.delete(`/edit-posts/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
        },
      });
      return res.data;
    } catch (err) {
      console.error(`delete failed`, err.message);
      return null;
    }
  },

  async createPost(params) {
    try {
      const res = await api.post("/edit-posts/new", params, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
        },
      });
      return res.data;
    } catch (err) {
      console.error("Post create failed:", err.message);
      return null;
    }
  },
};

export default editPostApi;
