import axios from "axios";

export const requestOtp = async (formData) => {
  let response;
  await axios
    .post(`${process.env.REACT_APP_ROOT_URL}/api/verify-email-phone/`, formData)
    .then((res) => {
      response = res.data;
    })
    .catch((err) => console.log("OTP api issue", err));

  return response;
};
