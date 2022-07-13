import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { deleteUser, getUsers } from "../../../services/user";

function ManageUser() {
  const [users, setUsers] = useState("");

  useEffect(() => {
    getUsers(setUsers);
    console.log(users);
  }, []);
  return (
    <div className="w-full">
      <div className="manage-movie-main">
        <div className="main-title">
          <span className="action-name">Quản lý</span>
          <Link to="/admin/user/create">
            <button className="btn-create">Tạo mới</button>
          </Link>
        </div>

        <div>
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left">
                    Tên người dùng{" "}
                  </StyledTableCell>
                  <StyledTableCell align="left">Email</StyledTableCell>
                  <StyledTableCell align="left">Admin</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {users.map((user) => (
                  <StyledTableRow key={user._id}>
                    <StyledTableCell align="left">{user.name}</StyledTableCell>
                    <StyledTableCell align="left">{user.email}</StyledTableCell>
                    <StyledTableCell align="left">
                      {user.isAdmin}
                    </StyledTableCell>

                    <StyledTableCell align="left">
                      <Link to={`/admin/user/edit/${user._id}`}>
                        <button>
                          <AiFillEdit className="icon-edit" />
                        </button>
                      </Link>
                      <button
                        onClick={() => {
                          deleteUser(user._id);
                          window.location.reload();
                        }}
                      >
                        <AiFillDelete className="icon-delete" />
                      </button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))} */}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default ManageUser;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
