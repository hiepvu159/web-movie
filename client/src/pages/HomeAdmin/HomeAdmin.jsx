import React from "react";
import { Outlet } from "react-router-dom";
import "./HomeAdmin.css";

function HomeAdmin() {
  return (
    <div className="h-screen flex">
      <Outlet />
    </div>
  );
}

export default HomeAdmin;
