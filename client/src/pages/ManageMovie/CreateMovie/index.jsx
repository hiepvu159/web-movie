import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { addMovies, getInfo } from "../../../services/movie";
import "./CreateMovie.css";

export default function CreateMovie() {
  const token = useSelector((state) => state.auth.currentUser.accessToken);
  const navigate = useNavigate();
  const [src, setSrc] = useState("");
  const [movie, setMovie] = useState([]);
  const [link, setLink] = useState([]);

  const schema = yup.object().shape({
    name: yup.string().required("Vui lòng nhập đầy đủ thông tin"),
    content: yup.string().required("Vui lòng nhập đầy đủ thông tin"),
    thumb: yup.string().required("Vui lòng nhập đầy đủ thông tin"),
    poster: yup.string().required("Vui lòng nhập đầy đủ thông tin"),
    trailer: yup.string().required("Vui lòng nhập đầy đủ thông tin"),
    type: yup.string().required("Vui lòng nhập đầy đủ thông tin"),
    status: yup.string().required("Vui lòng nhập đầy đủ thông tin"),
    category: yup.string().required("Vui lòng nhập đầy đủ thông tin"),
    link: yup.string().required("Vui lòng nhập đầy đủ thông tin"),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleChange = (e) => {
    e.preventDefault();
    setSrc(e.target.value);
  };

  const onSubmit = async (e) => {
    const newMovie = {
      name: e.name,
      origin_name: e.origin_name,
      thumb_url: e.thumb,
      poster_url: e.poster,
      trailer_url: e.trailer,
      type: e.type,
      actor: e.actor,
      director: e.director,
      country: e.country,
      status: e.status,
      category: e.category,
      content: e.content,
      episodes: e.link,
    };
    console.log(newMovie);
    // await addMovies(infoMovie, token, navigate);
  };

  return (
    <div className="w-full px-10">
      <div className="font-bold text-3xl py-5 pl-1 p">Tạo Phim Mới</div>
      <div>
        <label
          for="first_name"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Nguồn phim
        </label>
        <div className="flex">
          <input
            type="text"
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Điền nguồn vào đây..."
            required=""
            autoComplete="off"
            onChange={handleChange}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg"
            onClick={() => getInfo(src, setMovie, setLink)}
          >
            Nhập
          </button>
        </div>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                for="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Tên Phim
              </label>
              <input
                type="text"
                id="first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                value={movie.name}
                {...register("name")}
              />
            </div>
            <div>
              <label
                for="last_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Tên Gốc
              </label>
              <input
                type="text"
                id="last_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                value={movie.origin_name}
                {...register("origin_name")}
              />
            </div>
            <div>
              <label
                for="company"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Thumbnail URL
              </label>
              <input
                type="text"
                id="poster"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                value={movie.poster_url}
                {...register("poster")}
              />
            </div>
            <div>
              <label
                for="phone"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Poster
              </label>
              <input
                type="text"
                id="thumb"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                value={movie.thumb_url}
                {...register("thumb")}
              />
            </div>
            <div>
              <label
                for="website"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Danh mục
              </label>
              <input
                type="text"
                id="website"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                value={movie.type}
                {...register("type")}
              />
            </div>
            <div>
              <label
                for="visitors"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Thể Loại
              </label>
              <input
                type="text"
                id="visitors"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                defaultValue={movie?.category?.map((i) => i.name)}
                {...register("category")}
              />
            </div>
            <div>
              <label
                for="company"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Năm
              </label>
              <input
                type="text"
                id="company"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                value={movie.year}
                {...register("year")}
              />
            </div>
            <div>
              <label
                for="company"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Quốc Gia
              </label>
              <input
                type="text"
                id="company"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                value={movie?.country?.map((i) => i.name)}
                {...register("country")}
              />
            </div>
            <div>
              <label
                for="company"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Đạo diễn
              </label>
              <input
                type="text"
                id="company"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                value={movie?.director?.join(", ")}
                {...register("director")}
              />
            </div>
            <div>
              <label
                for="company"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Diễn viên
              </label>
              <input
                type="text"
                id="company"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                value={movie?.actor?.join(", ")}
                {...register("actor")}
              />
            </div>
            <div>
              <label
                for="company"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Số tập hiện tại
              </label>
              <input
                type="text"
                id="company"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                value={movie.episode_current}
                {...register("episode_current")}
              />
            </div>
            <div>
              <label
                for="company"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Tổng số tập
              </label>
              <input
                type="text"
                id="company"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                value={movie.episode_total}
                {...register("episode_total")}
              />
            </div>
            <div>
              <label
                for="content"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Nội Dung
              </label>
              <textarea
                type="text"
                id="content"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg resize-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                defaultValue={movie.content}
                autoComplete="off"
                {...register("content")}
              />
            </div>
            <div>
              <label
                for="company"
                className="block  invisible  mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Tập
              </label>
              <input
                type="text"
                id="company"
                className="bg-gray-50 border invisible  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                value={link}
                {...register("link")}
              />
            </div>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
