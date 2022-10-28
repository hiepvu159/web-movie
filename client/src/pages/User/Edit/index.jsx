import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { createUser } from "../../../services/auth";
import { getUserById, updateUser } from "../../../services/user";

export default function CreateUser() {
  const currentUser = useSelector((s) => s.auth.currentUser);
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState([]);
  const [check, setCheck] = useState(false);

  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Vui lòng nhập tên người dùng")
      .max(20, "Tên người dùng tối đa 20 ký tự")
      .min(3, "Tên người dùng tối thiểu 3 ký tự"),
    phone: yup
      .string()
      .required("Vui lòng nhập tên người dùng")
      .max(11, "Số điện thoại đa 11 số")
      .min(10, "Số điện thoại thiểu 10 số"),
    email: yup.string().email(),
  });

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const callApi = async () => {
    await getUserById(setUser, id);
    setCheck(!check);
  };
  useEffect(() => {
    callApi();
  }, []);

  useEffect(() => {
    if (check) {
      let defaultValues = {};
      defaultValues.name = `${user?.name || ""} `;
      defaultValues.username = `${user?.username || ""}`;
      defaultValues.email = `${user?.email || ""}`;
      defaultValues.gender = `${user?.gender || ""}`;
      defaultValues.phone = `${user?.phone || ""}`;
      defaultValues.address = `${user?.address || ""}`;
      defaultValues.dob = `${user?.dob || ""}`;
      reset({ ...defaultValues });
    }
  }, [check]);

  const onRegisterSubmit = async (e) => {
    const user = {
      name: e.name,
      username: e.username,
      email: e.email,
      gender: e.gender,
      phone: e.phone,
      dob: e.date,
      address: e.address,
    };
    await updateUser(user, currentUser.accessToken, id, navigate);
  };
  return (
    <div className="w-full px-10">
      <div className="font-bold text-3xl py-5 pl-1 p">Tạo người dùng mới</div>

      <form onSubmit={handleSubmit(onRegisterSubmit)}>
        <div className="flex flex-col justify-between">
          <div className="flex justify-between">
            <div className="w-1/2 px-2">
              <div className="login-form">
                <label
                  for="name"
                  className="block   mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Tên
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Tên người dùng..."
                  autoComplete="off"
                  {...register("name")}
                />
                {errors.name && <p className="error">{errors.name?.message}</p>}
              </div>
              <div className="login-form">
                <label
                  for="userame"
                  className="block   mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Tài khoản người dùng
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Tên tài khoản"
                  disabled
                  autoComplete="off"
                  {...register("username")}
                />
                {errors.username && (
                  <p className="error">{errors.username?.message}</p>
                )}
                <div className="text-red-600">{errorMessage}</div>
              </div>
              <div className="login-form">
                <label
                  for="email"
                  className="block   mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Email
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Email"
                  autoComplete="off"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="error">{errors.email?.message}</p>
                )}
              </div>
              <div className="items-center">
                <label
                  for="Gender"
                  className="block   mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
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
            </div>
            <div className="w-1/2 px-2">
              <div className="login-form">
                <label
                  for="address"
                  className="block   mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Địa chỉ
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Địa chỉ"
                  autoComplete="off"
                  {...register("address")}
                />
                {errors.address && (
                  <p className="error">{errors.address?.message}</p>
                )}
              </div>
              <div className="login-form">
                <label
                  for="last-name"
                  className="block   mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Ngày sinh
                </label>
                <input
                  type="date"
                  name="last-name"
                  id="last-name"
                  autocomplete="off"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("dob")}
                />
                {errors.date && <p className="error">{errors.date?.message}</p>}
              </div>
              <div className="login-form">
                <label
                  for="phone"
                  className="block  mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Số điện thoại
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Số điện thoại"
                  autoComplete="off"
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="error">{errors.phone?.message}</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="action-login">
              <button className="btn-login">Lưu</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
