import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import CommentBox from "../../components/CommentBox";
import InfoMovie from "../../components/InfoMovie";
import { getMovieById } from "../../services/movie";
import "./MoviePage.css";

function MoviePage() {
  const param = useParams();
  const { id } = param;
  const [movie, setMovie] = useState([]);
  const currentUser = useSelector((state) => state.auth.currentUser);
  useEffect(() => {
    getMovieById(id, setMovie);
  }, []);
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
          <div className="flex">
            <div className="w-2/3 py-6">
              <div className=" text-black font-bold text-xl mb-2">
                {" "}
                Bình luận
              </div>
              <div className="px-4 py-5 bg-white">
                <div className="w-full mb-2">
                  {currentUser ? (
                    <form action="submit" className="flex">
                      <img
                        src={currentUser?.avatar}
                        alt="avatar"
                        className="mt-3 mr-3 rounded-full w-10 object-cover sm:w-8 sm:h-8"
                      />
                      <textarea
                        className="w-full h-20 ml-3 p-3 resize-none border rounded focus:outline-none focus:ring-gray-300 focus:ring-1"
                        name="comment"
                        placeholder="Bình luận vào đây..."
                      ></textarea>
                      <button className="px-3 py-2 text-sm text-blue-100 bg-blue-600 rounded">
                        Bình luận
                      </button>
                    </form>
                  ) : (
                    <>
                      <div>Dang nhap de cmt</div>
                    </>
                  )}
                </div>
                <div className="flex flex-col">
                  {movie?.comments?.map((comment) => (
                    <div className="flex flex-row pl-3 py-2">
                      <img
                        className="mt-3 rounded-full w-6 h-6 sm:w-8 sm:h-8"
                        src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
                        alt=""
                      />
                      <div className="flex flex-col ml-3 my-2">
                        <strong>Sarah</strong>{" "}
                        {/* <span className="text-xs text-gray-400"></span> */}
                        <p className="text-xs sm:text-sm">{comment?.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MoviePage;
