import "./signup-email.scss";
import { TextField, InputAdornment } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Grid from "@material-ui/core/Grid";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import SignUpButton from "../Log-In-sign-Up-Button/signupbutton";
import { useDispatch, useSelector } from "react-redux";
import {
  setEmailNumber,
  selectEmailNumber,
  selectPassword,
  setPassword,
} from "../../redux/Slices/userSignUpSlice/userSignUpSlice";
import validator from "validator";

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

export default function SignUpEmail(props) {
  const classes = useStyles();

  let [userInput, setUserInput] = useState({});
  let re = /^[0-9]*$/;
  const dispatch = useDispatch();
  const emailNumber = useSelector(selectEmailNumber);
  const password = useSelector(selectPassword);
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    setUserInput(e.target.value);
    if (e.target.id === "filled-email-phone-input") {
      dispatch(
        setEmailNumber({
          email_Number: e.target.value,
        })
      );
    }
  };

  const [isEmailNumber, setIsEmailNumber] = useState(true);
  const [isPassword, setIsPassword] = useState(true);

  const handleChangePassword = (e) => {
    if (e.target.id === "filled-password-input") {
      dispatch(
        setPassword({
          password: e.target.value,
        })
      );
    }
  };

  const emailValidation = () => {
    if (
      !validator.isEmail(emailNumber) &&
      !validator.isMobilePhone(emailNumber)
    ) {
      setIsEmailNumber(false);
    } else {
      setIsEmailNumber(true);
    }
  };

  const passwordValidation = () => {
    if (!validator.isStrongPassword(password)) {
      setIsPassword(false);
    } else {
      setIsPassword(true);
    }
  };

  const validations = () => {
    props.clicked(emailNumber, password);
    emailValidation();
    passwordValidation();
  };

  return (
    <form autoComplete="off" className="signUpInputs">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <InputTextField
            value={emailNumber}
            error={!isEmailNumber}
            id="filled-email-phone-input"
            label="Email or Phone number"
            helperText={isEmailNumber ? null : "Invalid Email or Phone"}
            variant="outlined"
            fullWidth
            onChange={(event) => {
              handleChange(event);
            }}
            InputLabelProps={{
              classes: {
                root: classes.label,
              },
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <InputTextField
            value={password}
            id="filled-password-input"
            label="Password"
            helperText={isPassword ? null : "Password is not strong enough"}
            onChange={(event) => {
              handleChangePassword(event);
            }}
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
            error={!isPassword}
            InputLabelProps={{
              classes: {
                root: classes.label,
              },
            }}
          />
        </Grid>
        {/* {!re.test(userInput) || userInput === "" ? (
        ) : (
          <Grid item xs={12} className="d-none">
            <InputTextField
              id="filled-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              fullWidth
              disabled
            />
          </Grid>
        )} */}

        <Grid item xs={12}>
          <SignUpButton clicked={validations} />
        </Grid>
      </Grid>
    </form>
  );
}
