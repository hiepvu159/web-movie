import React, { useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import { Link, useNavigate } from "react-router-dom";
import storage from "../../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addMovies } from "../../../services/movie";
import { option } from "../../../gener";
import "./CreateMovie.css";
import Status from "../../../components/Status";

export default function CreateMovie() {
  const token = useSelector((state) => state.auth.currentUser.accessToken);
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [categorySelected, setCategorySelected] = useState([]);
  const [thumb, setThumb] = useState(null);
  const [poster, setPoster] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [link, setLink] = useState(null);
  const [load, setLoad] = useState(null);
  const [check, setCheck] = useState(0);
  const [status, setStatus] = useState({
    isLoading: false,
  });

  const handleStatus = (isLoading) => {
    setStatus({
      isLoading,
    });
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({
      ...movie,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addMovies(movie, token, navigate);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    handleStatus(true);
    setMovie({ ...movie, category: categorySelected });
    uploaded([
      { file: poster, label: "poster_url" },
      { file: trailer, label: "trailer_url" },
      { file: thumb, label: "thumb_url" },
      { file: link, label: "link" },
    ]);
  };

  const uploaded = (items) => {
    items.forEach((item) => {
      const imgRef = ref(storage, `/items/${item.file.name}`);
      const uploadTask = uploadBytesResumable(imgRef, item.file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setLoad(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setMovie((prev) => {
              return { ...prev, [item.label]: url };
            });
            setCheck((prev) => prev + 1);
          });
        }
      );
    });
  };

  return (
    <div className="w-full pr-3">
      <div className="font-bold text-3xl pt-5 pl-1">Tạo Phim Mới</div>
      <div className=" py-8">
        <form>
          <div className="form-movie">
            <div className="form-add">
              <label>Tên phim</label>
              <input
                name="name"
                type="text"
                className="form-input"
                autoComplete="off"
                onChange={handleChange}
              />
            </div>
            <div className="form-add">
              <label>Poster</label>
              <input
                type="file"
                className="form-file"
                onChange={(e) => setPoster(e.target.files[0])}
                // {...register("poster")}
              />
            </div>
          </div>

          <div className="form-movie">
            <div className="form-add">
              <label>Năm sản xuất</label>
              <input
                name="year"
                type="text"
                className="form-input"
                autoComplete="off"
                onChange={handleChange}
              />
            </div>

            <div className="form-add">
              <label>Trailer</label>
              <input
                type="file"
                className="form-file"
                onChange={(e) => setTrailer(e.target.files[0])}
              />
            </div>
          </div>
          <div className="form-movie">
            <div className="form-add">
              <label>Danh mục</label>
              <input
                name="type"
                type="text"
                className="form-input"
                autoComplete="off"
                onChange={handleChange}
              />
            </div>
            <div className="form-add">
              <label>Thumbnail</label>
              <input
                type="file"
                className="form-file"
                onChange={(e) => setThumb(e.target.files[0])}
              />
            </div>
          </div>
          <div className="form-movie">
            <div className="form-add">
              <label>Thể loại</label>
              <Select
                name="category"
                options={option}
                isMulti
                isClearable
                getOptionLabel={(option) => option.label}
                getOptionValue={(option) => option.value}
                className="w-full border border-slate-600 rounded"
                onChange={(e) =>
                  setCategorySelected(
                    Array.isArray(e) ? e.map((x) => x.value) : []
                  )
                }
              />
            </div>
            <div className="form-add">
              <label>Nguồn phim</label>
              <input
                type="file"
                className="form-file"
                onChange={(e) => setLink(e.target.files[0])}
              />
            </div>
          </div>
          <div className="form-add">
            <label>Nội dung</label>
            <textarea
              name="content"
              type="text"
              className="form-content"
              autoComplete="off"
              onChange={handleChange}
            />
          </div>
          <div type="submit" className="flex justify-between mt-5 px-3">
            <Link to="/admin/movie">
              <button className="btn-create">Quay về</button>
            </Link>
            <div>
              {!poster && !trailer && !thumb && !link ? (
                <button className="btn-disabled" disabled>
                  Upload file
                </button>
              ) : (
                <button className="btn-upload" onClick={handleUpload}>
                  Upload file
                </button>
              )}
              <button className="btn-create" onClick={handleSubmit}>
                Cập nhật
              </button>
            </div>
          </div>
        </form>
        {status.isLoading && (
          <Status
            load={load}
            check={check}
            checked={4}
            onStatus={() => setStatus(false)}
          />
        )}
      </div>
    </div>
  );
}
