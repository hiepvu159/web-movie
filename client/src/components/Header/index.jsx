import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IoLogOutOutline } from "react-icons/io5";
import { logoutUser } from "../../services/auth";
import logo from "../../assets/logo.png";
import avatar from "../../assets/avatar.jpg";
import "./Header.css";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.currentUser);

  const handleLogOut = async () => {
    await logoutUser(dispatch, navigate);
  };
  return (
    <header className="header">
      <div className="header-left-item">
        <div className="header-left">
          <img src={logo} className="header-logo" alt="Movie Logo" />
          <h1 className="header-name">Movie</h1>
        </div>
        <div className="header-category">
          <Link to="/" className="category-item">
            Trang chủ
          </Link>
          <Link to="/movies" className="category-item">
            Phim
          </Link>
          <Link to="/search" className="category-item">
            Tìm kiếm
          </Link>
        </div>
      </div>
      {user ? (
        <div className="flex">
          <img
            src={user.avatar || avatar}
            alt="avatar"
            className="avatar-user"
          />
          <div className="header-login">{user.name}</div>
          <Link to="/" onClick={handleLogOut}>
            <IoLogOutOutline className="my-0 mx-auto mt-[3.3rem] ml-2 text-white text-2xl" />
          </Link>
        </div>
      ) : (
        <Link to="/login" className="header-login">
          Đăng nhập
        </Link>
      )}
    </header>
  );
}

export default Header;
