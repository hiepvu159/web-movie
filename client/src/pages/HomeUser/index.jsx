import React, { useEffect, useState } from "react";
import Banner from "../../components/Banner";
import Card from "../../components/Card";
import { getMovies } from "../../services/movie";
import "./HomeUser.css";

function HomeUser() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies(setMovies);
  }, []);
  return (
    <>
      <Banner />
      <div className="homeuser-movies">Tổng hợp phim</div>
      <div className="container-list">
        {movies.map((movie) => (
          <Card data={movie} key={movie.id} />
        ))}
      </div>
    </>
  );
}

export default HomeUser;
