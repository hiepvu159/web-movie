import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import InfoMovie from "../../components/InfoMovie";

function LandingPage(props) {
  const param = useParams();
  const { id } = param;
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    const getMovie = async (id) => {
      try {
        await axios.get(`/movies/find/${id}`).then((res) => {
          setMovie(res.data);
          console.log(res.data);
        });
      } catch (error) {
        console.log(error);
      }
    };
    getMovie(id);
  }, [id]);
  return (
    <>
      <div className="main">
        <InfoMovie data={movie} />
      </div>
      <div className="content-des">
        <section className="content-des-title">Nội dung phim</section>
        <div className="content-des-summary">{movie.content}</div>
        <div className="content-des-title">Trailer</div>
        <div className="trailer">
          <ReactPlayer
            className="trailer"
            url={movie.trailer_url}
            controls={true}
          />
        </div>
      </div>
    </>
  );
}

export default LandingPage;
