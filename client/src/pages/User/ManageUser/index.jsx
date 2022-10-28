import { DataGrid } from "@mui/x-data-grid";
import React, { useState, useEffect, useRef } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Dialog from "../../../components/Dialog";
import { deleteUser, getUsers } from "../../../services/user";

function ManageUser() {
  const [users, setUsers] = useState([]);
  const token = useSelector((state) => state.auth.currentUser.accessToken);
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
      await deleteUser(idMovieRef.current, token);
      handleDialog("", false);
    } else {
      handleDialog("", false);
    }
  };
  useEffect(() => {
    getUsers(setUsers, token);
  }, [dialog.isLoading]);

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
    {
      field: "Action",
      width: 150,
      renderCell: (user) => {
        return (
          <div className="items-center text-center">
            <Link to={`/admin/user/edit/${user.id}`}>
              <button>
                <AiFillEdit className="icon-edit" />
              </button>
            </Link>
            <button onClick={() => handleDelete(user.id)}>
              <AiFillDelete className="icon-delete" />
            </button>
          </div>
        );
      },
    },
  ];
  const detailsRows = users?.map((user) => {
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
      action: "",
    };
  });
  return (
    <div className="w-full px-6 py-5">
      <div className="manage-movie-main">
        <div className="main-title">
          <span className="action-name">Quản lý người dùng</span>
          <Link to="/admin/user/create">
            <button className="btn-create">Tạo mới</button>
          </Link>
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
    </div>
  );
}

export default ManageUser;
