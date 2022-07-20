import React, { useState, useEffect } from "react";
import { getMovies } from "../../services/movie";
import Select from "react-select";
import { Link } from "react-router-dom";
import Card from "../../components/Card";
import { options } from "../../gener";
import "./AllMovie.css";

function AllMovie() {
  const [categorySelected, setCategorySelected] = useState(null);
  const [movies, setMovies] = useState([]);

  const handleClick = (e) => {
    e.preventDefault();
    setCategorySelected(null);
  };
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
            value={categorySelected}
            className="w-full border border-slate-600 rounded"
            onChange={(e) => setCategorySelected(e.value)}
          />
        </div>
        <button
          className="bg-slate-800 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleClick}
        >
          Xóa đã mục chọn
        </button>
      </div>
      <div className="movie-list">
        {categorySelected
          ? movies
              .filter((movie) => movie.category.includes(categorySelected))
              .map((item) =>
                !item ? (
                  <div className="py-3 w-full text-center">
                    <label>Không tìm thấy phim phù hợp</label>
                  </div>
                ) : (
                  <Link to={`/movies/${item._id}`} key={item._id}>
                    <Card key={item._id} data={item} />
                  </Link>
                )
              )
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
