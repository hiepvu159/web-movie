import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storage from "../../../firebase";
import { getMovieById, updateMovie } from "../../../services/movie";
import { option } from "../../../gener";
import "./EditMovie.css";

export default function EditMovie() {
  const token = useSelector((state) => state.auth.currentUser.accessToken);
  const navigate = useNavigate();
  const [movieInfo, setMovieInfo] = useState({});
  const [movie, setMovie] = useState({});
  const [categorySelected, setCategorySelected] = useState([]);
  const [thumb, setThumb] = useState("");
  const [poster, setPoster] = useState("");
  const [trailer, setTrailer] = useState("");
  const [link, setLink] = useState("");
  const param = useParams();
  const { id } = param;

  useEffect(() => {
    getMovieById(id, setMovieInfo);
  }, [id]);

  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({
      ...movie,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateMovie(movie, token, id, navigate);
  };

  const handleUpload = (e) => {
    e.preventDefault();
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
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setMovie((prev) => {
              return { ...prev, [item.label]: url };
            });
          });
        }
      );
    });
  };
  return (
    <div className="w-full px-3">
      <div className="font-bold text-3xl pt-5 pl-1">Cập nhật</div>
      <div className=" py-8">
        <form>
          <div className="form-movie">
            <div className="form-add">
              <label>Tên phim</label>

              <input
                defaultValue={movieInfo.name}
                required
                name="name"
                type="text"
                className="form-input"
                onChange={handleChange}
              />
            </div>
            <div className="form-add">
              <div className="info">
                <label>Poster</label>
                <img
                  src={movieInfo.poster_url}
                  alt="poster"
                  className="avatar"
                />
              </div>
              <input
                type="file"
                className="form-file"
                onChange={(e) => setPoster(e.target.files[0])}
              />
            </div>
          </div>
          <div className="form-movie">
            <div className="form-add">
              <label>Năm sản xuất</label>
              <input
                defaultValue={movieInfo.year}
                required
                name="year"
                type="text"
                className="form-input"
                autoComplete="off"
                onChange={handleChange}
              />
            </div>
            <div className="form-add">
              <div className="info">
                <label>Trailer</label>
                {movieInfo.trailer_url ? <p>: Đã có video</p> : <></>}
              </div>
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
                defaultValue={movieInfo.type}
                required
                name="type"
                type="text"
                className="form-input"
                autoComplete="off"
                onChange={handleChange}
              />
            </div>
            <div className="form-add">
              <div className="info">
                <label>Thumbnail</label>
                <img
                  src={movieInfo.thumb_url}
                  alt="thumbail"
                  className="avatar"
                />
              </div>
              <input
                type="file"
                className="form-file"
                onChange={(e) => setThumb(e.target.files[0])}
              />
            </div>
          </div>
          <div className="form-movie">
            <div className="form-add">
              <div className="info">
                <label>Thể loại</label>
                <div>: {movieInfo.category}</div>
              </div>
              <Select
                name="category"
                options={option}
                isMulti
                isClearable
                getOptionLabel={(option) => option.label}
                getOptionValue={(option) => option.value}
                defaultValue={movieInfo.category}
                className="w-full border border-slate-600 rounded"
                onChange={(e) =>
                  setCategorySelected(
                    Array.isArray(e) ? e.map((x) => x.value) : []
                  )
                }
              />
            </div>
            <div className="form-add">
              <div className="info">
                <label>Nguồn phim</label>
                {movieInfo.link ? <p>: Đã có video</p> : <></>}
              </div>
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
              defaultValue={movieInfo.content}
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
              <button className="btn-upload" onClick={handleUpload}>
                Upload file
              </button>
              <button className="btn-create" onClick={handleSubmit}>
                Cập nhật
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
