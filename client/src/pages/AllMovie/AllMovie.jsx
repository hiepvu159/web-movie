import React, { useState, useEffect } from "react";
import { getMovies } from "../../services/movie";
import Select from "react-select";
import { Link } from "react-router-dom";
import Card from "../../components/Card";
import { options } from "../../gener";

function AllMovie() {
  const [category, setCategory] = useState([]);
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
            options={options}
            isMulti
            className="w-full border border-slate-600 rounded"
            onChange={(e) =>
              setCategory(Array.isArray(e) ? e.map((x) => x.value) : [])
            }
          />
        </div>
        <button
          type="submit"
          className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
        >
          Search
        </button>
      </div>
      <div className="movie-list">
        {movies.map((movie) => (
          <Link to={`/movies/${movie._id}`} key={movie._id}>
            <Card data={movie} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AllMovie;
