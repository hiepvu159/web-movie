import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getUserById } from "../../services/user";

export default function Rating({ id, rating }) {
  const [user, setUser] = useState([]);

  useEffect(() => {
    getUserById(setUser, id);
  }, []);

  return (
    <>
      <div className="w-2/3 py-3">
        <div className="flex">
          <div className="flex-shrink-0 mr-3">
            <img
              className="mt-3 rounded-full w-6 h-6 sm:w-8 sm:h-8"
              src={
                user?.avatar ||
                "https://ephoto360.com/uploads/effect-data/ephoto360.com/1362b22eb/t5e787cba70ec8.jpg"
              }
              alt=""
            />
          </div>

          <div className="flex-1 pl-3 py-2">
            <strong>{user?.name}</strong>{" "}
            {/* <span class="text-xs text-gray-400">3:34 PM</span> */}
            <div>Đã đánh giá phim {rating?.rating}/10</div>
          </div>
        </div>
      </div>
    </>
  );
}
