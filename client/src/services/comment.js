import axios from "axios";

export const addComments = async (comment, movie, token) => {
  await axios.post(
    `/comments`,
    {
      content: comment,
      movie: movie,
    },
    {
      headers: {
        token: `Bearer ${token}`,
      },
    }
  );
};

export const deleteComments = async (id, token) => {
  await axios.delete(`/comments/${id}`, {
    headers: {
      token: `Bearer ${token}`,
    },
  });
};
