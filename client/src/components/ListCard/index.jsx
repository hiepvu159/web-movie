import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../Card";
import { getMovies } from "../../services/movie";
import "./ListCard.css";

function ListCard(props) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies(setMovies);
  }, []);
  return (
    <div className="list-item-card scrollbar">
      {movies.map((movie) => (
        <Link to={`/movies/${movie._id}`}>
          <Card data={movie} key={movie._id} />
        </Link>
      ))}
    </div>
  );
}

export default ListCard;
