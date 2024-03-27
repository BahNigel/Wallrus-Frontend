import React, { useState, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../apis/AuthContext";
import google from "../../images/google.svg";
import facebook from "../../images/facebook.svg";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GoogleLogin from "react-google-login";
import { googleLogin, facebookLogin } from "../../apis/socialLoginCall";
import "./socialmedialogin.scss";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Fade from "@material-ui/core/Fade";
import { getDecoratorSnippet } from "../../apis/apiCalls";
import axios from "axios";

const SocialMediaLogIn = (props) => {
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [state, setState] = React.useState({
    open: false,
    Transition: Fade,
  });
  const { setIsAuth, setIsArtist } = useContext(AuthContext);
  const history = useHistory();

  const responseGoogleError = (err) => {
    console.log(err);
  };
  const responseGoogle = (response) => {
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
              if (data.type == "Firm") {
                window.location.replace("https://firm.thewallruscompany.com/");
              } else {
                let time = new Date().getTime();
                window.localStorage.setItem("Access_Key", res.access_token);
                window.localStorage.setItem(
                  "Expire_Time",
                  Number(res.expires_in) * 1000 + time
                );
                window.localStorage.setItem("Refresh_Key", res.refresh_token);
                window.localStorage.setItem("User_Type", data.type);
                setIsAuth(true);
                if (data.type === "Artist") {
                  setIsArtist(true);
                  history.push("/dashboard");
                } else {
                  setIsArtist(false);
                  getDecoratorSnippet()
                    .then((res) => {
                      window.localStorage.setItem(
                        "is_firm_user",
                        res.is_firm_user
                      );
                      history.push("/home");
                    })
                    .catch((err) => {
                      alert(
                        "Something went wrong in fetching user type, please login again"
                      );
                    });
                }
              }
            } else {
              history.push("/signup");
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

  const responseFacebook = (response) => {
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
            if (data.type && data.type != null) {
              if (data.type == "Firm") {
                window.location.replace("https://firm.thewallruscompany.com/");
              } else {
                let time = new Date().getTime();
                window.localStorage.setItem("Access_Key", res.access_token);
                window.localStorage.setItem(
                  "Expire_Time",
                  Number(res.expires_in) * 1000 + time
                );
                window.localStorage.setItem("Refresh_Key", res.refresh_token);
                window.localStorage.setItem("User_Type", data.type);
                setIsAuth(true);
                if (data.type === "Artist") {
                  setIsArtist(true);
                  history.push("/dashboard");
                } else {
                  setIsArtist(false);
                  getDecoratorSnippet()
                    .then((res) => {
                      window.localStorage.setItem(
                        "is_firm_user",
                        res.is_firm_user
                      );
                      history.push("/home");
                    })
                    .catch((err) => {
                      alert(
                        "Something went wrong in fetching user type, please login again"
                      );
                    });
                }
              }
            } else {
              history.push("/signup");
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
                  <span className="span-left">Log in with Google</span>
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
                  <span className="span-left">Log in with Facebook</span>
                </Button>
              )}
            />
            {/* <Button variant="contained" className="facebookBtn">
              <img src={facebook} alt="facebook" className="facebookImg" /><span className='span-left'>Log in with Facebook</span>
            </Button> */}
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

export default SocialMediaLogIn;
