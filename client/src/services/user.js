import axios from "axios";
import { registerNewUser } from "../redux/registerSlice";

export const getUsers = async (setUsers, token) => {
  await axios
    .get(`/users`, {
      headers: {
        token: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setUsers(res.data);
    });
};
export const getUserById = async (setUser, id) => {
  await axios.get(`/users/find/${id}`).then((res) => setUser(res.data));
};

export const addNewUser = async (user, dispatch, navigate, setErrorMessage) => {
  const res = await dispatch(registerNewUser(user));
  if (res.error) {
    setErrorMessage(res.payload.response.data);
  } else navigate("/admin/user");
};

export const updateUser = async (user, token, id, navigate) => {
  await axios.put(`/users/${id}`, user, {
    headers: {
      token: `Bearer ${token}`,
    },
  });
  navigate("/admin/user");
  alert("Chỉnh sửa thông tin thành công ");
};
export const deleteUser = async (id, token) => {
  await axios.delete(`/users/${id}`, {
    headers: {
      token: `Bearer ${token}`,
    },
  });
};
export const getNewUser = async (setUsers) => {
  await axios
    .get(`/users/newuser`)
    .then((res) => {
      setUsers(res.data);
    })
    .catch((err) => console.log(err));
};

export const updateInfoUser = async (user, token, navigate) => {
  await axios.patch(`/users/update-info`, user, {
    headers: {
      token: `Bearer ${token}`,
    },
  });
  navigate("/profile");
};
