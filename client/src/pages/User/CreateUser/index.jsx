import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storage from "../../../firebase";
import { addNewUser } from "../../../services/user";
import Status from "../../../components/Status";

export default function CreateUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [avatar, setAvatar] = useState("");
  const [user, setUser] = useState({});
  const [load, setLoad] = useState(null);
  const [check, setCheck] = useState(0);
  const [status, setStatus] = useState({
    isLoading: false,
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value });
  };
  const handleStatus = (isLoading) => {
    setStatus({
      isLoading,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addNewUser(user, dispatch, navigate, setErrorMessage);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    handleStatus(true);
    uploaded([{ file: avatar, label: "avatar" }]);
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
          console.log("Upload is " + progress + "% done");
          setLoad(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log("File available at", url);
            setUser((prev) => {
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
      <div className="font-bold text-3xl pt-5 pl-1">Tạo người dùng</div>
      <div className=" py-8">
        <form>
          <div className="form-movie">
            <div className="form-add">
              <label>Tên người dùng</label>
              <input
                name="name"
                type="text"
                className="form-input"
                autoComplete="off"
                onChange={handleChange}
              />
            </div>
            <div className="form-add">
              <label>Ảnh đại diện</label>
              <input
                type="file"
                className="form-file"
                onChange={(e) => setAvatar(e.target.files[0])}
              />
            </div>
          </div>

          <div className="form-movie">
            <div className="form-add">
              <label>Tên tài khoản</label>
              <input
                name="username"
                type="text"
                className="form-input"
                autoComplete="off"
                onChange={handleChange}
              />
              <div className="text-red-600">{errorMessage}</div>
            </div>
            <div className="form-add">
              <label>Mật khẩu</label>
              <input
                name="password"
                type="password"
                className="form-input"
                autoComplete="off"
                onChange={handleChange}
              />
            </div>
          </div>

          <div type="submit" className="flex justify-between mt-5 px-3">
            <Link to="/admin/user">
              <button className="btn-create">Quay về</button>
            </Link>
            <div>
              {!avatar ? (
                <button className="btn-disabled" disabled>
                  Upload ảnh
                </button>
              ) : (
                <button className="btn-upload" onClick={handleUpload}>
                  Upload ảnh
                </button>
              )}
              <button className="btn-create" onClick={handleSubmit}>
                Tạo tài khoản
              </button>
            </div>
          </div>
        </form>
        {status.isLoading && (
          <Status
            load={load}
            check={check}
            checked={1}
            onStatus={() => setStatus(false)}
          />
        )}
      </div>
    </div>
  );
}
