import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getMovies } from "../../services/movie";
import { Link } from "react-router-dom";
import Card from "../../components/Card";
import Search from "../../components/Search";

function SearchResult() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getMovies(setMovies);
  }, []);
  const handleFilterChange = (newFilter) => {};
  return (
    <div className="px-3">
      <h1 className="search-title">Tìm kiếm</h1>
      <Search onSubmit={handleFilterChange} />
      <div className="items-center">
        <div className="search-content">
          {movies.map((movie) => (
            <Link to={`/movies/${movie._id}`} key={movie._id}>
              <Card data={movie} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchResult;
