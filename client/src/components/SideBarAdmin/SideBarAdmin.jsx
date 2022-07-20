import React, { useEffect } from "react";
import {
  HiOutlineChartBar,
  HiOutlineUserGroup,
  HiOutlineFilm,
  HiOutlineServer,
} from "react-icons/hi";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUserLocal } from "../../redux/authSlice";
import { logoutUser } from "../../services/auth";

function SideBarAdmin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.currentUser);
  const handleLogOut = () => {
    logoutUser(dispatch, navigate);
  };
  return (
    <nav className="sidebar-admin">
      <div>
        <div className="sidebar-admin-banner">
          <span className="admin-title">ADMIN</span>
        </div>
        <div className="sidebar-admin-category">
          <Link to="/admin/user">
            <div className="admin-category">
              <HiOutlineUserGroup className="admin-category-icon" />
              <span className="">Quản lý người dùng</span>
            </div>
          </Link>
          <Link to="/admin/movie">
            <div className="admin-category">
              <HiOutlineFilm className="admin-category-icon" />
              <span className="">Quản lý danh sách phim</span>
            </div>
          </Link>
        </div>
      </div>
      <div className="flex justify-center mb-5">
        <div className="mb-1 text-white text-xl">{user.name}</div>
        <Link to="/login" onClick={handleLogOut}>
          <IoLogOutOutline className="admin-logout" />
        </Link>
      </div>
    </nav>
  );
}

export default SideBarAdmin;
