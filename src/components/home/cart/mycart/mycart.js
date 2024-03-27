import "./mycart.scss";
import React, { useEffect, useRef, forwardRef } from "react";
import { Grid, Button, Divider, TextareaAutosize } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import ExpandMore from "@material-ui/icons/ExpandMore";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import userimg from "../../../../images/model.svg";
import add from "../../../../images/add.svg";
import tick from "../../../../images/shipped-green-tick.svg";
import design1 from "../../../../images/design1.svg";
import design2 from "../../../../images/design2.svg";
import design3 from "../../../../images/design3.svg";
import design4 from "../../../../images/design4.svg";
import Product1 from "../../../../images/product1.jpg";
import Product2 from "../../../../images/product2.jpg";
import Product3 from "../../../../images/product3.jpg";
import Close from "../../../../images/close.png";
import Slide from "@material-ui/core/Slide";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import collectionImg from "../../../../images/Addfile.svg";
import Rating from "../../../../images/rating.svg";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Arrow from "../../../../images/arrow-down.svg";
import Plus from "../../../../images/plus-btn.svg";
import Minus from "../../../../images/minus-btn.svg";
import Pencil from "../../../../images/edit-profile-icon.svg";
import Model from "../../../../images/model.svg";
import PlusWhite from "../../../../images/plus-white.svg";

import Design from "../../../../images/design1.svg";
import TextField from "@material-ui/core/TextField";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useState } from "react";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { getDecoratorFavourites } from "../../../../apis/apiCalls";
import ProductCard from "../../../product-card/product-card";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#FFFFFF",
  borderRadius: "16px",
  boxShadow: 24,
  border: "none",
  p: 0,
  width: "560px",
  height: "600px",
};
const InfoSvg = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_1401_21)">
        <path
          d="M7.99984 1.33329C4.31794 1.33329 1.33317 4.31806 1.33317 7.99996C1.33317 11.6819 4.31794 14.6666 7.99984 14.6666C11.6817 14.6666 14.6665 11.6819 14.6665 7.99996C14.6665 4.31806 11.6817 1.33329 7.99984 1.33329Z"
          stroke="#6E6E6E"
          stroke-width="1.33333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8 10.6666L8 7.99996"
          stroke="#6E6E6E"
          stroke-width="1.33333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8 5.33337L7.99375 5.33337"
          stroke="#6E6E6E"
          stroke-width="1.33333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1401_21">
          <rect
            width="16"
            height="16"
            fill="white"
            transform="translate(16 16) rotate(180)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
const CloseSvg = () => {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 6L6 18"
        stroke="#000000"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6 6L18 18"
        stroke="#000000"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
var formatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "RUP",
});

const AddFileIcon = (props) => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M20.419 14.732C20.419 18.31 18.31 20.419 14.732 20.419H6.95C3.363 20.419 1.25 18.31 1.25 14.732V6.932C1.25 3.359 2.564 1.25 6.143 1.25H8.143C8.861 1.251 9.537 1.588 9.967 2.163L10.88 3.377C11.312 3.951 11.988 4.289 12.706 4.29H15.536C19.123 4.29 20.447 6.116 20.447 9.767L20.419 14.732Z"
        stroke="#1B1918"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.48096 12.4629H14.481"
        stroke="#1B1918"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.8486 9.09521L10.8486 16.0952"
        stroke="#1B1918"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

const calc = (a, b, c) => {
  return a - b - c;
};
const FavouriteIcon = (props) => {
  return (
    <svg
      width="22"
      height="20"
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.87187 9.59832C0.798865 6.24832 2.05287 2.41932 5.56987 1.28632C7.41987 0.689322 9.46187 1.04132 10.9999 2.19832C12.4549 1.07332 14.5719 0.693322 16.4199 1.28632C19.9369 2.41932 21.1989 6.24832 20.1269 9.59832C18.4569 14.9083 10.9999 18.9983 10.9999 18.9983C10.9999 18.9983 3.59787 14.9703 1.87187 9.59832Z"
        stroke="#1B1918"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15 4.69995C16.07 5.04595 16.826 6.00095 16.917 7.12195"
        stroke="#1B1918"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
const useStyles = makeStyles((theme) => ({
  label: {
    color: "rgb(0, 0, 0)",
  },
}));

const InputTextField = withStyles({
  root: {
    "& input + fieldset": {
      borderWidth: 1,
      borderRadius: `12px 12px 12px 12px !important`,
    },
    "& input:focus + fieldset": {
      borderColor: "black !important",
    },
    "& label.Mui-focused": {
      color: "black",
    },
  },
})(TextField);

const MyCart = ({
  allCart,
  setUpdate,
  totalPrice,
  totalPrice2,
  setTotalPrice2,
  coins,
  userAddress,
  setUserAddress,
  paymentSuccess,
  setPaymentSuccess,
  hideMore,
  addressFill,
  setAddressFill,
  open2,
  setOpen2,
}) => {
  const classes = useStyles();
  const [showInstall, setShowInstall] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [applyCoins, setApplyCoins] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [couponData, setCouponData] = useState(null);
  const [couponLoaded, setCouponLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const [open3, setOpen3] = useState(false);
  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => setOpen3(false);
  const [couponValue, setCouponValue] = useState(0);
  const [couponUsed, setCouponUsed] = useState(false);
  const [couponActive, setCouponActive] = useState(true);
  const [couponNotFound, setCouponNotFound] = useState(false);

  const [couponApplied, setCouponApplied] = useState(false);
  const [couponOneTime, setCouponOneTime] = useState(false);

  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState({});
  const [email, setEmail] = useState("");
  const [desc, setDesc] = useState("");
  const [install, setInstall] = useState(false);
  const [age, setAge] = useState("");
  const [opens, setOpens] = useState(false);
  const [msg, setMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [favourites, setFavourites] = useState([]);
  const [shareCartData, setShareCartData] = useState(null);
  const [states, setStates] = useState({
    open: false,
    Transition: Slide,
  });
  const [shareEmail, setShareEmail] = useState("");
  const [shareDesc, setShareDesc] = useState("");

  const handleClicks = (Transition) => {
    setStates({
      open: true,
      Transition,
    });
  };
  function SlideTransition(props) {
    return <Slide {...props} direction="down" />;
  }
  const handleCloses = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setStates({
      ...states,
      open: false,
    });
  };
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const requestCart = (data) => {
    setEmail(data);
    handleOpen();
  };
  const handleShareClient = () => {
    if (email !== "") {
      var formdata = new FormData();
      formdata.append("contactKey", email);
      formdata.append("descriptionKey", desc);
      axios
        .post(`${process.env.REACT_APP_ROOT_URL}/api/share-cart/`, formdata, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(
              "Access_Key"
            )}`,
          },
        })
        .then((res) => {
          axios
            .get(`${process.env.REACT_APP_ROOT_URL}/api/share-cart/`, {
              headers: {
                Authorization: `Bearer ${window.localStorage.getItem(
                  "Access_Key"
                )}`,
              },
            })
            .then((res) => {
              setShareCartData(res.data);
              handleClose();
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
          handleClose();
        });
    } else {
      alert("Email is required");
    }
  };

  const handleAddressSave = () => {
    if (address1 !== "" && state !== "" && city !== "" && pincode !== "") {
      var newaddress = {
        address1: address1,
        address2: address2,
        state: state,
        city: city,
        pincode: pincode,
      };
      if (Object.keys(userAddress).length != 0) {
        const formdata = new FormData();
        formdata.append("pk", userAddress.pk);
        formdata.append("addressStreetAboutyouKey", address1.toString());
        formdata.append("addressApartmentAboutyouKey", address2.toString());
        formdata.append("addressCityAboutyouKey", city.toString());
        formdata.append("addressPincodeAboutyouKey", pincode);
        formdata.append("stateAboutyouKey", state.toString());
        formdata.append("addressTypeKey", "Shipping Address");

        axios
          .put(`${process.env.REACT_APP_ROOT_URL}/api/add-address`, formdata, {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem(
                "Access_Key"
              )}`,
            },
          })
          .then((res) => {
            console.log(res.data);
            console.log("success");
            setAddressFill(true);
            setUserAddress({
              pk: userAddress.pk,
              line1: newaddress.address1,
              line2: newaddress.address2,
              state: newaddress.state,
              city: newaddress.city,
              pincode: newaddress.pincode,
            });
          })
          .catch((err) => {
            console.log(err);
            alert("Something Went wrong");
          });
      } else {
        var newaddress = {
          address1: address1,
          address2: address2,
          state: state,
          city: city,
          pincode: pincode,
        };
        const formdata = new FormData();
        formdata.append("addressStreetAboutyouKey", address1.toString());
        formdata.append("addressApartmentAboutyouKey", address2.toString());
        formdata.append("addressCityAboutyouKey", city.toString());
        formdata.append("addressPincodeAboutyouKey", pincode);
        formdata.append("stateAboutyouKey", state.toString());
        formdata.append("addressTypeKey", "Shipping Address");
        axios
          .post(`${process.env.REACT_APP_ROOT_URL}/api/add-address`, formdata, {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem(
                "Access_Key"
              )}`,
            },
          })
          .then((res) => {
            console.log(res.data);
            console.log("success");
            setAddressFill(true);
            setUserAddress({
              line1: newaddress.address1,
              line2: newaddress.address2,
              state: newaddress.state,
              city: newaddress.city,
              pincode: newaddress.pincode,
            });
            setAddress({
              line1: newaddress.address1,
              line2: newaddress.address2,
              state: newaddress.state,
              city: newaddress.city,
              pincode: newaddress.pincode,
            });
            handleClose2();
          })
          .catch((err) => {
            console.log(err);
            alert("Something Went wrong");
          });
      }
    }
  };
  const handleClick = (slug) => {
    history.push(`/shop/${slug}`);
  };
  // const handleApplyCoins = (e) => {
  //   setApplyCoins(e.target.checked);
  //   if (e.target.checked && couponApplied) {
  //     var ntotal = Math.floor(totalPrice - coins - couponValue);
  //     setTotalPrice2(ntotal);
  //     alert("coin and coupon");
  //   }
  //   if (e.target.checked && !couponApplied) {
  //     var ntotal = totalPrice - coins;
  //     setTotalPrice2(ntotal);
  //     alert("coin ");
  //   }
  // };

  const handleApplyCoins = (e) => {
    setApplyCoins(e.target.checked);
    if (totalPrice > 0) {
      if (e.target.checked) {
        var pp = totalPrice - couponValue - coins;
        if (Math.sign(pp) === -1) setTotalPrice2(0);
        else setTotalPrice2(pp);
      }
      if (!e.target.checked && couponApplied) {
        var pp = totalPrice - couponValue;
        setTotalPrice2(pp);
      }
      if (!e.target.checked && !couponApplied) {
        setTotalPrice2(totalPrice);
      }
    }
  };
  function currencyFormat(num) {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  const applyCoupon = () => {
    setCouponLoaded(true);
    if (coupon !== "" || coupon !== null) {
      axios
        .get(
          `${process.env.REACT_APP_ROOT_URL}/api/coupon-details?code=${coupon}`,
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem(
                "Access_Key"
              )}`,
            },
          }
        )
        .then((res) => {
          setCouponData(res.data.reward_points);
          console.log(res.status);
          var cdata = res.data;
          setCouponLoaded(false);
          if (cdata.is_active) {
            if (cdata.is_onetime) {
              setCouponOneTime(true);
            }
            if ((cdata.is_onetime && !cdata.is_used) || !cdata.is_onetime) {
              if ((cdata.application_criteria = "substract")) {
                setCouponValue(cdata.off_value);
                setCouponApplied(true);

                var pp = totalPrice - cdata.off_value;
                setTotalPrice2(pp);
                if (applyCoins) {
                  var pp = totalPrice - cdata.off_value - coins;
                  setTotalPrice2(pp);
                }
              }
            }
            if (cdata.is_onetime && cdata.is_used) {
              setCouponUsed(true);
            }
          } else {
            setCouponActive(false);
          }
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data); // => the response payload
            if (err.response.data.msg == "Coupon already used") {
              setCouponUsed(true);
            }
            if (err.response.data.msg == "Coupon Code Not Found") {
              setCouponNotFound(true);
            }
          }
          setCouponLoaded(false);
        });
    }
  };
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_ROOT_URL}/api/decorator-favourites`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("Access_Key")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setFavourites(res.data);
      })
      .catch((err) => console.log("Error getting data", err));
  }, []);

  // const favourites = [
  //   {
  //     designName: "Art Decon1",
  //     applications: "Wallpaper",
  //     name: "Jassie Mario",
  //     image: design1,
  //   },
  //   {
  //     designName: "Art Decon2",
  //     applications: "Curtains",
  //     name: "Ronald Richards",
  //     image: design2,
  //   },
  //   {
  //     designName: "Art Decon3",
  //     applications: "Table cloth",
  //     name: "Leslie Alexander",
  //     image: design3,
  //   },
  //   {
  //     designName: "Art Decon4",
  //     applications: "Curtain blinds",
  //     name: "Savannah Nguyen",
  //     image: design4,
  //   },
  //   {
  //     designName: "Art Decon2",
  //     applications: "Curtains",
  //     name: "Ronald Richards",
  //     image: design2,
  //   },
  //   {
  //     designName: "Art Decon3",
  //     applications: "Table cloth",
  //     name: "Leslie Alexander",
  //     image: design3,
  //   },

  //   {
  //     designName: "Art Decon1",
  //     applications: "Wallpaper",
  //     name: "Jassie Mario",
  //     image: design1,
  //   },
  //   {
  //     designName: "Art Decon4",
  //     applications: "Curtain blinds",
  //     name: "Savannah Nguyen",
  //     image: design4,
  //   },
  // ];

  const productImages = [
    {
      image: Product1,
    },
    {
      image: Product2,
    },
    {
      image: Product3,
    },
  ];

  const reviewsAndRatings = [
    {
      profilePic: Model,
      name: "Savannah Nguyen",
      date: "23rd Jun 2021",
      rating: 4,
      review:
        "Charming & Brightening. I LOVE this shower curtain in my daughters’ bathroom. It’s a cheerful and sweet addition to the room.",
    },
    {
      profilePic: Model,
      name: "Dianne Russell",
      date: "15th Jun 2021",
      rating: 5,
      review:
        "Charming & Brightening. I LOVE this shower curtain in my daughters’ bathroom. It’s a cheerful and sweet addition to the room.",
    },
    {
      profilePic: Model,
      name: "Eleanor Pena",
      date: "28th May 2021",
      rating: 3,
      review:
        "Charming & Brightening. I LOVE this shower curtain in my daughters’ bathroom. It’s a cheerful and sweet addition to the room.",
    },
  ];

  const arrowClosed = (
    <img src={Arrow} alt="arrow-closed" className="arrow-closed" />
  );
  const arrowOpen = <img src={Arrow} alt="arrow-open" className="arrow-open" />;

  const materialTypes = ["Paper Backed", "Canvas Wallcovering"];
  const width = ["40", "50"];
  const height = ["60", "70"];
  const unit = ["MM", "IN."];

  const otherColorway = [
    {
      image: Design,
      name: "Blue",
    },
    {
      image: Design,
      name: "Red",
    },
    {
      image: Design,
      name: "Orange",
    },
    {
      image: Design,
      name: "Black",
    },
  ];

  const otherApplications = [
    {
      image: Design,
      name: "Curtain",
    },
    {
      image: Design,
      name: "Blinds",
    },
    {
      image: Design,
      name: "Cover",
    },
    {
      image: Design,
      name: "Wallpaper",
    },
  ];
  const moreByArtist = [
    {
      image: Design,
    },
    {
      image: Design,
    },
    {
      image: Design,
    },
    {
      image: Design,
    },
    {
      image: Design,
    },
    {
      image: Design,
    },
    {
      image: Design,
    },
    {
      image: Design,
    },
  ];
  const similarDesigns = [
    {
      image: Design,
      name: "Leslie Alexander",
      profilePic: Model,
    },
    {
      image: Design,
      name: "Devon Lane",
      profilePic: Model,
    },
    {
      image: Design,
      name: "Karthryn Murphy",
      profilePic: Model,
    },
    {
      image: Design,
      name: "Leslie Alexander",
      profilePic: Model,
    },
    {
      image: Design,
      name: "Karthryn Murphy",
      profilePic: Model,
    },
    {
      image: Design,
      name: "Devon Lane",
      profilePic: Model,
    },
    {
      image: Design,
      name: "Karthryn Murphy",
      profilePic: Model,
    },
    {
      image: Design,
      name: "Devon Lane",
      profilePic: Model,
    },
  ];

  const defaultMaterialType = materialTypes[0];
  const defaultWidth = width[0];
  const defaultHeight = height[0];
  const defaultUnit = unit[0];
  const history = useHistory();

  const [quantity, setQuantity] = useState(1);

  const handlePayment = (e) => {
    // history.push("/payment");
    setPaymentSuccess(true);
    var formData = new FormData();
    formData.append("amount", totalPrice2);
    formData.append("is_coins", applyCoins ? "YES" : "NO");
    formData.append("coins", applyCoins ? coins : "");
    formData.append("coupon_code", coupon ? coupon : "");
    if (totalPrice2 > 0 && addressFill) {
      axios
        .post(
          `${process.env.REACT_APP_ROOT_URL}/api/initiate-order`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem(
                "Access_Key"
              )}`,
            },
          }
        )
        .then((res) => {
          let data = res.data;
          if (data.amount) {
            let options = {
              key: data.api_key, // Enter the Key ID generated from the Dashboard
              amount: data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
              currency: "INR",
              name: "Wallrus",
              description: "Payment",
              order_id: data.order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
              handler: function (res) {
                let formdata = new FormData();
                formdata.append("razorpay_order_id", res.razorpay_order_id);
                formdata.append("razorpay_payment_id", res.razorpay_payment_id);
                formdata.append("razorpay_signature", res.razorpay_signature);
                formdata.append("amount", data.amount);
                formdata.append("shipping_address_id", userAddress.pk);
                formdata.append(
                  "is_installation_request",
                  install ? "YES" : "NO"
                );
                if (install) {
                  formdata.append("installation_name", "Test inst Name");
                  formdata.append("installation_phone", "7894561230");
                  formdata.append("installation_email", "test@mail.com");
                  formdata.append("installation_req_addr_id", "1");
                }

                formdata.append("is_coins", applyCoins ? "YES" : "NO");
                formdata.append("coins", coins);
                formdata.append("coupon_code", coupon ? coupon : "");
                for (let [key, value] of formdata) {
                  console.log(`${key}: ${value}`);
                }
                axios
                  .post(
                    `${process.env.REACT_APP_ROOT_URL}/api/place-order`,
                    formdata,
                    {
                      headers: {
                        Authorization: `Bearer ${window.localStorage.getItem(
                          "Access_Key"
                        )}`,
                      },
                    }
                  )
                  .then((res) => {
                    if (res.data.order_cost) {
                      setPaymentSuccess(false);
                      setStates({ ...states, open: true });
                      setMsg("Successfully purchased");
                      setErrorMsg("success");
                      setTimeout(() => {
                        history.push("/home");
                      }, 2000);
                    }
                  })
                  .catch((error) => {
                    setPaymentSuccess(false);
                    setStates({ ...states, open: true });
                    setMsg("Something went wrong, please try again");
                    setErrorMsg("error");
                  });
              },
              prefill: {
                name: "Gaurav Kumar",
                email: "gaurav.kumar@example.com",
                contact: "9999999999",
              },
              notes: {
                address: "Razorpay Corporate Office",
              },
              theme: {
                color: "#3399cc",
              },
            };
            var rzp1 = new Razorpay(options);
            rzp1.on("payment.failed", function (response) {
              setPaymentSuccess(false);
              setStates({ ...states, open: true });
              setMsg(`${response.error.code}`);
              setErrorMsg("error");
              setMsg(`${response.error.description}`);
              setErrorMsg("error");
            });
            setPaymentSuccess(true);
            rzp1.open();
          }
        })
        .catch((error) => {
          setPaymentSuccess(false);
          setMsg("Something went wrong, please try again");
          setErrorMsg("error");
        });
    } else {
      if (!addressFill) {
        handleOpen2();
      }
    }
  };

  const productDelete = (productId) => {
    axios
      .delete(
        `${process.env.REACT_APP_ROOT_URL}/api/add-to-cart/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(
              "Access_Key"
            )}`,
          },
        }
      )
      .then((res) => {
        setUpdate((update) => !update);
        setMsg("Product is removed from the cart");
        setErrorMsg("success");
        handleClicks();
        if (allCart.length === 1) {
          localStorage.setItem("cartStatus", "empty");
        }
      })
      .catch((err) => {
        console.log(err);
        setMsg("Something went wrong please try again");
        setErrorMsg("warning");
      });
  };

  const handleMaterialType = (materialType) => {
    console.log(materialType.value);
  };

  const addItem = () => {
    setQuantity(quantity + 1);
  };

  const reduceItem = () => {
    setQuantity(quantity - 1);
  };

  const requestInstall = (e) => {
    if (e.target.checked) {
      setInstall(true);
      setShowInstall(true);
    } else {
      setInstall(false);
    }
  };

  const cancelInstall = () => {
    document.querySelector(".install-check").click();
    setShowInstall(false);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_ROOT_URL}/api/share-cart/`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("Access_Key")}`,
        },
      })
      .then((res) => {
        setShareCartData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const shareClient = () => {
    if (shareEmail.length != 0 && shareDesc.length != 0) {
      //asfas
    } else {
      alert("All fields are required");
    }
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{
          horizontal: "center",
          vertical: "top",
        }}
        TransitionComponent={states.Transition}
        open={states.open}
        autoHideDuration={2000}
        onClose={handleCloses}
        // key={states.Transition.name}
      >
        <Alert
          onClose={handleCloses}
          severity={errorMsg}
          sx={{ width: "100%" }}
        >
          {msg}
        </Alert>
      </Snackbar>
      <div className="mycart">
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} style={{ maxWidth: "calc(100% - 2rem)" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "20px 25px 0px 25px",
                height: "auto",
              }}
            >
              <span className="formLabel">Share with client</span>
              <span onClick={handleClose}>
                <CloseSvg />
              </span>
            </div>
            <div className="install" style={{ height: "auto" }}>
              <TextField
                style={{
                  border: "1px solid #DCDCDC",
                  borderRadius: "12px 12px 0px 0px",
                }}
                className="inputRounded"
                label="Email or phone number"
                type="text"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                InputLabelProps={{
                  style: {
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: "18px",
                    lineHeight: "24px",
                    display: "flex",
                    alignItems: "center",
                    color: "#1b1918",
                  },
                }}
              />
              <textarea
                style={{
                  border: "1px solid #DCDCDC",
                  borderRadius: "12px 12px 0px 0px",
                  width: "100%",
                  height: "280px",
                }}
                maxRows={4}
                aria-label="maximum height"
                placeholder="Description (optional)"
                className="textArea"
                value={desc}
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
              />

              <div className="buttons">
                <Button
                  style={{ background: "black", color: "white" }}
                  onClick={() => handleShareClient()}
                >
                  Share
                </Button>
              </div>
            </div>
          </Box>
        </Modal>

        <Modal
          open={open2}
          onClose={handleClose2}
          aria-labelledby="modal-modal-title2"
          aria-describedby="modal-modal-description2"
        >
          <Box sx={style} style={{ maxWidth: "calc(100% - 2rem)" }}>
            <div style={{ padding: "20px 25px 0px 25px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "20px 12px 0px 12px",
                }}
              >
                <span className="formLabel">New address</span>
                <span onClick={handleClose2} style={{ cursor: "pointer" }}>
                  <CloseSvg />
                </span>
              </div>

              <div className="textBox">
                <TextField
                  style={{
                    border: "1px solid #DCDCDC",
                    borderRadius: "12px 12px 0px 0px",
                  }}
                  className="inputRounded"
                  label="Address"
                  type="text"
                  variant="outlined"
                  value={address1}
                  onChange={(e) => {
                    setAddress1(e.target.value);
                  }}
                  fullWidth
                  InputLabelProps={{
                    style: {
                      fontStyle: "normal",
                      fontWeight: "500",
                      fontSize: "18px",
                      lineHeight: "24px",
                      display: "flex",
                      alignItems: "center",
                      color: "#1b1918",
                    },
                  }}
                />
                <span className="textAddress">
                  <InfoSvg />
                  <span style={{ paddingLeft: "5px" }}>
                    Street address or P.O box
                  </span>
                </span>
              </div>
              <div className="textBox">
                <TextField
                  style={{
                    border: "1px solid #DCDCDC",
                    borderRadius: "12px 12px 0px 0px",
                  }}
                  className="inputRounded"
                  label="Address"
                  type="text"
                  variant="outlined"
                  value={address2}
                  onChange={(e) => {
                    setAddress2(e.target.value);
                  }}
                  fullWidth
                  InputLabelProps={{
                    style: {
                      fontStyle: "normal",
                      fontWeight: "500",
                      fontSize: "18px",
                      lineHeight: "24px",
                      display: "flex",
                      alignItems: "center",
                      color: "#1b1918",
                    },
                  }}
                />
                <span className="textAddress">
                  <InfoSvg />
                  <span style={{ paddingLeft: "5px" }}>
                    Apartment, unit, building, floor
                  </span>
                </span>
              </div>
              <div className="textBox">
                <TextField
                  style={{
                    border: "1px solid #DCDCDC",
                    borderRadius: "12px 12px 0px 0px",
                  }}
                  className="inputRounded"
                  label="State"
                  type="text"
                  variant="outlined"
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                  }}
                  fullWidth
                  InputLabelProps={{
                    style: {
                      fontStyle: "normal",
                      fontWeight: "500",
                      fontSize: "18px",
                      lineHeight: "24px",
                      display: "flex",
                      alignItems: "center",
                      color: "#1b1918",
                    },
                  }}
                />
              </div>
              <div
                className="textBox"
                style={{ width: "100%", display: "flex" }}
              >
                <div style={{ width: "50%", marginRight: "5px" }}>
                  <TextField
                    style={{
                      border: "1px solid #DCDCDC",
                      borderRadius: "12px 12px 0px 0px",
                    }}
                    className="inputRounded"
                    label="City"
                    type="text"
                    variant="outlined"
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                    fullWidth
                    InputLabelProps={{
                      style: {
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "18px",
                        lineHeight: "24px",
                        display: "flex",
                        alignItems: "center",
                        color: "#1b1918",
                      },
                    }}
                  />
                </div>
                <div style={{ width: "50%", marginLeft: "5px" }}>
                  <TextField
                    style={{
                      border: "1px solid #DCDCDC",
                      borderRadius: "12px 12px 0px 0px",
                    }}
                    className="inputRounded"
                    label="Pincode"
                    type="text"
                    variant="outlined"
                    value={pincode}
                    onChange={(e) => {
                      setPincode(Number(e.target.value));
                    }}
                    fullWidth
                    InputLabelProps={{
                      style: {
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "18px",
                        lineHeight: "24px",
                        display: "flex",
                        alignItems: "center",
                        color: "#1b1918",
                      },
                    }}
                  />
                </div>
              </div>
              <div className="textBox">
                <Divider />
                <div className="buttons" style={{ marginTop: "20px" }}>
                  <Button
                    style={{
                      background: "#1B1918",
                      color: "white",
                      width: "50%",
                    }}
                    onClick={() => handleAddressSave()}
                  >
                    Save address
                  </Button>
                </div>
              </div>
            </div>
          </Box>
        </Modal>

        <Grid className="mycart-container" container spacing={hideMore ? 0 : 2}>
          <Grid
            item
            xs={12}
            sm={12}
            md={hideMore ? 12 : 8}
            lg={hideMore ? 12 : 8}
          >
            {!hideMore && (
              <Grid className="my-cart-left-container-address">
                <div className="address-header">
                  <p>Deliver to:</p>
                  <span
                    onClick={() => {
                      // setShowAddAddress(true);
                      handleOpen2();
                      // handleAddressChange
                    }}
                  >
                    <img src={add} /> Add new address
                  </span>
                </div>
                <div>
                  <p>
                    {userAddress && userAddress.line1 != undefined
                      ? `${userAddress.line1}, ${userAddress.line2}, ${userAddress.city}, ${userAddress.state}, ${userAddress.pincode}`
                      : `${address1} ${address2} ${city} ${state} ${pincode}`}
                  </p>
                </div>
              </Grid>
            )}
            {allCart.map((item, i) => (
              <Grid
                key={i}
                className="mycart-left-container-products"
                container
              >
                <Grid item lg={5} md={12} sm={12} xs={12}>
                  <img
                    style={{
                      maxWidth: "280px",
                      borderRadius: "12px",
                      height: "280px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: "10px auto",
                    }}
                    className="product-img"
                    src={`${process.env.REACT_APP_ROOT_URL}${item.product.productimages_set[0]?.images}`}
                  />
                </Grid>

                <Grid lg={7} md={12} sm={12} xs={12}>
                  <div className="mycart-details-container">
                    <div className="mycart-name-container">
                      <div className="mycart_name">
                        <p>{item.product.design_name}</p>
                      </div>
                    </div>
                    <div className="my-cart-artist-name">
                      <span className="artistName">
                        by {item.product.artist}
                      </span>
                    </div>
                    <div className="my-cart-rating-container">
                      <img src={Rating} alt="rating" />
                      <span className="product-rating">
                        {item.product.ratings}({item.product.number_of_ratings})
                      </span>
                    </div>
                    <div className="my-cart-material-type-container">
                      <span
                        style={{
                          fontstyle: "normal",
                          fontWeight: "600",
                          fontSize: "14px",
                          lineHeight: "20px",
                          marginBottom: "5px",
                          display: "flex",
                          alignItems: "center",
                          letterSpacing: "0.06em",

                          color: " #1B1918",
                        }}
                      >
                        MATERIAL TYPE
                      </span>
                      {/* <Dropdown
                      arrowClosed={arrowClosed}
                      arrowOpen={arrowOpen}
                      options={materialTypes}
                      onChange={handleMaterialType}
                      value={defaultMaterialType}
                      placeholder="Select a material type"
                    /> */}
                      <TextField
                        id="outlined-basic"
                        hiddenLabel
                        variant="outlined"
                        value={item.material}
                        size="small"
                        aria-readonly
                        inputProps={{
                          readOnly: true,
                          fontWeight: "600",
                          fontSize: "16px",
                          lineHeight: "24px",
                          display: "flex",
                          alignItems: "center",
                          color: "#000000",
                        }}
                        InputLabelProps={{
                          fontWeight: "600",
                          fontSize: "16px",
                          lineHeight: "24px",
                          display: "flex",
                          alignItems: "center",
                          color: "#000000",
                        }}
                        sx={{ outline: "none" }}
                      />
                    </div>
                    <Grid
                      container
                      spacing={1}
                      className="my-cart-material-dimensions-container"
                    >
                      <Grid item xs={4} className="my-cart-material-width">
                        <p
                          style={{
                            fontstyle: "normal",
                            fontWeight: "600",
                            fontSize: "14px",
                            lineHeight: "20px",
                            marginBottom: "5px",
                            display: "flex",
                            alignItems: "center",
                            letterSpacing: "0.06em",

                            color: " #1B1918",
                          }}
                        >
                          WIDTH
                        </p>
                        <TextField
                          id="outlined-basic"
                          hiddenLabel
                          variant="outlined"
                          value={item.width}
                          size="small"
                          aria-readonly
                          inputProps={{ readOnly: true }}
                          sx={{ outline: "none" }}
                        />
                      </Grid>
                      <Grid item xs={4} className="my-cart-material-height">
                        <p
                          style={{
                            fontstyle: "normal",
                            fontWeight: "600",
                            fontSize: "14px",
                            lineHeight: "20px",
                            marginBottom: "5px",
                            display: "flex",
                            alignItems: "center",
                            letterSpacing: "0.06em",

                            color: " #1B1918",
                          }}
                        >
                          HEIGHT
                        </p>
                        <TextField
                          id="outlined-basic"
                          hiddenLabel
                          variant="outlined"
                          value={item.height}
                          size="small"
                          aria-readonly
                          inputProps={{ readOnly: true }}
                          sx={{ outline: "none" }}
                        />
                      </Grid>
                      <Grid item xs={4} className="my-cart-material-unit">
                        <p
                          style={{
                            fontstyle: "normal",
                            fontWeight: "600",
                            fontSize: "14px",
                            lineHeight: "20px",
                            marginBottom: "5px",
                            display: "flex",
                            alignItems: "center",
                            letterSpacing: "0.06em",

                            color: " #1B1918",
                          }}
                        >
                          UNIT
                        </p>
                        <TextField
                          id="outlined-basic"
                          hiddenLabel
                          variant="outlined"
                          value={item.unit}
                          size="small"
                          aria-readonly
                          inputProps={{ readOnly: true }}
                          sx={{ outline: "none" }}
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      spacing={5}
                      className="my-cart-quantity-price-container"
                    >
                      <Grid
                        item
                        xs={6}
                        className="my-cart-material-quantity-container"
                      >
                        <p
                          style={{
                            fontstyle: "normal",
                            fontWeight: "600",
                            fontSize: "14px",
                            lineHeight: "20px",
                            marginBottom: "5px",
                            display: "flex",
                            alignItems: "center",
                            letterSpacing: "0.06em",

                            color: " #1B1918",
                          }}
                        >
                          QUANTITY
                        </p>
                        <div className="my-cart-material-quantity">
                          <TextField
                            id="outlined-basic"
                            hiddenLabel
                            variant="outlined"
                            value={item.quantity}
                            size="small"
                            aria-readonly
                            inputProps={{ readOnly: true }}
                            sx={{ outline: "none" }}
                          />
                        </div>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        className="my-cart-material-price-container"
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            alignItems: "flex-start",
                            justifyContent: "flex-start",
                          }}
                        >
                          <p
                            style={{
                              fontstyle: "normal",
                              fontWeight: "600",
                              fontSize: "14px",
                              lineHeight: "20px",
                              marginBottom: "5px",
                              display: "flex",
                              alignItems: "center",
                              letterSpacing: "0.06em",

                              color: " #1B1918",
                            }}
                          >
                            PRICE
                          </p>
                          <span className="my-cart-material-price">
                            &#8377; {currencyFormat(item.price)}
                            <span className="tax">inclusive all taxes</span>
                          </span>
                        </div>
                      </Grid>
                    </Grid>
                    {/* <Grid item className="my-cart-delivery">
                    <img src={tick} />
                    <p>
                      Delivery by <span>7 Jul 2021</span>
                    </p>
                  </Grid> */}
                  </div>
                </Grid>

                <Grid xs={12}>
                  <Divider sx={{ width: "100%" }} />
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "14px",
                        lineHeight: "20px",
                        display: "flex",
                        alignItems: "center",
                        textAlign: " right",
                        color: "#6f6f6f",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        productDelete(item.id);
                      }}
                    >
                      REMOVE
                    </span>

                    <div style={{ display: "flex" }}>
                      <Button>
                        <AddFileIcon />
                      </Button>
                      <Button>
                        <FavouriteIcon />
                      </Button>
                    </div>
                  </div>
                </Grid>
              </Grid>
            ))}
          </Grid>
          {!hideMore && (
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <div className="mycart-left-container">
                <div className="mycart-coupon">
                  <p>Coupon</p>
                  <div className="mycart-coupon-content">
                    <InputTextField
                      value={coupon}
                      onChange={(e) => {
                        setCoupon(e.target.value);
                      }}
                      id="coupon"
                      className="input"
                      placeholder="Enter Coupon code"
                      variant="outlined"
                      fullWidth
                      InputLabelProps={{
                        classes: {
                          root: classes.label,
                        },
                      }}
                    />
                    <Button variant="outlined" onClick={applyCoupon}>
                      {couponLoaded ? <CircularProgress /> : ""} Apply
                    </Button>
                  </div>
                  <span style={{ color: "red" }}>
                    {!couponActive && "Coupon is not active"}
                    {couponUsed && couponOneTime && "This coupon already used"}
                    {couponNotFound && "Coupon Code Not Found"}
                  </span>
                  <span
                    style={{
                      color: "green",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <span> {couponApplied && "Coupon Applied"}</span>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setCouponApplied(false);

                        if (applyCoins) {
                          var pp = totalPrice2 + couponValue;
                          setTotalPrice2(pp);
                        }
                        if (!applyCoins) {
                          var pp = totalPrice2 + couponValue;
                          setTotalPrice2(pp);
                        }
                        setCouponValue(0);
                      }}
                    >
                      {couponApplied && <CloseSvg />}
                    </span>
                  </span>
                </div>
                <div className="mycart-wallrus">
                  <p>Use Wallrus coins</p>
                  <FormControl
                    component="fieldset"
                    className="checkbox-container"
                  >
                    <FormGroup aria-label="position" row>
                      <FormControlLabel
                        value="coins"
                        control={
                          <Checkbox
                            color="black"
                            onChange={handleApplyCoins}
                            checked={applyCoins}
                          />
                        }
                        label={
                          <span className="checkbox-coins">
                            You’ve {coins} wallrus coins.{" "}
                          </span>
                        }
                        labelPlacement="end"
                      />
                    </FormGroup>
                  </FormControl>
                </div>
                <div className="mycart-price-details">
                  <p>Price Details (3)</p>
                  <div className="mycart-price-details-content">
                    <div>
                      <p>Total MRP</p>
                      {applyCoins && <p>Wallrus Coins</p>}
                      {couponApplied && <p>Coupon Discount</p>}
                    </div>
                    <div>
                      <p>&#8377;{totalPrice}</p>
                      <p className="wallrus-coins-green">
                        {applyCoins && `-₹` + coins}
                      </p>
                      <p className="wallrus-coins-green">
                        {couponApplied && `-₹` + couponValue}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mycart-total">
                  <div className="mycart-total-content">
                    <div>
                      <p>Total amount</p>
                    </div>
                    <div>
                      <p>
                        &#8377;
                        {totalPrice2}
                      </p>
                    </div>
                  </div>
                  <FormControl
                    component="fieldset"
                    className="checkbox-container"
                  >
                    <FormGroup aria-label="position" row>
                      <FormControlLabel
                        value="coins"
                        control={
                          <Checkbox
                            className="install-check"
                            color="black"
                            // onChange={(e) => {
                            //   setShowInstall(e.target.checked);
                            // }}
                          />
                        }
                        label={
                          <span className="checkbox-coins">
                            Request installation support.{" "}
                          </span>
                        }
                        labelPlacement="end"
                        onChange={requestInstall}
                      />
                    </FormGroup>
                  </FormControl>
                  <Button onClick={handlePayment}>Place Order</Button>
                </div>
                <div className="mycart-purchasing-client">
                  <p>Purchasing for client</p>
                  <p className="sub">
                    A link will be shared with client where he can make the
                    payment and place order.
                  </p>

                  <Button
                    variant="outlined"
                    onClick={handleOpen}
                    style={{ marginBottom: "1rem" }}
                  >
                    Share with new client
                  </Button>
                  {shareCartData?.length != 0 && (
                    <>
                      <FormControl fullWidth sx={{ position: "relative" }}>
                        <Button variant="outlined">
                          Share with existing client
                        </Button>

                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={age}
                          label="Age"
                          onChange={handleChange}
                          style={{
                            position: "absolute",
                            color: "rgba(0,0,0,0)",
                            width: "100%",
                          }}
                          IconComponent={ExpandMore}
                        >
                          {shareCartData?.map((item, i) => (
                            <MenuItem
                              onClick={() => {
                                requestCart(item?.client.contact);
                              }}
                              key={i}
                              value={item?.client.id}
                            >
                              {item?.client.contact}
                            </MenuItem>
                          ))}
                        </Select>
                        <style>
                          {`
                        fieldset{
                          border: none !important;
                          outline: none !important;
                        }
                      `}
                        </style>
                      </FormControl>
                    </>
                  )}
                </div>
              </div>
            </Grid>
          )}
        </Grid>
        {!hideMore && (
          <>
            <h3 className="favourites-header">Add more from your favourites</h3>
            <Grid
              container
              spacing={2}
              justifyContent="flex-end"
              direction="row"
              style={{ marginTop: "2.6%", paddingLeft: "0px" }}
            >
              <div className="fav-design-grid">
                {favourites.map((item, index) => (
                  <div
                    style={{ width: "280px" }}
                    onClick={() => handleClick(item.slug)}
                  >
                    <ProductCard
                      width={400}
                      key={item.sku}
                      id={item.slug}
                      sku={item.sku}
                      designImage={`${process.env.REACT_APP_ROOT_URL}${item.image}`}
                      artist={item.artist_unique_id}
                      designerImage={`${process.env.REACT_APP_ROOT_URL}${item.artist_image}`}
                      designerName={item.artist}
                      // isFavourite={true}
                      // shouldRemoveFavourite
                      // removeFavourite={() => removeFavourite(item.sku)}

                      general
                    />
                  </div>
                ))}
              </div>
            </Grid>
          </>
        )}
      </div>
    </>
  );
};

export default MyCart;
