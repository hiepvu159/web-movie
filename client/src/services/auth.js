import axios from "axios";
import { logout } from "../redux/authSlice";

export const loginUser = async (user) => {
  const response = await axios.post(`/auth/login`, user);
  return response.data;
};

export const logoutUser = async (dispatch, navigate) => {
  dispatch(logout());
  navigate("/login");
};

export const registerUser = async (user) => {
  await axios.post(`/auth/register`, user);
};
