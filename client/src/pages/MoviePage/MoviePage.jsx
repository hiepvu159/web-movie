import React, { useState, useEffect } from "react";
import ReactHlsPlayer from "react-hls-player";
import { FaRegLightbulb } from "react-icons/fa";
import axios from "axios";
import { useParams } from "react-router";
import SideBarUser from "../../components/SideBarUser";
import InfoMovie from "../../components/InfoMovie";
import CommentBox from "../../components/CommentBox";

import "./MoviePage.css";

function MoviePage(props) {
  const param = useParams();
  const { id } = param;
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    const getMovie = async (id) => {
      try {
        await axios.get(`/movies/find/${id}`).then((res) => {
          setMovie(res.data);
        });
      } catch (error) {
        console.log(error);
      }
    };
    getMovie(id);
  }, [id]);
  const { episodes } = movie;

  return (
    <>
      <InfoMovie data={movie} />
      <div className="main">
        <div className="main-content">
          <div className="movie-player">
            {episodes?.map((e) => (
              <ReactHlsPlayer
                key={e._id}
                src={e.link}
                autoPlay={false}
                controls={true}
              />
            ))}
          </div>

          <div className="user-action">
            <div className="btn-turnoff">
              <FaRegLightbulb />
              <button type="button">Tắt đèn</button>
            </div>
            <div className="action-rating">Rating</div>
          </div>
          <div className="movie-episodes">
            <span className="movie-episodes-title">Chọn tập phim</span>
            <div className="movie-episodes-list">
              <button className="movie-episodes-item">2</button>;
              {episodes?.map((e) => {
                <button className="movie-episodes-item">{e.name}</button>;
              })}
            </div>
          </div>
          <CommentBox />
        </div>
        <SideBarUser />
      </div>
    </>
  );
}

export default MoviePage;
