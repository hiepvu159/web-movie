import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getMovieById } from "../../services/movie";
import { getUserById } from "../../services/user";

export default function CommentBox(id, currentUser) {
  const [user, setUser] = useState([]);
  const [movie, setMovie] = useState([]);
  const [commentMovie, setCommetMovie] = useState([]);

  useEffect(() => {
    getMovieById(id, setMovie);
    // getUserById(comment?.postedBy, setUser);
  }, []);
  console.log(movie);
  return (
    <>
      <div className="w-2/3 py-6">
        <div className=" text-black font-bold text-xl mb-2"> Bình luận</div>
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
          <div class="flex">
            <div class="flex-shrink-0 mr-3">
              <img
                class="mt-3 rounded-full w-6 h-6 sm:w-8 sm:h-8"
                src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
                alt=""
              />
            </div>
            {movie?.comments?.map((comment) => (
              <div class="flex-1 pl-3 py-2">
                <strong>Sarah</strong>{" "}
                <span class="text-xs text-gray-400">3:34 PM</span>
                <p class="text-xs sm:text-sm">{comment?.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
