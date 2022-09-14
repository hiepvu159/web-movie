import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { addMovies, getInfo } from "../../../services/movie";
import "./CreateMovie.css";
import { useEffect } from "react";

export default function CreateMovie() {
  const token = useSelector((state) => state.auth.currentUser.accessToken);
  const navigate = useNavigate();
  const [src, setSrc] = useState("");
  const [movie, setMovie] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [name, setName] = useState("");

  // const schema = yup.object().shape({
  //   name: yup.string().required("Vui lòng nhập đầy đủ thông tin"),
  //   content: yup.string().required("Vui lòng nhập đầy đủ thông tin"),
  //   thumb: yup.string().required("Vui lòng nhập đầy đủ thông tin"),
  //   poster: yup.string().required("Vui lòng nhập đầy đủ thông tin"),
  //   trailer: yup.string().required("Vui lòng nhập đầy đủ thông tin"),
  //   type: yup.string().required("Vui lòng nhập đầy đủ thông tin"),
  //   status: yup.string().required("Vui lòng nhập đầy đủ thông tin"),
  //   category: yup.string().required("Vui lòng nhập đầy đủ thông tin"),
  //   link: yup.string().required("Vui lòng nhập đầy đủ thông tin"),
  // });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({});

  const handleChange = (e) => {
    e.preventDefault();
    setSrc(e.target.value);
  };

  const onSubmit = (e) => {
    const newMovie = {
      name: e.name,
      origin_name: e.origin_name,
      thumb_url: e.thumb_url,
      poster_url: e.poster_url,
      trailer_url: e.trailer_url,
      type: e.type,
      actor: e.actor,
      director: e.director,
      country: e.country,
      status: e.status,
      category: e.category,
      content: e.content,
      episodes: episodes,
      status: e.status,
      episode_current: e.episode_current,
      episode_total: e.episode_total,
    };
    console.log(newMovie);
    // console.log(movie);
    // console.log(link);
    // await addMovies(infoMovie, token, navigate);
  };
  // console.log(name);
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
            onClick={() => getInfo(src, setMovie, setEpisodes)}
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
                for="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Tên Phim
              </label>
              <input
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                value={movie.name}
                onChange={(e) => setName(e.currentTarget.value)}
                {...register("name")}
              />
            </div>
            <div>
              <label
                for="origin"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Tên Gốc
              </label>
              <input
                type="text"
                id="origin_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                defaultValue={movie.origin_name}
                {...register("origin_name")}
              />
            </div>
            <div>
              <label
                for="poster"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Thumbnail URL
              </label>
              <input
                type="text"
                id="poster"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                defaultValue={movie.poster_url}
                {...register("thumb_url")}
              />
            </div>
            <div>
              <label
                for="thumb"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Poster URL
              </label>
              <input
                type="text"
                id="thumb"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                defaultValue={movie.thumb_url}
                {...register("poster_url")}
              />
            </div>
            <div>
              <label
                for="trailer"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Trailer URL
              </label>
              <input
                type="text"
                id="trailer"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                defaultValue={movie.trailer_url}
                {...register("trailer_url")}
              />
            </div>
            <div>
              <label
                for="type"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Danh mục
              </label>
              <input
                type="text"
                id="type"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                defaultValue={movie.type}
                {...register("type")}
              />
            </div>
            <div>
              <label
                for="category"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Thể Loại
              </label>
              <input
                type="text"
                id="category"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                defaultValue={movie?.category?.map((i) => i.name)}
                {...register("category")}
              />
            </div>
            <div>
              <label
                for="year"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Năm
              </label>
              <input
                type="text"
                id="year"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                defaultValue={movie.year}
                {...register("year")}
              />
            </div>
            <div>
              <label
                for="country"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Quốc Gia
              </label>
              <input
                type="text"
                id="country"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                defaultValue={movie?.country?.map((i) => i.name)}
                {...register("country")}
              />
            </div>
            <div>
              <label
                for="director"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Đạo diễn
              </label>
              <input
                type="text"
                id="director"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                defaultValue={movie?.director?.join(", ")}
                {...register("director")}
              />
            </div>
            <div>
              <label
                for="actor"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Diễn viên
              </label>
              <input
                type="text"
                id="actor"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                defaultValue={movie?.actor?.join(", ")}
                {...register("actor")}
              />
            </div>
            <div>
              <label
                for="episode_current"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Số tập hiện tại
              </label>
              <input
                type="text"
                id="episode_current"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                defaultValue={movie.episode_current}
                {...register("episode_current")}
              />
            </div>
            <div>
              <label
                for="episode_total"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Tổng số tập
              </label>
              <input
                type="text"
                id="episode_total"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                defaultValue={movie.episode_total}
                {...register("episode_total")}
              />
            </div>
            <div>
              <label
                for="status"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Trạng thái
              </label>
              <input
                type="text"
                id="status"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                defaultValue={movie.status}
                {...register("status")}
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
                for="episodes"
                className="block  invisible  mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Tập
              </label>
              <input
                type="text"
                id="episodes"
                className="bg-gray-50 border invisible  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                defaultValue={episodes}
                {...register("episodes")}
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
