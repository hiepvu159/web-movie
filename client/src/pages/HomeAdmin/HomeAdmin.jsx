import React from "react";
import { Outlet } from "react-router-dom";

function HomeAdmin(props) {
  return (
    <div className="h-screen flex">
      <Outlet />
    </div>
  );
}

export default HomeAdmin;
