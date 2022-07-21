import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import storage from "../../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { getUserById, updateUser } from "../../../services/user";
import { useSelector } from "react-redux";
import "./edit.css";
import Status from "../../../components/Status";

export default function EditUser() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [avatar, setAvatar] = useState(null);
  const [user, setUser] = useState({});
  const [load, setLoad] = useState(null);
  const [check, setCheck] = useState(0);
  const [status, setStatus] = useState({
    isLoading: false,
  });
  const token = useSelector((state) => state.auth.currentUser.accessToken);

  const param = useParams();
  const { id } = param;

  useEffect(() => {
    getUserById(setUserInfo, id);
  }, [id]);

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
    await updateUser(user, token, id, navigate);
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
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setLoad(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
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
      <div className="font-bold text-3xl pt-5 pl-1">
        Chỉnh sửa thông tin người dùng
      </div>
      <div className=" py-8">
        <form>
          <div className="form-movie">
            <div className="form-add">
              <label>Tên người dùng</label>
              <input
                name="name"
                defaultValue={userInfo.name}
                type="text"
                className="form-input"
                autoComplete="off"
                onChange={handleChange}
              />
            </div>
            <div className="form-add">
              <div className="flex">
                <label>Ảnh đại diện</label>
                <img src={userInfo.avatar} alt="avatar" className="avatar" />
              </div>
              <input
                type="file"
                className="form-file"
                onChange={(e) => setAvatar(e.target.files[0])}
              />
            </div>
          </div>

          <div className="w-1/2">
            <div className="px-3 py-2 w-full">
              <label>Tên tài khoản</label>
              <input
                defaultValue={userInfo.username}
                disabled
                type="text"
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
                Cập nhật
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
