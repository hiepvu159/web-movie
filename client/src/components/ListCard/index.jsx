import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../Card";
import { getMovies } from "../../services/movie";
import "./ListCard.css";

ListCard.propTypes = {};

function ListCard() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getMovies(setMovies);
  }, []);
  return (
    <div className="list-item-card scrollbar">
      {movies.map((movie) => (
        <Link to={`/movies/${movie._id}`} key={movie._id}>
          <Card data={movie} />
        </Link>
      ))}
    </div>
  );
}

export default ListCard;
