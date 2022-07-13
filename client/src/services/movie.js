import axios from "axios";

const token = localStorage.getItem("token");

export const getMovies = async (setMovies) => {
  await axios.get(`/movies`).then((res) => {
    setMovies(res.data);
  });
};

export const getMovieById = async (id, setMovie) => {
  await axios.get(`/movies/find/${id}`).then((res) => setMovie(res.data));
};

export const addMovies = async (movie, navigate) => {
  await axios.post(`/movies`, movie, {
    headers: {
      token: `Bearer ${token}`,
    },
  });
  navigate("/admin/movie");
};

export const updateMovie = async (movie, id, navigate) => {
  await axios.put(`/movies/${id}`, movie, {
    headers: {
      token: `Bearer ${token}`,
    },
  });
  navigate("/admin/movie");
};

export const deleteMovie = async (id) => {
  await axios.delete(`/movies/${id}`, {
    headers: {
      token: `Bearer ${token}`,
    },
  });
};
