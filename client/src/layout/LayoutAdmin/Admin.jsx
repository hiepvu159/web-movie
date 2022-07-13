import React from "react";
import { Outlet } from "react-router-dom";
import SideBarAdmin from "../../components/SideBarAdmin";

function Layout(props) {
  return (
    <div className="flex">
      <div className="w-1/5">
        <SideBarAdmin />
      </div>
      <div className="w-4/5">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
