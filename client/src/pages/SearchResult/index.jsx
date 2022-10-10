import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getMovies, searchMovie } from "../../services/movie";
import { Link } from "react-router-dom";
import Card from "../../components/Card";
import "./SearchResult.css";

function SearchResult() {
  const [allMovies, setAllMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("name");

  useEffect(() => {
    searchMovie(searchTerm, setMovies);
  }, [searchParams]);

  useEffect(() => {
    getMovies(setAllMovies);
  }, []);

  return (
    <div className="p-3 mb-[1rem]">
      <div>
        <div className="search-form">
          <form>
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
        <div className="grid grid-cols-6 gap-5 my-10">
          {!searchTerm || searchTerm === "" ? (
            <></>
          ) : movies.length === 0 ? (
            <div className=" col-span-6 text-center">
              Không tìm thấy phim. Vui lòng nhập lại từ khóa tìm kiếm
            </div>
          ) : (
            movies?.map((movie) => (
              <div className="mx-auto">
                <Link to={`/movies/${movie._id}`} key={movie._id}>
                  <Card data={movie} />
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchResult;
