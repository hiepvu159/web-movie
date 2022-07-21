import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import ErrorPage from "../../pages/ErrorPage";

function Layout() {
  const user = useSelector((state) => state.auth.currentUser);

  return (
    <>
      {user && user.isAdmin ? (
        <ErrorPage />
      ) : (
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      )}
    </>
  );
}

export default Layout;
