import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import storage from "../../../firebase";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { getUserById, updateInfoUser } from "../../../services/user";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import Status from "../../../components/Status";
function EditProfile() {
  const currentUser = useSelector((s) => s.auth.currentUser);
  const navigate = useNavigate();
  const [check, setCheck] = useState(false);
  const [user, setUser] = useState([]);
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const [changeAvatar, setChangeAvatar] = useState("");
  const [load, setLoad] = useState(null);
  const [status, setStatus] = useState({
    isLoading: false,
  });

  const handleStatus = (isLoading) => {
    setStatus({
      isLoading,
    });
  };
  const callApi = async () => {
    await getUserById(setUser, currentUser?._id);
    setCheck(!check);
  };
  useEffect(() => {
    callApi();
  }, []);

  useEffect(() => {
    return () => avatarPreview && URL.revokeObjectURL(avatarPreview.preview);
  }, [avatar]);

  useEffect(() => {
    if (check) {
      let defaultValues = {};
      defaultValues.name = `${user?.name}`;
      defaultValues.username = `${user?.username}`;
      defaultValues.email = `${user?.email}`;
      defaultValues.gender = `${user?.gender}`;
      defaultValues.phone = `${user?.phone}`;
      defaultValues.address = `${user?.address}`;
      defaultValues.dob = `${user?.dob}`;
      reset({ ...defaultValues });
    }
  }, [check]);

  const handlePreviewAvatar = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);

    setAvatarPreview(file);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    handleStatus(true);
    uploaded([{ file: avatarPreview, label: "avatar" }]);
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
            setChangeAvatar((prev) => {
              return { ...prev, [item.label]: url };
            });
            setCheck(1);
          });
        }
      );
    });
  };

  const handleEdit = async (e) => {
    const userInfo = {
      name: e.name,
      email: e.email,
      gender: e.gender,
      phone: e.phone,
      dob: e.dob,
      address: e.address,
    };
    const infoUserUpdate = Object.assign(userInfo, changeAvatar);
    // setChangeAvatar({ ...changeAvatar, userInfo });
    console.log(userInfo);
    await updateInfoUser(infoUserUpdate, currentUser?.accessToken, navigate);
  };
  console.log("avara", changeAvatar);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: `${user?.name}`,
      email: `${user?.email}`,
      gender: `${user?.gender}`,
      phone: `${user?.phone}`,
      address: `${user?.address}`,
      dob: `${user?.dob}`,
    },
  });
  return (
    <div>
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="mx-10 my-5 sm:px-0">
            {avatarPreview ? (
              <img
                className="w-[16rem] mx-auto object-cover items-center"
                src={avatarPreview.preview}
                alt=""
                width="80%"
              />
            ) : (
              <img
                className="w-[16rem] mx-auto object-cover items-center"
                src={user?.avatar}
                alt="Rounded avatar"
              />
            )}
            <div className="text-center my-8 font-bold text-2xl">
              {user?.name}
            </div>
            <label
              className="block mb-2 text-center text-lg font-medium text-gray-900 dark:text-gray-300"
              for="file_input"
            >
              Đổi ảnh đại diện
            </label>
            <input
              className="block w-1/2 mx-auto text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
              onChange={handlePreviewAvatar}
            />
            <button
              className="block w-1/2 mx-auto my-5 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-lg font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={handleUpload}
            >
              Upload file
            </button>
          </div>
        </div>
        <div className="mt-5 md:col-span-2 flex flex-col justify-center md:mt-0">
          <form onSubmit={handleSubmit(handleEdit)}>
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="bg-white px-4 py-5 sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      for="first-name"
                      className="block text-lg font-medium text-gray-700"
                    >
                      Tên
                    </label>
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autocomplete="off"
                      className="mt-1 block w-full outline-0 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="error">{errors.name?.message}</p>
                    )}
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      for="last-name"
                      className="block text-lg font-medium text-gray-700"
                    >
                      Ngày sinh
                    </label>
                    <input
                      type="date"
                      name="last-name"
                      id="last-name"
                      autocomplete="off"
                      className="mt-1 block w-full outline-0 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                      {...register("dob")}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      for="email-address"
                      className="block text-lg font-medium text-gray-700"
                    >
                      Giới tính
                    </label>
                    <div className="flex justify-start my-auto">
                      <div className=" mr-5">
                        <input
                          id="default-radio-1"
                          type="radio"
                          value="Nam"
                          name="default-radio"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          {...register("gender")}
                        />
                        {errors.gender && (
                          <p className="error">{errors.gender?.message}</p>
                        )}
                        <label
                          for="default-radio-1"
                          className="ml-2 text-lg font-medium text-gray-900 dark:text-gray-300"
                        >
                          Nam
                        </label>
                      </div>
                      <div className="">
                        <input
                          id="default-radio-2"
                          type="radio"
                          value="Nữ"
                          name="default-radio"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          {...register("gender")}
                        />
                        {errors.gender && (
                          <p className="error">{errors.gender?.message}</p>
                        )}
                        <label
                          for="default-radio-2"
                          className="ml-2 text-lg font-medium text-gray-900 dark:text-gray-300"
                        >
                          Nữ
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      for="email-address"
                      className="block text-lg font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      name="email-address"
                      id="email-address"
                      autocomplete="off"
                      className="mt-1 block w-full outline-0 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                      {...register("email")}
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      for="email-address"
                      className="block text-lg font-medium text-gray-700"
                    >
                      Số điện thoại
                    </label>
                    <input
                      type="text"
                      name="email-address"
                      id="email-address"
                      autocomplete="off"
                      className="mt-1 block w-full outline-0 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                      {...register("phone")}
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      for="email-address"
                      className="block text-lg font-medium text-gray-700"
                    >
                      Địa chỉ
                    </label>
                    <input
                      type="text"
                      name="email-address"
                      id="email-address"
                      autocomplete="off"
                      className="mt-1 block w-full outline-0 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                      {...register("address")}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-lg font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Lưu
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {status.isLoading && (
        <Status
          load={load}
          check={check}
          checked={1}
          onStatus={() => setStatus(false)}
        />
      )}
    </div>
  );
}

export default EditProfile;
