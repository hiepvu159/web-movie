import React from "react";
import banner from "../../assets/banner.jpg";
import "./Banner.css";

function Banner() {
  return (
    <div className="header-banner">
      <img src={banner} alt="banner" className="banner" />
      <div className="banner-desc">
        <span className="banner-title">Chào mừng</span>
        <span className="banner-text">
          Đến với website xem phim trực tuyến.
        </span>
      </div>
    </div>
  );
}

export default Banner;
