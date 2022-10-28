import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storage from "../../../firebase";
import { getMovieById, updateMovie } from "../../../services/movie";
import { option } from "../../../gener";
import Status from "../../../components/Status";
import "./EditMovie.css";
import { useForm } from "react-hook-form";

export default function EditMovie() {
  const token = useSelector((state) => state.auth.currentUser.accessToken);
  const navigate = useNavigate();
  const [movieInfo, setMovieInfo] = useState({});
  const [check, setCheck] = useState(false);
  const param = useParams();
  const { id } = param;

  useEffect(() => {
    if (check) {
      let defaultValues = {};
      defaultValues.name = `${movieInfo?.name}`;
      defaultValues.origin_name = `${movieInfo?.origin_name}`;
      defaultValues.thumb_url = `${movieInfo?.poster_url}`;
      defaultValues.poster_url = `${movieInfo?.thumb_url}`;
      defaultValues.trailer_url = `${movieInfo?.trailer_url}`;
      defaultValues.type = `${movieInfo?.type}`;
      defaultValues.director = `${movieInfo?.director}`;
      defaultValues.status = `${movieInfo?.status}`;
      defaultValues.type = `${movieInfo?.type}`;
      defaultValues.country = `${movieInfo?.country}`;
      defaultValues.actor = `${movieInfo?.actor}`;
      defaultValues.year = `${movieInfo?.year}`;
      defaultValues.category = `${movieInfo?.category}`;
      defaultValues.content = `${movieInfo?.content}`;
      reset({ ...defaultValues });
    }
    // return;
  }, [check]);

  const callApi = async () => {
    await getMovieById(id, setMovieInfo);
    setCheck(!check);
  };

  useEffect(() => {
    callApi();
  }, []);

  const handleChangeInfo = async (e) => {
    const update = {
      name: e.name,
      origin_name: e.origin_name,
      content: e.content,
      thumb_url: e.poster_url,
      poster_url: e.thumb_url,
      trailer_url: e.trailer_url,
      type: e.type,
      director: e.director,
      status: e.status,
      episode_current: e.episode_current,
      episode_total: e.episode_total,
      country: e.country,
      actor: e.actor,
      year: e.year,
      category: e.category,
      // episodes: episodes.episodes[0].server_data,
    };
    console.log(update);
    // console.log(episodes.episodes[0].server_data);
    await updateMovie(update, token, id, navigate);
  };
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: {},
  } = useForm({
    defaultValues: {
      name: `${movieInfo?.name}`,
      origin_name: `${movieInfo?.origin_name}`,
    },
  });
  return (
    <div className="w-full px-10">
      <div className="font-bold text-3xl py-5 pl-1 p">Chỉnh sửa thông tin</div>

      <div>
        <form onSubmit={handleSubmit(handleChangeInfo)}>
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
                required=""
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
                className="h-24 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg resize-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                autoComplete="off"
                {...register("content")}
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
