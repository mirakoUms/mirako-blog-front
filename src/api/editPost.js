import api from "./index";

const editPostApi = {
  async savePostInfo(params) {
    try {
      const res = await api.patch(
        `/edit-posts/edit-info-part/${params.id}`,
        params
      );
      return res.data;
    } catch (err) {
      console.error("Save post failed:", err.message);
      return null;
    }
  },

  async savePostContent(params) {
    try {
      const res = await api.patch(`/edit-posts/save/${params.id}`, params);
      return res.data;
    } catch (err) {
      console.error("Save post failed:", err.message);
      return null;
    }
  },
};

export default editPostApi;
