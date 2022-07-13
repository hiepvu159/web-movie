import React from "react";
import PropTypes from "prop-types";
import Comment from "../Comment";

CommentBox.propTypes = {};

function CommentBox(props) {
  return (
    <div className="comment-box">
      <div className="comment-title"> Bình luận</div>
      <div className="box">
        <div className="comment-form">
          <form action="submit" className="form-comment">
            <img
              src="https://lh3.googleusercontent.com/-oauOGfRGLBU/YkayObi8ECI/AAAAAAAA6uU/6hJIvhjz_74WHTMNvD7XRFdfiFK60tO1gCNcBGAsYHQ/s0/avatar-anime.jpg"
              alt="avatar"
              className="comment-user-avatar"
            />
            <textarea
              className="comment-text"
              name="comment"
              placeholder="Bình luận vào đây..."
            ></textarea>
            <button className="btn-post-cmt">Comment</button>
          </form>
        </div>
        <div className="list-comment">
          <Comment />
          <Comment />

          <Comment />

          <Comment />

          <Comment />

          <Comment />
        </div>
      </div>
    </div>
  );
}

export default CommentBox;
