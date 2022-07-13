import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { deleteMovie, getMovies } from "../../../services/movie";
import "./Manage.css";

function Manage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies(setMovies);
  }, []);

  return (
    <div className="w-full">
      <div className="manage-movie-main">
        <div className="main-title">
          <span className="action-name">Quản lý</span>
          <Link to="/admin/movie/create">
            <button className="btn-create">Tạo mới</button>
          </Link>
        </div>

        <div>
          <table className="movie-table">
            <thead className="table-head">
              <tr className="flex w-full">
                <th className="col-name">Tên phim</th>
                <th className="col-name">Thể loại</th>
                <th className="col-name">Loại phim</th>
                <th className="col-name">Tình trạng</th>
                <th className="col-name ">Năm phát hành</th>
                <th className="col-name action ">Action</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {movies.map((movie) => (
                <tr className="flex w-full mb-4" key={movie._id}>
                  <td className="col-item ">{movie.name}</td>
                  <td className="col-item">{movie.category}</td>
                  <td className="col-item">{movie.type}</td>
                  <td className="col-item">{movie.status}</td>
                  <td className="col-item">{movie.year}</td>
                  <td className="col-item">
                    <Link to={`/admin/movie/edit/${movie._id}`}>
                      <button>
                        <AiFillEdit className="icon-edit" />
                      </button>
                    </Link>
                    <button
                      onClick={() => {
                        deleteMovie(movie._id);
                      }}
                    >
                      <AiFillDelete className="icon-delete" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Manage;
