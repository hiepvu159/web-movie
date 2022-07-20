import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { FaRegLightbulb } from "react-icons/fa";
import axios from "axios";
import { useParams } from "react-router";
import InfoMovie from "../../components/InfoMovie";

import "./MoviePage.css";

function MoviePage() {
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

  return (
    <>
      <InfoMovie data={movie} />
      <div className="main">
        <div className="main-content">
          <div>
            <ReactPlayer
              url={movie.link}
              controls={true}
              width="100%"
              height="100%"
            />
          </div>

          <div className="user-action">
            <div className="btn-turnoff">
              <FaRegLightbulb />
              <button type="button">Tắt đèn</button>
            </div>
            <div className="action-rating">Rating</div>
          </div>
        </div>
        {/* <SideBarUser /> */}
      </div>
    </>
  );
}

export default MoviePage;
