import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Card from "../Card";
import "./ListCard.css";

ListCard.propTypes = {};

function ListCard() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const getMovies = async () => {
      try {
        await axios
          .get(`movies`, {
            headers: {
              token:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmQxOGFhODI4OTBjZjM3YTFiMGY3MSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NjU2OTk0MCwiZXhwIjoxNjU3MDAxOTQwfQ.Udp3GuQd_bY9DGpNePjW_rn8H1h3jctsI22Amj-F2e0",
            },
          })
          .then((res) => {
            console.log(res.data);
            setMovies(res.data);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getMovies();
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
