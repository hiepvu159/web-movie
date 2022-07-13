import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IoLogOutOutline } from "react-icons/io5";
import { logoutUser } from "../../services/auth";
import logo from "../../assets/logo.png";
import "./Header.css";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.auth.currentUser);

  const handleLogOut = () => {
    logoutUser(dispatch, navigate);
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
      {currentUser ? (
        <div className="flex">
          <div className="header-login">{currentUser.username}</div>
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
