import "./button.scss";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSelector, useDispatch } from "react-redux";
import { AuthContext } from "../../apis/AuthContext";
import { loginErrorActions } from "../../redux/Slices/loginErrorSlice/loginErrorSlice";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Fade from "@material-ui/core/Fade";
import React from "react";
import { getDecoratorSnippet } from "./../../apis/apiCalls";

const LogInButton = (props) => {
  const [loading, isLoading] = useState(false);
  const history = useHistory();
  const { setIsAuth, setIsArtist } = useContext(AuthContext);

  const validation = useSelector((state) => state.loginError);
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [state, setState] = React.useState({
    open: false,
    Transition: Fade,
  });

  const validator = () => {
    const emailError = `${props.credentials.emailNumber}`.length > 0;
    const passwordError = `${props.credentials.password}`.length > 0;

    dispatch(loginErrorActions.setEmail(emailError));
    dispatch(loginErrorActions.setPassword(passwordError));

    return emailError && passwordError;
  };

  const handleLogIn = (e) => {
    const shouldLogin = validator();
    if (shouldLogin) {
      e.preventDefault();
      isLoading(true);
      const requestOptions = {
        client_id: `${process.env.REACT_APP_login_client_id}`,
        client_secret: `${process.env.REACT_APP_login_client_secret}`,
        grant_type: "password",
        username: `${props.credentials.emailNumber}`,
        password: `${props.credentials.password}`,
      };
      axios
        .post(`${process.env.REACT_APP_ROOT_URL}/auth/token`, requestOptions)
        .then((response) => response)
        .then((data) => {
          axios
            .get(`${process.env.REACT_APP_ROOT_URL}/api/user-type/`, {
              headers: {
                Authorization: `Bearer ${data.data.access_token}`,
              },
            })
            .then((response) => response)
            .then((typeData) => {
              if (typeData.data.type && typeData.data.type != null) {
                if (typeData.data.type == "Firm") {
                  window.location.replace(
                    "https://firm.thewallruscompany.com/"
                  );
                } else {
                  let time = new Date().getTime();
                  window.localStorage.setItem(
                    "Access_Key",
                    data.data.access_token
                  );
                  window.localStorage.setItem(
                    "Expire_Time",
                    Number(data.data.expires_in) * 1000 + time
                  );
                  window.localStorage.setItem(
                    "Refresh_Key",
                    data.data.refresh_token
                  );
                  window.localStorage.setItem("User_Type", typeData.data.type);
                  setIsAuth(true);
                  if (typeData.data.type === "Artist") {
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
                        setState({ ...state, open: true });
                        setMessage(
                          "Something went wrong in fetching user type, please login again"
                        );
                        setErrorMessage("error");
                        isLoading(false);
                      });
                  }
                }
              } else {
                history.push("/signup");
              }
            })
            .catch((error) => {
              // alert(
              //   "Something went wrong in fetching user type, please login again"
              // );
              setState({ ...state, open: true });
              setMessage(
                "Something went wrong in fetching user type, please login again"
              );
              setErrorMessage("error");
              isLoading(false);
            });
        })
        .catch((error) => {
          // alert("Invalid Credentials!");
          setState({ ...state, open: true });
          setMessage("Invalid Credentials!");
          setErrorMessage("warning");
          isLoading(false);
        });
    }
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
      <Button onClick={handleLogIn} variant="contained" className="LogIn-Btn">
        {!loading ? (
          <span>Log In</span>
        ) : (
          <CircularProgress size={30} className="button-loader" />
        )}
      </Button>
    </React.Fragment>
  );
};

export default LogInButton;
