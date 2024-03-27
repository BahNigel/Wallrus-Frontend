import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import google from "../../images/google.svg";
import facebook from "../../images/facebook.svg";
import "./socialmediasignup.scss";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { useDispatch } from "react-redux";
import {
  setGoogleEmail,
  setGoogleFullName,
} from "../../redux/Slices/userSignUpSlice/userSignUpSlice";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Fade from "@material-ui/core/Fade";
import React, { useState } from "react";
import { googleLogin, facebookLogin } from "../../apis/socialLoginCall";
import axios from "axios";
import { useHistory } from "react-router-dom";

const SocialMediaSignUp = (props) => {
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [state, setState] = useState({
    open: false,
    Transition: Fade,
  });
  const history = useHistory();
  const dispatch = useDispatch();

  const fbResponse = (user) => {};

  const responseGoogle = (response) => {
    // console.log('GOOGLE', response);
    googleLogin(response.accessToken).then((res) => {
      if (res) {
        axios
          .get(`${process.env.REACT_APP_ROOT_URL}/api/social-user-details`, {
            headers: {
              Authorization: `Bearer ${res.access_token}`,
            },
          })
          .then((response) => response.data)
          .then((data) => {
            if (data.type && data.type != null) {
              history.push("/login");
            } else {
              props.setIsSocial({ ...data, access_token: res.access_token });
              props.handleNext();
            }
          })
          .catch((err) => {
            console.log("Error in fetching data, please reload the page.");
          });
      } else {
        // alert('Error Logging In');
        setState({ ...state, open: true });
        setMessage("Error Logging In");
        setErrorMessage("error");
      }
    });
  };

  // const responseGoogle = (response) => {

  //   dispatch(
  //     setGoogleEmail({
  //       email_aboutyou: response.profileObj.email
  //     }
  //     )
  //   )
  //   dispatch(
  //     setGoogleFullName(
  //       {
  //         fullName: response.profileObj.name
  //       }
  //     )
  //   )
  // }

  const responseGoogleError = (err) => {
    console.log(err);
  };

  const responseFacebook = (response) => {
    // console.log("FACEBOOK", response);
    facebookLogin(response.accessToken).then((res) => {
      if (res) {
        axios
          .get(`${process.env.REACT_APP_ROOT_URL}/api/social-user-details`, {
            headers: {
              Authorization: `Bearer ${res.access_token}`,
            },
          })
          .then((response) => response.data)
          .then((data) => {
            props.setIsSocial({ ...data, access_token: res.access_token });
            props.handleNext();
          })
          .catch((err) => {
            console.log("Error in fetching data, please reload the page.");
          });
      } else {
        // alert('Error Logging In');
        setState({ ...state, open: true });
        setMessage("Error Logging In");
        setErrorMessage("error");
      }
    });
  };

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
          horizontal: "right",
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
          {message}
        </Alert>
      </Snackbar>
      <>
        <Grid container spacing={2}>
          <Grid item sm={6} xs={12}>
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="Login with Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogleError}
              render={(renderProps) => (
                <Button
                  onClick={renderProps.onClick}
                  variant="contained"
                  className="googleBtn"
                >
                  <img src={google} alt="google" className="googleImg" />
                  <span className="span-left">Signup with Google</span>
                </Button>
              )}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <FacebookLogin
              appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID}
              fields="name,email,picture"
              callback={responseFacebook}
              render={(renderProps) => (
                <Button
                  onClick={renderProps.onClick}
                  variant="contained"
                  className="facebookBtn"
                >
                  <img src={facebook} alt="facebook" className="facebookImg" />
                  <span className="span-left">Signup with Facebook</span>
                </Button>
              )}
            />
          </Grid>
        </Grid>
        <div className="orContainer">
          <p className="or">
            <span>OR</span>
          </p>
        </div>
      </>
    </React.Fragment>
  );
};

export default SocialMediaSignUp;
