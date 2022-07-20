import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
          <Link to={`/movies/${movie._id}`}>
            <Card data={movie} key={movie._id} />
          </Link>
        ))}
      </div>
    </>
  );
}

export default HomeUser;
