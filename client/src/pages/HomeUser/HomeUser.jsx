import React from "react";
import PropTypes from "prop-types";
import Search from "../../components/Search";
import ListCard from "../../components/ListCard";
import Banner from "../../components/Banner";
import { Outlet } from "react-router-dom";

HomeUser.propTypes = {};

function HomeUser(props) {
  return (
    <>
      <Banner />
      <h1 className="homeuser-movies">Phim Lẻ</h1>
      <div className="container-list">
        <ListCard className="container-list-item" />
      </div>
      <h1 className="homeuser-movies">Phim Bộ</h1>
      <div className="container-list">
        <ListCard className="container-list-item" />
      </div>
      <h1 className="homeuser-movies">Phim Chiếu Rạp</h1>
      <div className="container-list">
        <ListCard className="container-list-item" />
      </div>
    </>
  );
}

export default HomeUser;
