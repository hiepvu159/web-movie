import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { deleteMovie, getMovies } from "../../../services/movie";
import "./Manage.css";
import { useSelector } from "react-redux";
import Dialog from "../../../components/Dialog";
import { Divider, Radio, Table } from "antd";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Disabled User",
    age: 99,
    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "5",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "6",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "7",
    name: "Disabled User",
    age: 99,
    address: "Sidney No. 1 Lake Park",
  },
]; // rowSelection object indicates the need for row selection

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === "Disabled User",
    // Column configuration not to be checked
    name: record.name,
  }),
};

function Manage() {
  const token = useSelector((state) => state.auth.currentUser.accessToken);
  const [selectionType, setSelectionType] = useState("checkbox");
  const [movies, setMovies] = useState([]);
  const [dialog, setDialog] = useState({
    isLoading: false,
  });
  const idMovieRef = useRef();
  const handleDialog = (isLoading) => {
    setDialog({
      isLoading,
    });
  };
  const handleDelete = (id) => {
    handleDialog(true);
    idMovieRef.current = id;
  };
  const confirmDelete = async (choose) => {
    if (choose) {
      await deleteMovie(idMovieRef.current, token);
      handleDialog("", false);
    } else {
      handleDialog("", false);
    }
  };
  useEffect(() => {
    getMovies(setMovies);
  }, [dialog.isLoading]);

  return (
    <div>
      <Radio.Group
        onChange={({ target: { value } }) => {
          setSelectionType(value);
        }}
        value={selectionType}
      >
        <Radio value="checkbox">Checkbox</Radio>
        <Radio value="radio">radio</Radio>
      </Radio.Group>

      <Divider />

      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
    </div>
    // <div className="w-full">
    //   <div className="manage-movie-main">
    //     <div className="main-title">
    //       <span className="action-name">Quản lý</span>
    //       <Link to="/admin/movie/create">
    //         <button className="btn-create">Tạo mới</button>
    //       </Link>
    //     </div>

    //     <div>
    //       <table className="movie-table">
    //         <thead className="table-head">
    //           <tr className="flex w-full">
    //             <th className="col-name">Tên phim</th>
    //             <th className="col-name">Thể loại</th>
    //             <th className="col-name">Loại phim</th>
    //             <th className="col-name">Năm</th>

    //             <th className="col-name action ">Action</th>
    //           </tr>
    //         </thead>
    //         <tbody className="table-body">
    //           {movies.map((movie) => (
    //             <tr className="flex w-full mb-4" key={movie._id}>
    //               <td className="col-item ">{movie.name}</td>
    //               <td className="col-item">{movie.category.join(", ")}</td>
    //               <td className="col-item">{movie.type}</td>
    //               <td className="col-item">{movie.year}</td>

    //               <td className="col-item">
    //                 <Link to={`/admin/movie/edit/${movie._id}`}>
    //                   <button>
    //                     <AiFillEdit className="icon-edit" />
    //                   </button>
    //                 </Link>
    //                 <button onClick={() => handleDelete(movie._id)}>
    //                   <AiFillDelete className="icon-delete" />
    //                 </button>
    //               </td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //       {dialog.isLoading && <Dialog onDialog={confirmDelete} />}
    //     </div>
    //   </div>
    // </div>
  );
}

export default Manage;
