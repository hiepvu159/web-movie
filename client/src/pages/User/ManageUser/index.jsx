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

  return (
    <div className="w-full">
      <div className="manage-movie-main">
        <div className="main-title">
          <span className="action-name">Quản lý</span>
          <Link to="/admin/user/create">
            <button className="btn-create">Tạo mới</button>
          </Link>
        </div>

        <div>
          <table className="movie-table">
            <thead className="table-head">
              <tr className="flex w-full">
                <th className="col-name">Tên người dùng</th>
                <th className="col-name">Tên tài khoản</th>
                <th className="col-name">Quyền</th>
                <th className="col-name action ">Action</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {users.map((user) => (
                <tr className="flex w-full mb-4" key={user._id}>
                  <td className="col-item ">{user.name}</td>
                  <td className="col-item">{user.username}</td>
                  <td className="col-item">{user.role}</td>
                  <td className="col-item">
                    <Link to={`/admin/user/edit/${user._id}`}>
                      <button>
                        <AiFillEdit className="icon-edit" />
                      </button>
                    </Link>
                    <button onClick={() => handleDelete(user._id)}>
                      <AiFillDelete className="icon-delete" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {dialog.isLoading && <Dialog onDialog={confirmDelete} />}
        </div>
      </div>
    </div>
  );
}

export default ManageUser;
