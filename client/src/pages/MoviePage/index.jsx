import React, { useState, useEffect, useCallback } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import CommentBox from "../../components/CommentBox";
import InfoMovie from "../../components/InfoMovie";
import Rating from "../../components/Rating";
import { addComments, deleteComments } from "../../services/comment";
import { getMovieById } from "../../services/movie";
import { addRating } from "../../services/rating";
import { getUserById } from "../../services/user";
import "./MoviePage.css";

function MoviePage() {
  const param = useParams();
  const { id } = param;
  const [user, setUser] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [reload, setReload] = useState(false);
  const [movie, setMovie] = useState([]);
  const currentUser = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    getMovieById(id, setMovie);
  }, [load, reload, loading]);

  const handleClick = async (e) => {
    e.preventDefault();
    if (comment?.length === 0) {
      alert("Vui lòng nhập bình luận trước khi nhấn nút");
    }
    await addComments(comment, id, currentUser?.accessToken);
    setLoad(!load);
    setComment("");
  };

  const handleRating = async (e) => {
    e.preventDefault();
    if (Number(rating) < 1 || Number(rating) > 10) {
      alert("Vui lòng nhập đánh giá trên thang điểm 1-10");
    }
    await addRating(rating, id, currentUser?.accessToken);
    setLoad(!load);
    setRating("");
  };
  useEffect(() => {
    getUserById(setUser, id);
  }, []);

  return (
    <>
      <InfoMovie data={movie} check={false} />
      <div className="main">
        <div className="main-content">
          <ReactPlayer
            url={movie?.episodes?.toString()}
            controls={true}
            width="100%"
            height="100%"
          />
          <div className="w-1/2 py-5">
            <div className="py-5 bg-white">
              <div className=" text-black font-bold text-xl mb-2">
                {" "}
                Đánh giá
              </div>
              <div className="w-full mb-2">
                {currentUser ? (
                  <form action="submit" className="flex">
                    <img
                      src={currentUser?.avatar}
                      alt="avatar"
                      className="mt-3 mr-3 rounded-full w-10 object-cover sm:w-8 sm:h-8"
                    />
                    <input
                      type="number"
                      id="rating"
                      name="rating"
                      className="w-1/4 ml-3 pl-3 border border-slate-400 rounded focus:outline-none focus:ring-gray-300 focus:ring-1"
                      onChange={(e) => setRating(e.target.value)}
                      placeholder="Nhập đánh giá"
                    />
                    <button
                      className="px-3 py-2 text-sm text-blue-100 bg-blue-600 rounded"
                      onClick={handleRating}
                    >
                      Đánh giá
                    </button>
                  </form>
                ) : (
                  <>
                    <div>
                      <Link to="/login" className="text-red-500 font-bold ">
                        Đăng nhập
                      </Link>{" "}
                      để đánh giá
                    </div>
                  </>
                )}
              </div>
              {movie?.ratings?.map((item) => (
                <Rating id={item?.postedBy} rating={item} />
              ))}
            </div>
            <div className="flex flex-col justify-between">
              <div className="py-5 bg-white">
                <div className=" text-black font-bold text-xl mb-2">
                  {" "}
                  Bình luận
                </div>
                <div className="w-full mb-2">
                  {currentUser ? (
                    <form action="submit" className="flex">
                      <img
                        src={currentUser?.avatar}
                        alt="avatar"
                        className="mt-3 mr-3 rounded-full w-10 object-cover sm:w-8 sm:h-8"
                      />
                      <textarea
                        className="w-full h-20 ml-3 p-3 resize-none border border-slate-400 rounded focus:outline-none focus:ring-gray-300 focus:ring-1"
                        name="comment"
                        placeholder="Bình luận vào đây..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                      <button
                        className="px-3 py-2 text-sm text-blue-100 bg-blue-600 rounded"
                        onClick={handleClick}
                      >
                        Bình luận
                      </button>
                    </form>
                  ) : (
                    <>
                      <div>
                        <Link to="/login" className="text-red-500 font-bold ">
                          Đăng nhập
                        </Link>{" "}
                        để bình luận
                      </div>
                    </>
                  )}
                </div>
                {movie?.comments?.map((item) => (
                  <div key={movie?._id}>
                    <CommentBox
                      id={item?.postedBy}
                      reload={setReload}
                      comment={item}
                    />
                    {currentUser?._id == item?.postedBy ||
                    currentUser?.role === "admin" ? (
                      <button
                        onClick={() => {
                          deleteComments(item?._id, currentUser.accessToken);
                          setLoading(!loading);
                        }}
                        className="text-red-500 ml-14"
                      >
                        Xóa
                      </button>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MoviePage;
