import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Banner from "../../components/Banner";
import Card from "../../components/Card";
import ListCard from "../../components/ListCard";
import {
  getMovieByCategory,
  getMovies,
  getMoviesSeries,
  getMoviesSingle,
  getNewMovie,
} from "../../services/movie";
import "./HomeUser.css";

function HomeUser() {
  const [movies, setMovies] = useState([]);
  const [movieActions, setMovieActions] = useState([]);
  const [movieScience, setMovieScience] = useState([]);
  const [movieFiction, setmovieFiction] = useState([]);
  const [moviePL, setMoviePL] = useState([]);
  const [newMovie, setNewMovie] = useState([]);
  const action = "Hành-Động";
  const science = "Tâm-Lý";
  const plieu = "Phiêu-Lưu";
  const fiction = "Viễn-Tưởng";
  useEffect(() => {
    getMovies(setMovies);
    getNewMovie(setNewMovie);
    getMovieByCategory(setMovieActions, action);
    getMovieByCategory(setMovieScience, science);
    getMovieByCategory(setmovieFiction, fiction);
    getMovieByCategory(setMoviePL, plieu);

    // getMoviesSingle(setMoviesSingle);
  }, []);
  return (
    <>
      <Banner />
      <div>
        <div className="homeuser-movies">Tổng hợp phim</div>
        <ListCard data={newMovie} />
      </div>
      <div>
        <div className="homeuser-movies">Phim hành động</div>
        <ListCard data={movieActions.slice(0, 9)} />
      </div>
      <div>
        <div className="homeuser-movies">Phim viễn tưởng</div>
        <ListCard data={movieFiction.slice(0, 9)} />
      </div>
      <div>
        <div className="homeuser-movies">Phim phiêu lưu</div>
        <ListCard data={moviePL.slice(0, 9)} />
      </div>
    </>
  );
}

export default HomeUser;
