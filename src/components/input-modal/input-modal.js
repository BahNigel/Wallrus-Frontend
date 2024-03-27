import React, { useEffect, useState } from "react";
import {
  ThemeProvider,
  createMuiTheme,
  Button,
  Snackbar,
  CircularProgress,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import validator from "validator";
import { useHistory } from "react-router";
import "./input-modal.scss";
import Input from "../input/input";
import axios from "axios";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const InputModal = (props) => {
  const [email, setEmail] = useState("");
  const [validate, setValidate] = useState({ email: true });
  const [open, setOpen] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  const [status, setStatus] = React.useState("");

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#000000",
      },
    },
  });

  useEffect(() => {
    resetInputs();
  }, []);

  const validation = () => {
    const isEmail = validator.isEmail(email);
    setValidate({ email: isEmail });
    return isEmail;
  };

  const onSubmitHandler = async () => {
    const enable = validation();
    if (enable) {
      setLoader(true);
      try {
        const formData = new FormData();
        formData.append("email", email);
        await axios.post(
          `${process.env.REACT_APP_ROOT_URL}/api/reset-email`,
          formData
        );
        setStatus("success");
        setLoader(false);
      } catch (err) {
        setStatus("error");
        setLoader(false);
      }
      handleClick();
    }
  };

  const resetInputs = () => {
    setEmail("");
    setValidate({ email: true });
  };

  let alert = (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      style={{ zIndex: 3000 }}
    >
      <Alert onClose={handleClose} severity="success" style={{ width: "100%" }}>
        We sent an email to reset your password
      </Alert>
    </Snackbar>
  );
  if (status === "error") {
    alert = (
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        style={{ zIndex: 3000 }}
      >
        <Alert onClose={handleClose} severity="error" style={{ width: "100%" }}>
          Couldn't send email. Please try again
        </Alert>
      </Snackbar>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="input-modal--backdrop" onClick={props.hideModal} />
      <div className="input-modal">
        <p>Forgot your password? Enter the your email below</p>
        <Input
          placeholder="Email"
          error={!validate.email}
          helperText={!validate.email ? "Provide a valid email" : null}
          fullWidth
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={onSubmitHandler}
          style={{ marginTop: 30 }}
        >
          {loader ? (
            <CircularProgress size={30} style={{ color: "#fff" }} />
          ) : (
            "Submit"
          )}
        </Button>
      </div>
      {alert}
    </ThemeProvider>
  );
};

export default InputModal;
