import { Button, CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import validator from "validator";
import { useSelector } from "react-redux";
import { selectEmailNumber } from "../../redux/Slices/userSignUpSlice/userSignUpSlice";
import Input from "../input/input";
import Logo from "../../images/logo.svg";
import ChevronLeft from "../../images/chevron-left.svg";
import "./otp.scss";
import { requestOtp } from "../../apis/authApi";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Fade from "@material-ui/core/Fade";
import axios from "axios";

const Otp = (props) => {
  const [counter, setCounter] = useState(60);
  const [otp, setOtp] = useState(0);
  const [code, setCode] = useState(0);
  const [isOtpValid, setOtpValid] = useState(true);
  const [loader, setLoader] = useState(true);
  const emailNumber = useSelector(selectEmailNumber);
  const [msg, setMsg] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [state, setState] = React.useState({
    open: false,
    Transition: Fade,
  });

  const sendOtp = async () => {
    const choice = isEmail() ? "email" : "sms";
    const emailOrNumber = !isEmail() ? `+91${emailNumber}` : emailNumber;
    let formData = new FormData();
    formData.append("choice", choice);
    formData.append("value", emailOrNumber);
    let response;

    await axios
      .post(
        `${process.env.REACT_APP_ROOT_URL}/api/verify-email-phone/`,
        formData
      )
      .then((res) => {
        response = res.data;
        console.log(res.data);
      })
      .catch((err) => {
        console.log("OTP api issue", err);
        if (err.response?.data?.msg) {
          setMsg(err.response.data.msg);
          setErrorMessage("warning");
        }
      });

    return response;
  };

  useEffect(() => {
    sendOtp()
      .then((res) => {
        if (res) {
          setLoader(false);
          setOtp(res);
        }
      })
      .catch((err) => {
        setLoader(false);
        alert(`Couldn't send OTP to ${emailNumber}. Try again`);
        console.log("Error in sending OTP", err);
      });
  }, []);

  useEffect(() => {
    startCounter();
  });

  const isEmail = () => {
    if (validator.isEmail(emailNumber)) {
      return true;
    } else return false;
  };

  const resetCounter = () => {
    setCounter(60);
    startCounter();
  };

  const resendOtp = async () => {
    resetCounter();
    sendOtp()
      .then((res) => {
        if (res) {
          setLoader(false);
          setOtp(res);
        }
      })
      .catch((err) => {
        setLoader(false);
        // alert(`Couldn't send OTP to ${emailNumber}. Try again`);
        setState({ ...state, open: true });
        setMsg(`Couldn't send OTP to ${emailNumber}. Try again`);
        setErrorMessage("warning");
        console.log("Error in re-sending OTP", err);
      });
  };

  const verifyOtp = () => {
    const formData = new FormData();
    formData.append("otp_id", otp.otp_id);
    formData.append("otp", code);
    axios
      .post(`${process.env.REACT_APP_ROOT_URL}/api/validate-otp/`, formData)
      .then((res) => {
        if (res.data.msg && res.data.msg === "success") {
          setState({ ...state, open: true });
          setMsg("OTP verified successfully");
          setErrorMessage("success");
          setOtpValid(true);
          props.renderSignUp();
        } else {
          setOtpValid(false);
        }
      })
      .catch((e) => {
        console.log(e);
        alert("otp validation error");
      });
  };

  const startCounter = () => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  };

  const message = props.isEmail ? (
    <p>A 5-digit verification code is sent on {props.email}</p>
  ) : (
    <p>An OTP is sent on {props.phone} via message.</p>
  );

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setState({
      ...state,
      open: false,
    });
  };

  return (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{
          horizontal: "center",
          vertical: "top",
        }}
        TransitionComponent={state.Transition}
        open={state.open}
        autoHideDuration={2000}
        onClose={handleClose}
        key={state.Transition.name}
      >
        <Alert
          onClose={handleClose}
          severity={errorMessage}
          // sx={{ width: "100%" }}
        >
          {msg}
        </Alert>
      </Snackbar>
      <div>
        {loader ? (
          <div style={{ textAlign: "center", margin: "40vh auto" }}>
            <CircularProgress size={80} style={{ color: "#000" }} />
          </div>
        ) : (
          <>
            <img className="main-logo" src={Logo} alt="logo" />
            <div className="otp-wrapper">
              <Button
                variant="filled"
                className="width-auto btn-grey margin-y-40"
                onClick={props.prev}
              >
                <img src={ChevronLeft} alt="logo" />
              </Button>
              <div className="otp-content">
                <h2>Verify your {props.isEmail ? "Email" : "Phone Number"}</h2>
                {message}
                <Input
                  type="text"
                  placeholder="OTP"
                  className="margin-y-20 width-100"
                  onChange={(event) => setCode(event.target.value)}
                  error={!isOtpValid}
                  helperText={!isOtpValid ? "Please provide a valid OTP" : null}
                />
                <Button
                  variant="contained"
                  className="width-100 btn-filled margin-y-20"
                  onClick={verifyOtp}
                >
                  Verify
                </Button>
                {counter === 0 ? (
                  <p>
                    Didn't received OTP?{" "}
                    <span className="bold pointer" onClick={resendOtp}>
                      Resend OTP
                    </span>
                  </p>
                ) : (
                  <p>00:{counter}</p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </React.Fragment>
  );
};

export default Otp;
