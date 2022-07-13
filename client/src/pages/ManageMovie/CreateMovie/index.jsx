import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addMovies } from "../../../services/movie";
import { Link, useNavigate } from "react-router-dom";
import "./CreateMovie.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { options } from "../../../gener";

export default function CreateMovie() {
  const [category, setCategory] = useState([]);
  const schema = yup.object().shape({
    name: yup.string().required("Vui lòng nhập đầy đủ thông tin"),
    content: yup.string().required("Vui lòng nhập đầy đủ thông tin"),
    thumb: yup.string().required("Vui lòng nhập đầy đủ thông tin"),
    poster: yup.string().required("Vui lòng nhập đầy đủ thông tin"),
    trailer: yup.string().required("Vui lòng nhập đầy đủ thông tin"),
    type: yup.string().required("Vui lòng nhập đầy đủ thông tin"),
    status: yup.string().required("Vui lòng nhập đầy đủ thông tin"),
    // category: yup.string().required("Vui lòng nhập đầy đủ thông tin"),
    link: yup.string().required("Vui lòng nhập đầy đủ thông tin"),
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (e) => {
    const newMovie = {
      name: e.name,
      content: e.content,
      thumb_url: e.thumb,
      poster_url: e.poster,
      trailer_url: e.trailer,
      type: e.type,
      status: e.status,
      category: category,
      link: e.link,
    };
    console.log(newMovie);
    // addMovies(newMovie);
  };

  return (
    <div className="w-full pr-3">
      <div className="font-bold text-3xl pt-5 pl-1">Tạo Phim Mới</div>
      <div className=" py-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-movie">
            <div className="form-add">
              <label>Tên phim</label>
              <input
                type="text"
                className="form-input"
                autoComplete="off"
                {...register("name")}
              />
              {errors.name && <p className="error">{errors.name?.message}</p>}
            </div>
            <div className="form-add">
              <label>Poster</label>
              <input
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
              <label>Loại</label>
              <input
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
              <label>Danh mục</label>
              <Select
                options={options}
                isMulti
                className="w-full border border-slate-600 rounded"
                onChange={(e) =>
                  setCategory(Array.isArray(e) ? e.map((x) => x.value) : [])
                }
              />
            </div>
            <div className="form-add">
              <label>Link</label>
              <input
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
            <button className="btn-create">Tạo mới</button>
          </div>
        </form>
      </div>
    </div>
  );
}
