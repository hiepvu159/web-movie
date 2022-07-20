import React, { useEffect, useState } from "react";
import { getMovies } from "../../services/movie";
import { Link } from "react-router-dom";
import Card from "../../components/Card";
import "./SearchResult.css";

function SearchResult() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getMovies(setMovies);
  }, []);

  return (
    <div className="p-3 mb-[10rem]">
      <div>
        <div className="search-form">
          <input
            type="search"
            id="default-search"
            className="search-box"
            placeholder="Điền tên phim muốn tìm kiếm. . . . "
            autoComplete="off"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      {searchTerm ? (
        <div className="search-content">
          {movies
            .filter((movie) =>
              movie.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
            )
            .map((item) => (
              <Link to={`/movies/${item._id}`} key={item._id}>
                <Card key={item._id} data={item} />
              </Link>
            ))}
        </div>
      ) : (
        <div className="py-3 text-center">
          <label>Hãy nhập để tìm kiếm phim</label>
        </div>
      )}
    </div>
  );
}

export default SearchResult;
