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
    navigate("/admin/user");
  } else navigate("/");
};

export const registerUser = async (
  user,
  dispatch,
  navigate,
  setErrorMessage
) => {
  const res = await dispatch(registerNewUser(user));
  console.log(res);
  if (res.error) {
    setErrorMessage(res.payload.response.data);
  } else navigate("/login");
};
