import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { IoFilmOutline, IoPersonOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getMovies, getNewMovie } from "../../services/movie";
import { getNewUser, getUsers } from "../../services/user";

export default function Dashboard() {
  const token = useSelector((state) => state.auth.currentUser.accessToken);
  const [movies, setMovies] = useState([]);
  const [users, setUsers] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    getUsers(setAllUsers, token);
    getMovies(setAllMovies);
    getNewMovie(setMovies);
    getNewUser(setUsers);
  }, []);

  const columns = [
    {
      field: "name",
      headerName: "Tên người dùng",
      minWidth: 220,
    },
    {
      field: "username",
      headerName: "Tên tài khoản",
      width: 220,
    },
    {
      field: "dob",
      headerName: "Ngày sinh",
      width: 120,
    },
    {
      field: "gender",
      headerName: "Giới tính",
      width: 100,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "phone",
      headerName: "Số điện thoại",
      width: 150,
    },
    {
      field: "address",
      headerName: "Địa chỉ",
      width: 220,
    },
    {
      field: "role",
      headerName: "Chức vụ",
      width: 120,
    },
  ];
  const Rows = users?.map((user) => {
    return {
      id: user?._id,
      name: user?.name,
      username: user?.username,
      dob: user?.dob,
      gender: user?.gender,
      email: user?.email,
      phone: user?.phone,
      address: user?.address,
      role: user?.role,
    };
  });

  const detailColumns = [
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
      <div className="flex flex-row justify-evenly my-5">
        <div
          href="#"
          className="flex items-center w-1/2 h-[13rem] p-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md "
        >
          <div className="w-1/2">
            <IoFilmOutline className="w-full h-1/2" />
          </div>
          <div className="w-full px-4">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Tổng số phim
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {allMovies?.length}
            </p>
          </div>
        </div>
        <div
          href="#"
          className="flex items-center w-1/2 p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md "
        >
          <div className="w-1/2">
            <IoPersonOutline className="w-full h-1/2" />
          </div>
          <div className="w-full px-4">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Tổng số người dùng
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {allUsers?.length}
            </p>
          </div>
        </div>
      </div>
      <div className="my-10">
        <div>
          <p className="text-xl font-bold my-5">Người dùng mới</p>
          <div style={{ height: 632, width: "100%" }}>
            <DataGrid
              rows={Rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
            />
          </div>
        </div>
        <div>
          <p className="text-xl font-bold my-5">Phim mới được cập nhật</p>
          <div style={{ height: 632, width: "100%" }}>
            <DataGrid
              rows={detailsRows}
              columns={detailColumns}
              pageSize={10}
              rowsPerPageOptions={[10]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
