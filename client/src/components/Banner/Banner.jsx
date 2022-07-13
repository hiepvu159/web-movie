import React from "react";
import PropTypes from "prop-types";
import banner from "../../assets/banner.jpg";
import Search from "../Search";
Banner.propTypes = {};

function Banner(props) {
  return (
    <div className="header-banner">
      <img src={banner} alt="banner" className="banner" />
      <div className="banner-desc">
        <span className="banner-title">Chào mừng</span>
        <span className="banner-text">
          Đến với website xem phim trực tuyến.
        </span>
        <Search />
      </div>
    </div>
  );
}

export default Banner;
