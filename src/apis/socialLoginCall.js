import axios from "axios";

export const googleLogin = async (token) => {
  let response;

  const googleData = {
    grant_type: "convert_token",
    client_id: process.env.REACT_APP_login_client_id,
    client_secret: process.env.REACT_APP_login_client_secret,
    backend: "google-oauth2",
    token: token,
  };

  const loginFormData = new FormData();
  Object.keys(googleData).forEach((key) =>
    loginFormData.append(key, googleData[key])
  );

  await axios
    .post(
      `${process.env.REACT_APP_ROOT_URL}/auth/convert-token/`,
      loginFormData
    )
    .then((res) => {
      response = res.data;
      let time = new Date().getTime();
      // console.log('Login Response', res);
      window.localStorage.setItem("Access_Key", res.data.access_token);
      window.localStorage.setItem(
        "Expire_Time",
        Number(res.data.expires_in) * 1000 + time
      );
      window.localStorage.setItem("Refresh_Key", res.data.refresh_token);
    })
    .catch((err) => console.log("Error", err));

  return response;
};

export const facebookLogin = async (token) => {
  let response;

  const facebookData = {
    grant_type: "convert_token",
    client_id: process.env.REACT_APP_login_client_id,
    client_secret: process.env.REACT_APP_login_client_secret,
    backend: "facebook",
    token: token,
  };

  const loginFormData = new FormData();
  Object.keys(facebookData).forEach((key) =>
    loginFormData.append(key, facebookData[key])
  );

  await axios
    .post(
      `${process.env.REACT_APP_ROOT_URL}/auth/convert-token/`,
      loginFormData
    )
    .then((res) => {
      response = res.data;
      let time = new Date().getTime();
      // console.log('Login Response', res);
      window.localStorage.setItem("Access_Key", res.data.access_token);
      window.localStorage.setItem(
        "Expire_Time",
        Number(res.data.expires_in) * 1000 + time
      );
      window.localStorage.setItem("Refresh_Key", res.data.refresh_token);
    })
    .catch((err) => console.log("Error", err));

  return response;
};
