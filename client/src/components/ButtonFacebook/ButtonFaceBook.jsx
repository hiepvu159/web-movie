import React from "react";
import PropTypes from "prop-types";
import ReactFacebookLogin from "react-facebook-login";
import { IoLogoFacebook } from "react-icons/io";

ButtonFaceBook.propTypes = {};

function ButtonFaceBook(props) {
  const responseFacebook = (response) => {
    console.log(response);
  };
  return (
    <div className="btn-login-social">
      <ReactFacebookLogin
        appId="719182669393033"
        autoLoad={false}
        fields="name,email,picture"
        cssClass="facebook-icon"
        icon={<IoLogoFacebook className="icon-facebook" />}
        textButton=""
        callback={responseFacebook}
      />
    </div>
  );
}

export default ButtonFaceBook;
