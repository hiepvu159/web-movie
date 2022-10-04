import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Banner from "../../components/Banner";
import Card from "../../components/Card";
import ListCard from "../../components/ListCard";
import {
  getMovies,
  getMoviesSeries,
  getMoviesSingle,
} from "../../services/movie";
import "./HomeUser.css";

function HomeUser() {
  const [movies, setMovies] = useState([]);
  const [moviesSeries, setMoviesSeries] = useState([]);
  const [moviesSingle, setMoviesSingle] = useState([]);

  useEffect(() => {
    getMovies(setMovies);
    getMoviesSeries(setMoviesSeries);
    getMoviesSingle(setMoviesSingle);
  }, []);
  return (
    <>
      <Banner />
      <div>
        <div className="homeuser-movies">Tổng hợp phim</div>
        <ListCard data={movies} />
      </div>
      <div>
        <div className="homeuser-movies">Phim series</div>
        <ListCard data={moviesSeries} />
      </div>
      <div>
        <div className="homeuser-movies">Phim le</div>
        <ListCard data={moviesSingle} />
      </div>
    </>
  );
}

export default HomeUser;
