import axios from "axios";

const token = localStorage.getItem("token");

export const getUsers = async (setUsers) => {
  await axios.get(`/users`).then((res) => {
    setUsers(res.data);
  });
};

export const deleteUser = async (id) => {
  await axios.delete(`/users/${id}`, {
    headers: {
      token: `Bearer ${token}`,
    },
  });
};
