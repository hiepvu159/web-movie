import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

InfoMovie.propTypes = {
  name: PropTypes.string,
  thumb_url: PropTypes.string,
  poster_url: PropTypes.string,
  origin_name: PropTypes.string,
  time: PropTypes.string,
  category: PropTypes.array,
  type: PropTypes.string,
  country: PropTypes.string,
  director: PropTypes.string,
  actor: PropTypes.array,
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
              <section className="content-origin_name">
                {data.origin_name}
              </section>
            </div>

            <section className="content-text">Danh mục: {data.type}</section>
            <section className="content-text">
              Thể loại: {data.category}
            </section>
            <section className="content-text">Quốc gia: {data.country}</section>
            <section className="content-text">
              Năm phát hành: {data.year}
            </section>
            <section className="content-text">Diễn viên:{data.actor}</section>
            <section className="content-text">
              Đạo diễn: {data.director}
            </section>

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
