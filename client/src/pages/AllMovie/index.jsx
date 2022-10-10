import React, { useState, useEffect } from "react";
import { filterMovie, getMovies } from "../../services/movie";
import Select from "react-select";
import { Link, useSearchParams } from "react-router-dom";
import Card from "../../components/Card";
import { options } from "../../gener";
import "./AllMovie.css";

function AllMovie() {
  const [allMovies, setAllMovies] = useState([]);
  const [categorySelected, setCategorySelected] = useState("Tất Cả");
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const searchTerm = searchParams.get("name");

  const handleChange = () => {};

  useEffect(() => {
    getMovies(setAllMovies);
  }, []);

  useEffect(() => {
    filterMovie(searchTerm, setMovies);
  }, [searchParams]);
  return (
    <div className="movie-main">
      <div className="filter">
        <label>Danh mục</label>
        <Select
          defaultValue={""}
          isClearable
          placeholder="Hãy chọn danh mục"
          options={options}
          className="w-full border border-slate-600 rounded"
          onChange={(e) => setSearchParams({ name: e.value.replace(" ", "-") })}
        />
      </div>
      <div className="movie-list">
        {searchTerm
          ? movies.map((item) => (
              <Link to={`/movies/${item._id}`} key={item._id}>
                <Card key={item._id} data={item} />
              </Link>
            ))
          : allMovies.map((movie) => (
              <Link to={`/movies/${movie._id}`} key={movie._id}>
                <Card data={movie} />
              </Link>
            ))}
      </div>
    </div>
  );
}

export default AllMovie;
