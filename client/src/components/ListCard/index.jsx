import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../Card";
import { getMovies } from "../../services/movie";
import "./ListCard.css";

function ListCard(props) {
  const { data } = props;
  return (
    <div className="list-item-card scrollbar">
      {data.map((movie) => (
        <Link to={`/movies/${movie._id}`}>
          <Card data={movie} key={movie._id} />
        </Link>
      ))}
    </div>
  );
}

export default ListCard;
