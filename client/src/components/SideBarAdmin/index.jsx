import React from "react";
import {
  HiOutlineUserGroup,
  HiOutlineFilm,
  HiOutlineClipboardList,
  HiOutlineChevronLeft,
} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/auth";
import "./SideBarAdmin.css";

function SideBarAdmin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.currentUser);
  // const handleLogOut = async () => {
  //   await logoutUser(dispatch, navigate);
  // };
  return (
    <>
      {user && user.isAdmin ? (
        <nav className="sidebar-admin">
          <div>
            <div className="sidebar-admin-banner">
              <span className="admin-title">ADMIN</span>
            </div>
            <div className="sidebar-admin-category">
              <Link to="/admin/dashboard">
                <div className="admin-category">
                  <HiOutlineClipboardList className="admin-category-icon" />
                  <span className="">Dashboard</span>
                </div>
              </Link>
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
          <Link to="/">
            <div className="admin-category">
              <HiOutlineChevronLeft className="admin-category-icon" />
              <span className="">Quay lại trang chủ</span>
            </div>
          </Link>
        </nav>
      ) : (
        <></>
      )}
    </>
  );
}

export default SideBarAdmin;
