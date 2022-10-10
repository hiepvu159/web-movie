import React from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import SideBarAdmin from "../../components/SideBarAdmin";
import ErrorPage from "../../pages/ErrorPage";
import { logoutUser } from "../../services/auth";

function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.currentUser);
  const handleLogOut = async () => {
    await logoutUser(dispatch, navigate);
  };
  return (
    <>
      {user && user.isAdmin ? (
        <div className="flex">
          <SideBarAdmin />
          <div className="w-full ml-56">
            <div className="border-b-2  border-stone-300 h-16">
              <div className="flex justify-end h-full items-center mx-10">
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src={
                    user?.avatar ||
                    "https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg"
                  }
                  alt="photo"
                />
                <div className="mx-3">{user?.name}</div>
                <Link to="/login" onClick={handleLogOut}>
                  <IoLogOutOutline className="w-5 h-5" />
                </Link>
              </div>
            </div>
            <Outlet />
          </div>
        </div>
      ) : (
        <ErrorPage />
      )}
    </>
  );
}

export default Layout;
