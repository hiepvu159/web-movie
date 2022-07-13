import React, { useState, useEffect } from "react";
import { gapi, loadAuth2 } from "gapi-script";
import { FcGoogle } from "react-icons/fc";

function ButtonGoogle() {
  const [user, setUser] = useState(null);

  useEffect((e) => {
    const setAuth2 = async () => {
      const auth2 = await loadAuth2(gapi, process.env.REACT_APP_CLIENT_ID, "");
      if (auth2.isSignedIn.get()) {
        updateUser(auth2.currentUser.get());
      } else {
        attachSignin(document.getElementById("google"), auth2);
      }
    };
    setAuth2();
  }, []);

  useEffect(() => {
    if (!user) {
      const setAuth2 = async () => {
        const auth2 = await loadAuth2(
          gapi,
          process.env.REACT_APP_CLIENT_ID,
          ""
        );
        attachSignin(document.getElementById("google"), auth2);
      };
      setAuth2();
    }
  }, [user]);

  const updateUser = (currentUser) => {
    const name = currentUser.getBasicProfile().getName();
    const profileImg = currentUser.getBasicProfile().getImageUrl();
    const email = currentUser.getBasicProfile().getEmail();
    setUser({
      name: name,
      profileImg: profileImg,
      email: email,
    });
  };

  const attachSignin = (element, auth2) => {
    auth2.attachClickHandler(
      element,
      {},
      (googleUser) => {
        updateUser(googleUser);
        console.log(googleUser);
      },
      (error) => {
        console.log(JSON.stringify(error));
      }
    );
  };

  return (
    <button id="google">
      <FcGoogle className="google-icon" />
    </button>
  );
}
export default ButtonGoogle;
