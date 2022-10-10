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
        <div className="flex flex-col min-h-screen">
          <Header />
          <Outlet />
          <div className="mt-auto w-full h-auto">
            <Footer />
          </div>
        </div>
      )}
    </>
  );
}

export default Layout;
