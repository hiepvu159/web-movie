import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

Search.propTypes = {
  onSubmit: PropTypes.func,
};
Search.defaultProps = {
  onSubmit: null,
};
function Search(props) {
  const { onSubmit } = props;
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
    if (!onSubmit) return;
    const formValues = {
      searchTerm,
    };
    onSubmit(formValues);
  };
  return (
    <form className="search">
      <div className="search-form">
        <input
          type="search"
          id="default-search"
          className="search-box"
          placeholder="Điền tên phim muốn tìm kiếm. . . . "
          autoComplete="off"
          onChange={handleSearchTermChange}
        />
        <Link to="/results/movie">
          <button className="btn-search">Search</button>
        </Link>
      </div>
    </form>
  );
}

export default Search;
