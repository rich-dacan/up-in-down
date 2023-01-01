import api from "../api";

const imageService = {
  postImage: async ({ image }) => {
    const formData = new FormData();
    formData.append("image", image);

    const result = await api.post("/images", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return result.data;
  },
};

export default imageService;
