import axios from "axios";

export const getMovies = async (setMovies) => {
  await axios.get(`/movies`).then((res) => {
    setMovies(res.data);
  });
};
export const getMoviesSeries = async (setMovies) => {
  await axios.get(`/movies/series`).then((res) => {
    setMovies(res.data);
  });
};
export const getMoviesSingle = async (setMovies) => {
  await axios.get(`/movies/single`).then((res) => {
    setMovies(res.data);
  });
};
export const getMovieById = async (id, setMovie) => {
  await axios.get(`/movies/find/${id}`).then((res) => setMovie(res.data));
};

export const searchMovie = async (params, setMovie) => {
  await axios.get(`/movies/search/name=${params}`).then((res) => {
    setMovie(res.data);
  });
};

export const filterMovie = async (params, setMovie) => {
  await axios.get(`/movies/filter/name=${params}`).then((res) => {
    setMovie(res.data);
  });
};

export const addMovies = async (movie, token, navigate) => {
  await axios.post(`/movies`, movie, {
    headers: {
      token: `Bearer ${token}`,
    },
  });
  alert("Thêm phim thành công");
  navigate("/admin/movie");
};

export const updateMovie = async (movie, token, id, navigate) => {
  await axios.put(`/movies/${id}`, movie, {
    headers: {
      token: `Bearer ${token}`,
    },
  });
  alert("Sửa thông tin phim thành công");
  navigate("/admin/movie");
};

export const deleteMovie = async (id, token) => {
  await axios.delete(`/movies/${id}`, {
    headers: {
      token: `Bearer ${token}`,
    },
  });
};

export const getInfo = async (src, setMovie, setLink) => {
  await axios.get(`${src}`).then((res) => {
    setMovie(res.data.movie);
    setLink(res.data);
  });
};

export const getNewMovie = async (setMovies) => {
  await axios
    .get(`/movies/new`)
    .then((res) => {
      setMovies(res.data);
    })
    .catch((err) => console.log(err));
};

export const getMovieByCategory = async (setMovies, category) => {
  await axios.get(`/movies/filter/name=${category}`).then((res) => {
    setMovies(res.data);
  });
};
