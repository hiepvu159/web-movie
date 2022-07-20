import axios from "axios";

export const getCategory = async (setCategory, token) => {
  await axios
    .get(`/categories`, {
      headers: {
        token: `Bearer ${token}`,
      },
    })
    .then((res) => setCategory(res.data));
};
