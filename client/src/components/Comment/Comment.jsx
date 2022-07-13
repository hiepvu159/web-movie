import React from "react";
import PropTypes from "prop-types";

Comment.propTypes = {};

function Comment(props) {
  return (
    <div className="comment">
      <img
        src="https://lh3.googleusercontent.com/-oauOGfRGLBU/YkayObi8ECI/AAAAAAAA6uU/6hJIvhjz_74WHTMNvD7XRFdfiFK60tO1gCNcBGAsYHQ/s0/avatar-anime.jpg"
        alt="avatar"
        className="comment-user-avatar"
      />
      <div className="user-info">
        <div className="user-name">UserName</div>
        <div className="user-comment">1234567</div>
      </div>
    </div>
  );
}

export default Comment;
