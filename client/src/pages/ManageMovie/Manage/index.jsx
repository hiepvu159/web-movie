import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { deleteMovie, getMovies } from "../../../services/movie";
import "./Manage.css";
import { useSelector } from "react-redux";
import Dialog from "../../../components/Dialog";
import { Space, Table, Tag } from "antd";
import { DataGrid } from "@mui/x-data-grid";
function Manage() {
  const token = useSelector((state) => state.auth.currentUser.accessToken);
  const [movies, setMovies] = useState([]);
  const [dialog, setDialog] = useState({
    isLoading: false,
  });
  const idMovieRef = useRef();
  const handleDialog = (isLoading) => {
    setDialog({
      isLoading,
    });
  };

  const handleDelete = (id) => {
    handleDialog(true);
    idMovieRef.current = id;
  };
  const confirmDelete = async (choose) => {
    if (choose) {
      await deleteMovie(idMovieRef.current, token);
      handleDialog("", false);
    } else {
      handleDialog("", false);
    }
  };
  useEffect(() => {
    getMovies(setMovies);
  }, [dialog.isLoading]);
  const columns = [
    {
      field: "name",
      headerName: "Tên Phim",
      minWidth: 400,
    },
    {
      field: "category",
      headerName: "Thể loại",
      width: 300,
    },
    {
      field: "type",
      headerName: "Danh mục",
      width: 200,
    },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 150,
    },
    {
      field: "country",
      headerName: "Quốc Gia",
      width: 150,
    },
    {
      field: "year",
      headerName: "Năm",
      width: 100,
    },
    {
      field: "Action",
      width: 150,
      renderCell: (movie) => {
        return (
          <div className="items-center text-center">
            <Link to={`/admin/movie/edit/${movie.id}`}>
              <button>
                <AiFillEdit className="icon-edit" />
              </button>
            </Link>
            <button onClick={() => handleDelete(movie.id)}>
              <AiFillDelete className="icon-delete" />
            </button>
          </div>
        );
      },
    },
  ];
  const detailsRows = movies?.map((movie) => {
    return {
      id: movie?._id,
      name: movie?.name,
      category: movie?.category,
      type: movie?.type,
      country: movie?.country,
      year: movie?.year,
      status: movie?.status,
      action: "",
    };
  });
  return (
    <div className="w-full px-6 py-5">
      <div className="manage-movie-main">
        <div className="main-title">
          <span className="action-name">Quản lý phim</span>
          <Link to="/admin/movie/create">
            <button className="btn-create">Tạo mới</button>
          </Link>
        </div>
      </div>
      <div style={{ height: 632, width: "100%" }}>
        <DataGrid
          rows={detailsRows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
        {dialog.isLoading && <Dialog onDialog={confirmDelete} />}
      </div>
    </div>
  );
}

export default Manage;
