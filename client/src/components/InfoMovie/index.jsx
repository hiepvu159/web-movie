import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./InfoMovie.css";

InfoMovie.propTypes = {
  name: PropTypes.string,
  thumb_url: PropTypes.string,
  poster_url: PropTypes.string,
  category: PropTypes.array,
  type: PropTypes.string,
  year: PropTypes.number,
};

function InfoMovie(props) {
  const { data } = props;
  return (
    <div className="background-info">
      <img src={data.thumb_url} alt="placeholder" className="thumbnail" />
      <div className="content-header">
        <img src={data.poster_url} alt="poster" className="content-poster" />
        <div className="content-info">
          <div className="content-info-movie">
            <div className="name-movie">
              <section className="content-name">{data.name}</section>
            </div>
            <section className="content-text">
              Thể loại: {data.category}
            </section>
            <section className="content-text">Danh mục: {data.type}</section>
            <section className="content-text">Năm:{data.year}</section>

            <Link to={`/movies/${data._id}/watch`} className="btn-play">
              Xem phim
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoMovie;
