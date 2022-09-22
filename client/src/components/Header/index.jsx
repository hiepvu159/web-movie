import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../services/auth";
import avatar from "../../assets/avatar.jpg";
import "./Header.css";
import { useEffect } from "react";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.currentUser);

  const handleLogOut = async () => {
    await logoutUser(dispatch, navigate);
  };
  return (
    <div className="navbar">
      <div className="header">
        <div className="header-left">
          {/* <img src={logo} className="header-logo" alt="Movie Logo" /> */}
          <h1 className="header-name">Movie</h1>

          <Link to="/" className="category-item">
            Trang chủ
          </Link>
          <Link to="/movies/filter" className="category-item">
            Phim
          </Link>
          <Link to="/movies/search" className="category-item">
            Tìm kiếm
          </Link>
        </div>
        <div className="header-right">
          {user ? (
            <div className="flex items-center">
              <button onClick={() => setIsOpen(!isOpen)}>
                <img
                  src={user.avatar || avatar}
                  alt="avatar"
                  className="avatar-user"
                />
              </button>
              {isOpen && (
                <div className="z-50 bg-white absolute top-3/4 right-8 px-4 py-2">
                  <Link to="/profile">
                    <div className="menu-item ">{user.name}</div>
                  </Link>
                  <Link to="/profile/:id">
                    <div className="menu-item">Chỉnh sửa thông tin</div>
                  </Link>
                  <Link to="/" onClick={handleLogOut}>
                    <div className="menu-item border-t border-slate-400">
                      Đăng Xuất
                    </div>
                  </Link>
                </div>
              )}
              <div className="profile">
                {/* <BsCaretDownFill className="group mx-2 text-white cursor-pointer" /> */}
                <div className="hidden bg-black group-hover:flex flex-col absolute bg-white"></div>
              </div>
            </div>
          ) : (
            <Link to="/login" className="header-login">
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
