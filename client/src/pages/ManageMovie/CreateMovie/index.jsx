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
    reset,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({});

  const handleGetItem = () => {
    getInfo(src, setMovie, setEpisodes);
    // if (movie?.length !== 0) {
    //   let defaultValues = {};
    //   defaultValues.name = `${movie?.name}`;
    //   defaultValues.origin_name = `${movie?.origin_name}`;
    //   defaultValues.thumb_url = `${movie?.thumb_url}`;
    //   defaultValues.poster_url = `${movie?.poster_url}`;
    //   defaultValues.trailer_url = `${movie?.trailer_url}`;
    //   defaultValues.type = `${movie?.type}`;
    //   defaultValues.director = `${movie?.director}`;
    //   defaultValues.status = `${movie?.status}`;
    //   defaultValues.type = `${movie?.type}`;
    //   defaultValues.country = `${movie?.country}`;
    //   defaultValues.actor = `${movie?.actor}`;
    //   defaultValues.year = `${movie?.year}`;
    //   defaultValues.category = `${movie?.category?.map((item) => item.name)}`;
    //   defaultValues.episodes = `${movie?.episodes?.map((i) => i)}`;
    //   reset({ ...defaultValues });
    // }
  };
  useEffect(() => {
    if (movie?.length !== 0) {
      let defaultValues = {};
      defaultValues.name = `${movie?.name}`;
      defaultValues.origin_name = `${movie?.origin_name}`;
      defaultValues.thumb_url = `${movie?.poster_url}`;
      defaultValues.poster_url = `${movie?.thumb_url}`;
      defaultValues.trailer_url = `${movie?.trailer_url}`;
      defaultValues.type = `${movie?.type}`;
      defaultValues.director = `${movie?.director}`;
      defaultValues.status = `${movie?.status}`;
      defaultValues.type = `${movie?.type}`;
      defaultValues.country = `${movie?.country?.map((item) => item?.name)}`;
      defaultValues.actor = `${movie?.actor}`;
      defaultValues.content = `${movie?.content}`;
      defaultValues.year = `${movie?.year}`;
      defaultValues.category = `${movie?.category?.map((item) => item.name)}`;
      defaultValues.episodes = `${ep}`;
      reset({ ...defaultValues });
    } else {
      return;
    }
  }, [movie]);
  const ep = episodes?.episodes?.map((i) =>
    i.server_data?.map((a) => a.link_m3u8)
  );

  const onSubmit = async (e) => {
    const newMovie = {
      name: e.name,
      origin_name: e.origin_name,
      content: e.content,
      thumb_url: e.thumb_url,
      poster_url: e.poster_url,
      trailer_url: e.trailer_url,
      type: e.type,
      director: e.director,
      status: e.status,
      country: e.country,
      actor: e.actor,
      year: e.year,
      category: e.category,
      episodes: ep?.toString(),
    };
    console.log(newMovie);
    // console.log(episodes.episodes[0].server_data);
    await addMovies(newMovie, token, navigate);
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
        <div className="flex mb-6">
          <input
            type="text"
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Điền nguồn vào đây..."
            required=""
            autoComplete="off"
            onChange={(e) => setSrc(e.target.value)}
          />
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-r-lg"
            onClick={handleGetItem}
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
                {...register("actor")}
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
                autoComplete="off"
                {...register("content")}
              />
            </div>
            <div>
              <label
                for="episodes"
                className="block   mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Link phim
              </label>
              <input
                type="text"
                id="episodes"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("episodes")}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Tạo mới
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
