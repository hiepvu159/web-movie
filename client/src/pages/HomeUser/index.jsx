import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Banner from "../../components/Banner";
import Card from "../../components/Card";
import ListCard from "../../components/ListCard";
import "./HomeUser.css";

function HomeUser() {
  return (
    <>
      <Banner />
      <div className="homeuser-movies">Tổng hợp phim</div>
      <div className="container-list">
        <ListCard />
      </div>
    </>
  );
}

export default HomeUser;
