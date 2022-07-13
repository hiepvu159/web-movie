import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import "./DropdownBox.css";

DropdownBox.propTypes = {};

function DropdownBox() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const getCategory = async () => {
      await axios
        .get(`/categories`, {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmQxOGFhODI4OTBjZjM3YTFiMGY3MSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NjU2OTk0MCwiZXhwIjoxNjU3MDAxOTQwfQ.Udp3GuQd_bY9DGpNePjW_rn8H1h3jctsI22Amj-F2e0",
          },
        })
        .then((res) => {
          setCategory(res.data);
        });
    };
    getCategory();
  }, []);

  return (
    <Select
      isMulti
      options={category}
      className="w-full z-10 mt-2"
      onChange={(e) => setCategory(e)}
    />
  );
}

export default DropdownBox;
