import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../../services/auth";

export default function CreateUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const schema = yup.object().shape({
    username: yup
      .string()
      .required("Vui lòng nhập tên tài khoản")
      .max(16, "Tên tài khoản tối đa 16 ký tự")
      .min(5, "Tên tài khoản tối thiểu 5 ký tự"),
    name: yup
      .string()
      .required("Vui lòng nhập tên người dùng")
      .max(20, "Tên người dùng tối đa 20 ký tự")
      .min(3, "Tên người dùng tối thiểu 3 ký tự"),
    password: yup
      .string()
      .required("Vui lòng nhập mật khẩu")
      .max(20, "Mật khẩu tối đa 20 ký tự")
      .min(6, "Mật khẩu tối thiểu 6 kí tự"),
    confirmPassword: yup
      .string()
      .required("Vui lòng nhập mật khẩu")
      .max(20, "Mật khẩu tối đa 20 ký tự")
      .min(6, "Mật khẩu tối thiểu 6 kí tự")
      .oneOf([yup.ref("password")], "Xác nhận mật khẩu không chính xác"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onRegisterSubmit = async (e) => {
    const user = {
      name: e.name,
      username: e.username,
      password: e.password,
      email: e.email,
      gender: e.gender,
      phone: e.phone,
      dob: e.date,
      address: e.address,
    };
    console.log(user);
    await createUser(user, dispatch, navigate, setErrorMessage);
  };
  return (
    <div className="w-full px-10">
      <div className="font-bold text-3xl py-5 pl-1 p">Tạo người dùng mới</div>

      <form onSubmit={handleSubmit(onRegisterSubmit)}>
        <div className="flex flex-col justify-between">
          <div className="flex justify-between">
            <div className="w-1/2 px-2">
              <div className="login-form">
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
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Tên tài khoản"
                  autoComplete="off"
                  {...register("username")}
                />
                {errors.username && (
                  <p className="error">{errors.username?.message}</p>
                )}
                <div className="text-red-600">{errorMessage}</div>
              </div>
              <div className="login-form">
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
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Địa chỉ"
                  autoComplete="off"
                  {...register("address")}
                />
                {errors.email && (
                  <p className="error">{errors.email?.message}</p>
                )}
              </div>
              <div className="login-form">
                <input
                  type="date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Ngày sinh"
                  autoComplete="off"
                  {...register("date")}
                />
                {errors.date && <p className="error">{errors.date?.message}</p>}
              </div>
              <div className="login-form">
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
              <div className="login-form">
                <input
                  type="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Mật khẩu..."
                  autoComplete="off"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="error">{errors.password?.message}</p>
                )}
              </div>
              <div className="login-form">
                <input
                  type="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Xác nhận mật khẩu..."
                  autoComplete="off"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p className="error">{errors.confirmPassword?.message}</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="action-login">
              <button className="btn-login">Đăng ký</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
