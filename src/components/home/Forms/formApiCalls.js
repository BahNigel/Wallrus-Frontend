import axios from "axios";

export const uploadDesign = async ({
  name,
  phoneNumber,
  application,
  product,
  width,
  height,
  unit,
  link,
  price,
  remark,
}) => {
  let formresponse;
  const formData = new FormData();
  formData.append("name", name);
  formData.append("phone_number", phoneNumber);
  formData.append("application", application);
  formData.append("product", product);
  formData.append("width", width);
  formData.append("height", height);
  formData.append("unit", unit);
  formData.append("link", link);
  formData.append("price", price);
  formData.append("remarks", remark);

  await axios
    .post(`${process.env.REACT_APP_ROOT_URL}/api/upload-own-design`, formData, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("Access_Key")}`,
      },
    })
    .then((res) => {
      formresponse = res.data;
    })
    .catch((err) => console.log("Could not upload your design", err));

  return formresponse;
};

export const customizeDesign = async ({
  name,
  phone,
  application,
  product,
  width,
  height,
  remark,
  unit,
  uploadImages,
}) => {
  let formresponse;
  const formData = new FormData();
  formData.append("name", name);
  formData.append("phone_number", phone);
  formData.append("application", application);
  formData.append("product", product);
  formData.append("width", width);
  formData.append("height", height);
  formData.append("remarks", remark);
  formData.append("unit", unit);
  formData.append("image1", uploadImages[0]);
  if (uploadImages[1]) formData.append("image2", uploadImages[1]);
  if (uploadImages[2]) formData.append("image3", uploadImages[2]);
  if (uploadImages[3]) formData.append("image4", uploadImages[3]);

  await axios
    .post(`${process.env.REACT_APP_ROOT_URL}/api/customize-design`, formData, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("Access_Key")}`,
      },
    })
    .then((res) => {
      formresponse = res.data;
    })
    .catch((err) => console.log("Error while Customizing design", err));

  return formresponse;
};

export const requestMeasurement = async ({
  name,
  line1,
  line2,
  state,
  city,
  pincode,
  smartDate,
  timeFrame,
  remark,
  siteImages,
}) => {
  let formresponse;
  const formData = new FormData();
  formData.append("name", name);
  formData.append("line1", line1);
  formData.append("line2", line2);
  formData.append("state", state);
  formData.append("city", city);
  formData.append("pincode", pincode);
  formData.append("date", smartDate);
  formData.append("timeframe_of_measurement", timeFrame);
  formData.append("remarks", remark);
  formData.append("site_image1", siteImages[0]);
  if (siteImages[1]) formData.append("site_image2", siteImages[1]);
  if (siteImages[2]) formData.append("site_image3", siteImages[2]);
  if (siteImages[3]) formData.append("site_image4", siteImages[3]);

  await axios
    .post(
      `${process.env.REACT_APP_ROOT_URL}/api/request-measurement`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("Access_Key")}`,
        },
      }
    )
    .then((res) => {
      formresponse = res.data;
    })
    .catch((err) => console.log("Error while sending request", err));

  return formresponse;
};

export const getApplications = async () => {
  let response;
  await axios
    .get(`${process.env.REACT_APP_ROOT_URL}/api/app-list/`)
    .then((res) => {
      // console.log('asdasd', res.data);
      response = res.data;
    })
    .catch((err) => console.log("Could not get the application-list", err));

  return response;
};

export const getProducts = async (application) => {
  let response;
  await axios
    .get(`${process.env.REACT_APP_ROOT_URL}/api/product-list/${application}`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("Access_Key")}`,
      },
    })
    .then((res) => {
      response = res.data;
    })
    .catch((err) => console.log("Could not get the product-list", err));

  return response;
};
