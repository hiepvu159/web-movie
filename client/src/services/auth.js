import { getUser, logout } from "../redux/authSlice";
import { registerNewUser } from "../redux/registerSlice";

export const logoutUser = (dispatch, navigate) => {
  dispatch(logout());
  navigate("/login");
};

export const loginUser = async (user, dispatch, navigate, setErrorMessage) => {
  const res = await dispatch(getUser(user));
  if (res.error) {
    setErrorMessage(res.payload.response.data);
  } else if (res.payload.isAdmin) {
    navigate("/");
  } else navigate("/");
};

export const registerUser = async (
  user,
  dispatch,
  navigate,
  setErrorMessage
) => {
  const res = await dispatch(registerNewUser(user));
  if (res.error) {
    setErrorMessage(res.payload.response.data);
  } else {
    alert("Đăng ký tài khoản thành công");
    navigate("/login");
  }
};

export const createUser = async (user, dispatch, navigate, setErrorMessage) => {
  const res = await dispatch(registerNewUser(user));
  if (res.error) {
    setErrorMessage(res.payload.response.data);
  } else navigate("/admin/user");
};
