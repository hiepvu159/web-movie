import React, { useState } from "react";
import login from "../../assets/login.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { registerNewUser } from "../../redux/registerSlice";

function Register(props) {
  const navigate = useNavigate();

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
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onRegisterSubmit = async (e) => {
    const newUser = {
      name: e.name,
      username: e.username,
      password: e.password,
    };

    // await registerNewUser(newUser);
    // navigate("/login");
  };
  return (
    <div className="login">
      <div className="login-main">
        <div className="login-main-bg">
          <img src={login} className="bg" alt="pic" />
        </div>
        <div className="login-main-form">
          <p className="register-title">Đăng ký</p>
          <form onSubmit={handleSubmit(onRegisterSubmit)}>
            <div className="login-form">
              <input
                type="text"
                className="form-email"
                placeholder="Tên người dùng..."
                autoComplete="off"
                {...register("name")}
              />
              {errors.name && <p className="error">{errors.name?.message}</p>}
            </div>
            <div className="login-form">
              <input
                type="text"
                className="form-email"
                placeholder="Tên tài khoản"
                autoComplete="off"
                {...register("username")}
              />
              {errors.username && (
                <p className="error">{errors.username?.message}</p>
              )}
            </div>

            <div className="login-form">
              <input
                type="password"
                className="form-password"
                placeholder="Mật khẩu..."
                autoComplete="off"
                {...register("password")}
              />
              {errors.password && (
                <p className="error">{errors.password?.message}</p>
              )}
            </div>
            <div className="flex justify-between">
              <div className="action-login">
                <button className="btn-login">Đăng ký</button>
              </div>
              <Link to="/login">
                <div className="action-login">
                  <button className="btn-login">Quay về trang đăng ký</button>
                </div>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
