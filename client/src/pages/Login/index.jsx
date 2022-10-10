import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import login from "../../assets/login.png";
import { loginUser } from "../../services/auth";
import "./Login.css";

function Login() {
  const schema = yup.object().shape({
    username: yup
      .string()
      .required("Vui lòng nhập username")
      .max(16, "Tên tài khoản tối đa 16 ký tự")
      .min(5, "Tên tài khoản tối thiểu 5 ký tự"),
    password: yup
      .string()
      .required("Vui lòng nhập mật khẩu")
      .max(20, "Mật khẩu tối đa 20 ký tự")
      .min(6, "Mật khẩu tối thiểu 6 kí tự"),
  });
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLoginSubmit = async (e) => {
    const user = {
      username: e.username,
      password: e.password,
    };
    await loginUser(user, dispatch, navigate, setErrorMessage);
  };
  return (
    <div className="login">
      <div className="login-main">
        <div className="login-main-bg">
          <img src={login} className="bg" alt="Sample" />
        </div>
        <div className="login-main-form">
          <form onSubmit={handleSubmit(onLoginSubmit)}>
            <div className="separate">
              <p className="separate-text">Đăng nhập</p>
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
            <div className="text-red-600 font-bold mb-2">{errorMessage}</div>
            <div className="action-login">
              <button
                className="px-7 py-3 bg-black text-white font-medium text-sm rounded shadow-md hover:bg-red-500"
                type="submit"
              >
                Đăng nhập
              </button>
              <p className="login-text">
                Bạn chưa có tài khoản?
                <Link to="/register" className="login-register">
                  Đăng ký ngay
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
