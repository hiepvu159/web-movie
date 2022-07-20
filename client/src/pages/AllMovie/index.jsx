import React, { useState, useEffect } from "react";
import { getMovies } from "../../services/movie";
import Select from "react-select";
import { Link } from "react-router-dom";
import Card from "../../components/Card";
import { options } from "../../gener";
import "./AllMovie.css";

function AllMovie() {
  const [categorySelected, setCategorySelected] = useState("Tất Cả");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies(setMovies);
  }, []);
  return (
    <div className="movie-main">
      <div className="filter">
        <div className="mb-5">
          <label>Danh mục</label>
          <Select
            defaultValue={options[0]}
            options={options}
            className="w-full border border-slate-600 rounded"
            onChange={(e) => setCategorySelected(e.value)}
          />
        </div>
      </div>
      <div className="movie-list">
        {categorySelected != "Tất Cả"
          ? movies
              .filter((movie) => movie.category.includes(categorySelected))
              .map((item) => (
                <Link to={`/movies/${item._id}`} key={item._id}>
                  <Card key={item._id} data={item} />
                </Link>
              ))
          : movies.map((movie) => (
              <Link to={`/movies/${movie._id}`} key={movie._id}>
                <Card data={movie} />
              </Link>
            ))}
      </div>
    </div>
  );
}

export default AllMovie;
