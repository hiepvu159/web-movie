import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addMovies, getMovieById } from "../../../services/movie";
import { options } from "../../../gener";

// import "./EditMovie.css";

export default function EditMovie() {
  const [movie, setMovie] = useState({});
  const param = useParams();
  const { id } = param;

  const schema = yup.object().shape({
    name: yup.string().required("Vui lòng nhập đầy đủ thông tin"),
    content: yup.string().required("Vui lòng nhập mật khẩu"),
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

  useEffect(() => {
    getMovieById(id, setMovie);
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const newMovie = {
      name: e.moviename,
      content: e.content,
      thumb_url: e.thumbnail,
      poster_url: e.poster,
      trailer_url: e.trailer_url,
      type: e.type,
      status: e.status,
      category: e.category,
      link: e.link,
    };
    console.log(newMovie);
    // addMovies(newMovie);
  };
  return (
    <div className="w-full px-3">
      <div className="font-bold text-3xl pt-5 pl-1">Cập nhật</div>
      <div className=" py-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-movie">
            <div className="form-add">
              <label>Tên phim</label>
              <input
                value={movie.name}
                type="text"
                className="form-input"
                autoComplete="off"
                {...register("moviename")}
              />
              {errors.name && <p className="error">{errors.name?.message}</p>}
            </div>
            <div className="form-add">
              <label>Poster</label>
              <input
                value={movie.poster_url}
                type="text"
                className="form-input"
                autoComplete="off"
                {...register("poster")}
              />
              {errors.poster && (
                <p className="error">{errors.poster?.message}</p>
              )}
            </div>
          </div>
          <div className="form-movie">
            <div className="form-add">
              <label>Thumbnail</label>
              <input
                value={movie.thumb_url}
                type="text"
                className="form-input"
                autoComplete="off"
                {...register("thumb")}
              />
              {errors.thumb && <p className="error">{errors.thumb?.message}</p>}
            </div>
            <div className="form-add">
              <label>Trailer</label>
              <input
                value={movie.trailer_url}
                type="text"
                className="form-input"
                autoComplete="off"
                {...register("trailer")}
              />
              {errors.trailer && (
                <p className="error">{errors.trailer?.message}</p>
              )}
            </div>
          </div>
          <div className="form-movie">
            <div className="form-add">
              <label>Danh mục</label>
              <input
                value={movie.type}
                type="text"
                className="form-input"
                autoComplete="off"
                {...register("type")}
              />
              {errors.type && <p className="error">{errors.type?.message}</p>}
            </div>
            <div className="form-add">
              <label>Trạng thái</label>
              <input
                value={movie.status}
                type="text"
                className="form-input"
                autoComplete="off"
                {...register("status")}
              />
              {errors.status && (
                <p className="error">{errors.status?.message}</p>
              )}
            </div>
          </div>
          <div className="form-movie">
            <div className="form-add">
              <label>Thể loại</label>
              <Select
                value={movie.category}
                options={options}
                isMulti
                className="w-full border border-slate-600 rounded"
                {...register("category")}
              />
            </div>
            <div className="form-add">
              <label>Link</label>
              <input
                value={movie.link}
                type="text"
                className="form-input"
                autoComplete="off"
                {...register("link")}
              />
              {errors.link && <p className="error">{errors.link?.message}</p>}
            </div>
          </div>
          <div className="form-add">
            <label>Nội dung</label>
            <textarea
              value={movie.content}
              type="text"
              className="form-content"
              autoComplete="off"
              {...register("content")}
            />
            {errors.content && (
              <p className="error">{errors.content?.message}</p>
            )}
          </div>
          <div type="submit" className="flex justify-between mt-5 px-3">
            <Link to="/admin/movie">
              <button className="btn-create">Quay về</button>
            </Link>
            <button className="btn-create">Cập nhật</button>
          </div>
        </form>
      </div>
    </div>
  );
}
