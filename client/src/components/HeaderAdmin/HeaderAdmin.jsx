import React from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { FaPowerOff } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { logoutUser } from "../../services/auth";

function HeaderAdmin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const admin = useSelector((state) => state.auth.login.currentUser);
  const handleLogOut = () => {
    // logoutUser(dispatch, navigate);
  };
  return (
    <nav className="nav-admin">
      <form>
        <div className="relative">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <HiOutlineSearch className="nav-icon" />
          </div>
          <input
            type="search"
            id="default-search"
            className="block p-2 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search"
            autoComplete="off"
          />
        </div>
      </form>
      <div className="flex">
        <div className="mt-1 text-white text-xl">{admin.username}</div>
        <button type="button" onClick={handleLogOut}>
          <FaPowerOff className="admin-logout" />
        </button>
      </div>
    </nav>
  );
}

export default HeaderAdmin;
