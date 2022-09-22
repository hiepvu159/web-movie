import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router";
import InfoMovie from "../../components/InfoMovie";
import { getMovieById } from "../../services/movie";
import "./MoviePage.css";

function MoviePage() {
  const param = useParams();
  const { id } = param;
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    getMovieById(id, setMovie);
  }, []);
  // console.log(movie?.episodes[0]?.link_m3u8);
  return (
    <>
      <InfoMovie data={movie} />
      <div className="main">
        <div className="main-content">
          <ReactPlayer
            url={movie?.episodes}
            controls={true}
            width="100%"
            height="100%"
          />
        </div>
        <div className="flex">
          {movie?.episodes?.map((ep) => (
            <div>{ep.name}</div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MoviePage;
