import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import SideBarAdmin from "../../components/SideBarAdmin";
import ErrorPage from "../../pages/ErrorPage";

function Layout() {
  const user = useSelector((state) => state.auth.currentUser);

  return (
    <>
      {user && user.isAdmin ? (
        <div className="flex">
          <div className="w-1/5">
            <SideBarAdmin />
          </div>
          <div className="w-4/5">
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
