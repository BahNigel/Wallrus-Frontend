import React, { useState } from "react";
import "./bank-details.scss";
import TextField from "@material-ui/core/TextField";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "@material-ui/lab/Skeleton";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import {
  selectAccountType,
  selectEmailNumber,
  selectPassword,
  selectProfilePic,
  selectFullName,
  selectUserName,
  selectEmail_AboutYou,
  selectPhoneNumber_AboutYou,
  selectAddress_Street_AboutYou,
  selectAddress_Apartment_AboutYou,
  selectState_AboutYou,
  selectCity_AboutYou,
  selectPincode_AboutYou,
  selectBio,
  selectOrganization,
  selectPan,
  selectGst,
  selectEmail_Business,
  selectPhoneNumber_Business,
  selectAddress_Street_Business,
  selectAddress_Apartment_Business,
  selectState_Business,
  selectCity_Business,
  selectPincode,
  selectAccountNumber,
  selectIFSCCode,
  selectBankName,
  selectBankBranch,
  selectSwiftCode,
  setAccountNumber,
  setIFSCCode,
  setBankName,
  setBankBranch,
  setSwiftCode,
} from "../../redux/Slices/userSignUpSlice/userSignUpSlice";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  label: {
    color: "rgb(0, 0, 0)",
  },
  skeleton: {
    borderRadius: "12px 12px 0 0",
  },
}));

const BootstrapButtonSubmit = withStyles({
  root: {
    fontSize: "18px !important",
    borderColor: "#000000",
    padding: "5px 15px !important",
    color: "#ffffff",
  },
})(Button);

const BootstrapButtonSubmitAndSkip = withStyles({
  root: {
    fontSize: "18px !important",
    borderColor: "#000000",
    padding: "5px 15px !important",
  },
})(Button);

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
  input: {
    "&::placeholder": {
      color: "black !important",
    },
  },
})(TextField);

export default function BankDetails(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  let history = useHistory();
  const [loading, isLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [state, setState] = React.useState({
    open: false,
    Transition: Fade,
  });

  const accountType = useSelector(selectAccountType);
  const emailNumber = useSelector(selectEmailNumber);
  const password = useSelector(selectPassword);
  const profilePic = useSelector(selectProfilePic);
  const fullName = useSelector(selectFullName);
  const userName = useSelector(selectUserName);
  const email = useSelector(selectEmail_AboutYou);
  const phoneNumber = useSelector(selectPhoneNumber_AboutYou);
  const addressStreetAboutyou = useSelector(selectAddress_Street_AboutYou);
  const addressApartmentAboutyou = useSelector(
    selectAddress_Apartment_AboutYou
  );
  const stateAboutyou = useSelector(selectState_AboutYou);
  const addressCityAboutyou = useSelector(selectCity_AboutYou);
  const addressPincodeAboutyou = useSelector(selectPincode_AboutYou);
  const bio = useSelector(selectBio);
  const organization = useSelector(selectOrganization);
  const pan = useSelector(selectPan);
  const gst = useSelector(selectGst);
  const emailBusiness = useSelector(selectEmail_Business);
  const phoneNumberBusiness = useSelector(selectPhoneNumber_Business);
  const addressStreetBusiness = useSelector(selectAddress_Street_Business);
  const addressApartmentBusiness = useSelector(
    selectAddress_Apartment_Business
  );
  const stateBusiness = useSelector(selectState_Business);
  const cityBusiness = useSelector(selectCity_Business);
  const pincodeBusiness = useSelector(selectPincode);
  const accountNumber = useSelector(selectAccountNumber);
  const ifscCode = useSelector(selectIFSCCode);
  const bankName = useSelector(selectBankName);
  const bankBranch = useSelector(selectBankBranch);
  const swiftCode = useSelector(selectSwiftCode);

  let submit;
  let skipAndSubmit;

  const [error, setError] = useState({
    accountNumber: false,
    ifscCode: false,
    bankName: false,
    bankBranch: false,
    swiftCode: false,
  });

  accountNumber !== "" &&
  ifscCode !== "" &&
  bankName !== "" &&
  bankBranch !== "" &&
  swiftCode !== "" &&
  !error.accountNumber &&
  !error.ifscCode &&
  !error.bankName &&
  !error.bankBranch &&
  !error.swiftCode
    ? (submit = true)
    : (submit = false);

  accountNumber !== "" &&
  ifscCode !== "" &&
  bankName !== "" &&
  bankBranch !== "" &&
  swiftCode !== ""
    ? (skipAndSubmit = false)
    : (skipAndSubmit = true);

  if (props.BankEditPage) {
    !error.accountNumber &&
      !error.ifscCode &&
      !error.bankName &&
      !error.bankBranch &&
      props;
    !error.swiftCode ? props.handleValidity(false) : props.handleValidity(true);
  }

  let regexAccNumber = /^\d{9,18}$/;
  let regexIfscCode = /[A-Z|a-z]{4}[0][\d]{6}$/;
  let regexSwiftCode = /^[a-zA-Z]{4}[a-zA-Z]{2}[a-zA-Z0-9]{2}[XXX0-9]{0,3}/;
  let regexBankName = /^[A-Za-z ]+$/;
  let regexBankBranch = /^[A-Za-z0-9_ \-]+$/;

  const handleChange = (e) => {
    if (e.target.id === "bank-details-account") {
      e.target.value === "" || regexAccNumber.test(e.target.value) === false
        ? setError({ ...error, accountNumber: true })
        : setError({ ...error, accountNumber: false });
      dispatch(
        setAccountNumber({
          accountNumber: e.target.value,
        })
      );
    } else if (e.target.id === "bank-details-ifsc") {
      e.target.value === "" ||
      regexIfscCode.test(e.target.value.toUpperCase()) === false
        ? setError({ ...error, ifscCode: true })
        : setError({ ...error, ifscCode: false });
      dispatch(
        setIFSCCode({
          ifscCode: e.target.value.toUpperCase(),
        })
      );
    } else if (e.target.id === "bank-details-bank-name") {
      e.target.value === "" || !regexBankName.test(e.target.value)
        ? setError({ ...error, bankName: true })
        : setError({ ...error, bankName: false });
      dispatch(
        setBankName({
          bankName: e.target.value,
        })
      );
    } else if (e.target.id === "bank-details-bank-branch") {
      e.target.value === "" || !regexBankBranch.test(e.target.value)
        ? setError({ ...error, bankBranch: true })
        : setError({ ...error, bankBranch: false });
      dispatch(
        setBankBranch({
          bankBranch: e.target.value,
        })
      );
    } else if (e.target.id === "bank-details-swift-code") {
      e.target.value === "" ||
      regexSwiftCode.test(e.target.value.toUpperCase()) === false
        ? setError({ ...error, swiftCode: true })
        : setError({ ...error, swiftCode: false });
      dispatch(
        setSwiftCode({
          swiftCode: e.target.value.toUpperCase(),
        })
      );
    }
  };

  const handleSignUp = () => {
    isLoading(true);
    const my_data = {
      accountTypeKey: accountType,
      emailNumberKey: emailNumber,
      passwordKey: password,
      profilePicKey: profilePic,
      fullNameKey: fullName,
      userNameKey: userName,
      emailKey: email,
      phoneNumberKey: phoneNumber,
      addressStreetAboutyouKey: addressStreetAboutyou,
      addressApartmentAboutyouKey: addressApartmentAboutyou,
      stateAboutyouKey: stateAboutyou,
      addressCityAboutyouKey: addressCityAboutyou,
      addressPincodeAboutyouKey: addressPincodeAboutyou,
      bioKey: bio,
      organizationKey: organization,
      panKey: pan,
      gstKey: gst,
      emailBusinessKey: emailBusiness,
      phoneNumberBusinessKey: phoneNumberBusiness,
      addressStreetBusinessKey: addressStreetBusiness,
      addressApartmentBusinessKey: addressApartmentBusiness,
      stateBusinessKey: stateBusiness,
      cityBusinessKey: cityBusiness,
      pincodeBusinessKey: pincodeBusiness,
      accountNumberKey: accountNumber,
      ifscCodeKey: ifscCode,
      bankNameKey: bankName,
      bankBranchKey: bankBranch,
      swiftCodeKey: swiftCode,
    };

    let formData = new FormData();
    for (var key in my_data) {
      formData.append(key, my_data[key]);
    }

    if (props.isSocial?.email) {
      axios
        .post(
          `${process.env.REACT_APP_ROOT_URL}/api/social-user-detail/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${props.isSocial?.access_token}`,
            },
          }
        )
        .then((response) => {
          history.push("/confirmation");
        })
        .catch((error) => {
          // alert("Something went wrong, please try signing up again");
          setState({ ...state, open: true });
          setMessage("Something went wrong, please try signing up again");
          setErrorMessage("warning");
          // window.location.reload();
        });
    } else {
      axios
        .post(`${process.env.REACT_APP_ROOT_URL}/api/signup/`, formData)
        .then((response) => {
          history.push("/confirmation");
        })
        .catch((error) => {
          // alert("Something went wrong, please try signing up again");
          setState({ ...state, open: true });
          setMessage("Something went wrong, please try signing up again");
          setErrorMessage("warning");
          // window.location.reload();
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
      <div className="bankDetails">
        <h1 className="bank-details-title">Bank Details</h1>
        <p className="bank-details-sub-title">
          Bank account details are required for artist earnings and reward point
          redemption. You can update this from your account settings at anytime.
        </p>

        {props.editProfileLoading && props.BankEditPage ? (
          <div className="skeleton-bank-details">
            <Skeleton
              animation="wave"
              height={80}
              className={classes.skeleton}
            />
            <Skeleton
              animation="wave"
              height={80}
              className={classes.skeleton}
            />
            <Skeleton
              animation="wave"
              height={80}
              className={classes.skeleton}
            />
            <Skeleton
              animation="wave"
              height={80}
              className={classes.skeleton}
            />
            <Skeleton
              animation="wave"
              height={80}
              className={classes.skeleton}
            />
          </div>
        ) : (
          <React.Fragment>
            <InputTextField
              value={accountNumber}
              error={error.accountNumber}
              helperText={error.accountNumber && "Enter a valid account number"}
              onChange={handleChange}
              className="bank-details-input"
              id="bank-details-account"
              label="Account number"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                classes: {
                  root: classes.label,
                },
              }}
            />

            <InputTextField
              value={ifscCode}
              error={error.ifscCode}
              helperText={error.ifscCode && "Please enter a valid IFSC code"}
              onChange={handleChange}
              className="bank-details-input"
              id="bank-details-ifsc"
              label="IFSC code"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                classes: {
                  root: classes.label,
                },
              }}
            />

            <InputTextField
              value={bankName}
              error={error.bankName}
              helperText={error.bankName && "Please enter your bank name"}
              onChange={handleChange}
              className="bank-details-input"
              id="bank-details-bank-name"
              label="Bank name"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                classes: {
                  root: classes.label,
                },
              }}
            />

            <InputTextField
              value={bankBranch}
              error={error.bankBranch}
              helperText={error.bankBranch && "Please enter your Bank Branch"}
              onChange={handleChange}
              className="bank-details-input"
              id="bank-details-bank-branch"
              label="Bank branch"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                classes: {
                  root: classes.label,
                },
              }}
            />

            <InputTextField
              value={swiftCode}
              error={error.swiftCode}
              helperText={error.swiftCode && "Please enter a valid swift code"}
              onChange={handleChange}
              className="bank-details-input"
              id="bank-details-swift-code"
              label="Swift code"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                classes: {
                  root: classes.label,
                },
              }}
            />
          </React.Fragment>
        )}

        {props.BankEditPage ? null : (
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <div className="submitButton">
                {submit ? (
                  <BootstrapButtonSubmit
                    onClick={handleSignUp}
                    className="submit-button"
                    variant="outlined"
                  >
                    {!loading ? (
                      <span>Submit</span>
                    ) : (
                      <CircularProgress size={30} className="button-loader" />
                    )}
                  </BootstrapButtonSubmit>
                ) : (
                  <BootstrapButtonSubmit
                    className="submit-button"
                    disabled={true}
                    variant="outlined"
                  >
                    Submit
                  </BootstrapButtonSubmit>
                )}
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="skipandsubmitButton">
                {skipAndSubmit ? (
                  <BootstrapButtonSubmitAndSkip
                    onClick={handleSignUp}
                    variant="outlined"
                  >
                    {!loading ? (
                      <span>Skip and submit</span>
                    ) : (
                      <CircularProgress
                        size={30}
                        className="button-loader-skip"
                      />
                    )}
                  </BootstrapButtonSubmitAndSkip>
                ) : (
                  <BootstrapButtonSubmitAndSkip
                    disabled={true}
                    className="skip-and-submit-button"
                    variant="outlined"
                  >
                    Skip and submit
                  </BootstrapButtonSubmitAndSkip>
                )}
              </div>
            </Grid>
          </Grid>
        )}
      </div>
    </React.Fragment>
  );
}
