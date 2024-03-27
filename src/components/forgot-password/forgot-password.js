import React, { useState } from "react";
import "./forgot-password.scss";

import { Button, CircularProgress } from "@material-ui/core";
import Input from "../input/input";
import { useParams, useLocation, useHistory } from "react-router";
import Logo from "../../images/logo.svg";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Fade from "@material-ui/core/Fade";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const ForgotPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [validator, setValidator] = useState({
    newPassword: true,
    confirmNewPassword: true,
  });
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [state, setState] = React.useState({
    open: false,
    Transition: Fade,
  });
  const { email, uidb64, token } = useParams();
  const query = useQuery();
  const history = useHistory();

  const validation = () => {
    const isNewPassword = newPassword.length >= 7;
    const isConfirmNewPassword = confirmNewPassword === newPassword;

    setValidator({
      newPassword: isNewPassword,
      confirmNewPassword: isConfirmNewPassword,
    });

    return isNewPassword && isConfirmNewPassword;
  };

  const onSubmitHandler = async () => {
    const shouldSubmit = validation();
    if (shouldSubmit) {
      setLoader(true);
      try {
        const formData = new FormData();
        formData.append("uidb64", uidb64);
        formData.append("token", token);
        formData.append("password", newPassword);
        await axios.patch(
          `${process.env.REACT_APP_ROOT_URL}/api/password-reset-complete`,
          formData
        );

        setLoader(false);
        // alert("Your password was changed successfully");
        setState({ ...state, open: true });
        setMessage("Your password was changed successfully");
        setErrorMessage("info");
        history.replace("/login");
      } catch (err) {
        setLoader(false);
        // alert("Couldn't change your password. Please try again");
        setState({ ...state, open: true });
        setMessage("Couldn't change your password. Please try again");
        setErrorMessage("warning");
      }
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
      <div className="forgot-password-container">
        <img src={Logo} alt="logo" />
        <p className="forgot-password-title">Set New Password for {email}</p>
        <div className="forgot-password-form" fullWidth>
          <Input
            type="password"
            value={newPassword}
            placeholder="New password"
            onChange={(e) => setNewPassword(e.target.value)}
            error={!validator.newPassword}
            helperText={
              !validator.newPassword
                ? "Password must be atleast 8 of character"
                : null
            }
          />
          <Input
            type="password"
            value={confirmNewPassword}
            placeholder="Confirm new password"
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            error={!validator.confirmNewPassword}
            helperText={
              !validator.confirmNewPassword ? "Passwords do not match" : null
            }
          />
          <Button
            variant="contained"
            className="btn-filled"
            onClick={onSubmitHandler}
          >
            {loader ? (
              <CircularProgress size={30} style={{ color: "#fff" }} />
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ForgotPassword;
