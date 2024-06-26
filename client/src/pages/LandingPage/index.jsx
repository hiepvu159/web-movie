import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import ReactPlayer from "react-player";
import InfoMovie from "../../components/InfoMovie";
import "./LandingPage.css";
import { getMovieById } from "../../services/movie";

function LandingPage() {
  const param = useParams();
  const { id } = param;
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    getMovieById(id, setMovie);
  }, [id]);
  return (
    <>
      <div className="main">
        <InfoMovie data={movie} check={true} />
      </div>
      <div className="content-des">
        <section className="content-des-title">Nội dung phim</section>
        <p className="content-des-summary">{`${movie.content}`}</p>
        <div className="content-des-title">Trailer</div>
        <div className="trailer">
          <ReactPlayer
            className="trailer"
            url={
              movie.trailer_url ||
              "https://www.youtube.com/watch?v=e1ZSLVTZ47M&ab_channel=CGVCinemasVietnam"
            }
            controls={true}
          />
        </div>
      </div>
    </>
  );
}

export default LandingPage;
