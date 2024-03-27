import "./signin.scss";
import { TextField, InputAdornment } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Grid from "@material-ui/core/Grid";
import { withStyles, makeStyles } from "@material-ui/core/styles";

import { useState } from "react";
import LogInButton from "../Log-In-sign-Up-Button/loginbutton";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoginEmailNumber,
  setLoginPassword,
  selectLoginEmailNumber,
  selectLoginPassword,
} from "../../redux/Slices/loginSlice/loginSlice";
import InputModal from "../input-modal/input-modal";

const useStyles = makeStyles((theme) => ({
  label: {
    color: "rgb(0, 0, 0)",
  },
}));

const InputTextField = withStyles({
  root: {
    "& input + fieldset": {
      borderWidth: 1,
      borderRadius: `12px 12px 0 0`,
    },
    "& input:focus + fieldset": {
      borderColor: "black !important",
    },
    "& label.Mui-focused": {
      color: "black",
    },
  },
})(TextField);

export default function SignIn(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loginEmailNumber = useSelector(selectLoginEmailNumber);
  const loginPassword = useSelector(selectLoginPassword);
  const credentials = {
    emailNumber: loginEmailNumber,
    password: loginPassword,
  };

  const validation = useSelector((state) => state.loginError);

  const [showModal, setShowModal] = useState(false);

  let [userInput, setUserInput] = useState({});
  let re = /^[0-9]*$/;
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    setUserInput(e.target.value);

    if (e.target.id === "filled-email-phone-input") {
      dispatch(
        setLoginEmailNumber({
          loginEmail_Number: e.target.value,
        })
      );
    }
  };

  const handleChangePassword = (e) => {
    if (e.target.id === "filled-password-input") {
      dispatch(
        setLoginPassword({
          loginPassword: e.target.value,
        })
      );
    }
  };

  return (
    <>
      <form noValidate autoComplete="off" className="signInInputs">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <InputTextField
              value={loginEmailNumber}
              id="filled-email-phone-input"
              label="Email or phone number"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              InputLabelProps={{
                classes: {
                  root: classes.label,
                },
              }}
              error={!validation.emailError}
              helperText={
                !validation.emailError ? `This field is required` : null
              }
            />
          </Grid>
          <Grid item xs={12}>
            <InputTextField
              onChange={handleChangePassword}
              value={loginPassword}
              id="filled-password-input"
              label="Password"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    onClick={handleClick}
                    style={{ cursor: "pointer" }}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </InputAdornment>
                ),
              }}
              autoComplete="current-password"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                classes: {
                  root: classes.label,
                },
              }}
              error={!validation.passwordError}
              helperText={
                !validation.passwordError ? `This field is required` : null
              }
            />
            <a className="text-muted" onClick={() => setShowModal(true)}>
              Forgot password?
            </a>
          </Grid>

          <Grid item xs={12}>
            <LogInButton credentials={credentials} />
          </Grid>

          <div className="memberStatusMobile">
            <span>Not a member?</span>{" "}
            <Link to="/signup" className="link">
              Sign up
            </Link>
          </div>
        </Grid>
        <p style={{ margin: "16px auto" }}>
          Login as{" "}
          <a href="https://firm.thewallruscompany.com/">
            <b>organization?</b>
          </a>
        </p>
      </form>
      {showModal && <InputModal hideModal={() => setShowModal(false)} />}
    </>
  );
}
