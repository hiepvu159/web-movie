import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getMovies } from "../../services/movie";
import { Link } from "react-router-dom";
import Card from "../../components/Card";
import "./SearchResult.css";

function SearchResult() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSumbit = () => {};
  useEffect(() => {
    getMovies(setMovies);
  }, []);

  return (
    <div className="p-3 mb-[1rem]">
      <div>
        <div className="search-form">
          <form onSubmit={handleSumbit}>
            <input
              type="search"
              id="default-search"
              className="search-box"
              placeholder="Điền tên phim muốn tìm kiếm. . . . "
              autoComplete="off"
              // value={searchParams}
              onChange={(e) => setSearchParams({ name: e.target.value })}
            />
          </form>
        </div>
      </div>
      {/* {searchTerm ? (
        <div className="search-content">
          {movies
            .filter(
              (movie) =>
                movie.name
                  .toLowerCase()
                  .includes(searchTerm.trim().toLowerCase()) ||
                movie.year.toString().includes(searchTerm)
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
      )} */}
    </div>
  );
}

export default SearchResult;
