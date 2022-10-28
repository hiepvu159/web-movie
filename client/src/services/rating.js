import axios from "axios";

export const addRating = async (rating, movie, token) => {
  await axios.post(
    `/ratings`,
    {
      rating: rating,
      movie: movie,
    },
    {
      headers: {
        token: `Bearer ${token}`,
      },
    }
  );
};
