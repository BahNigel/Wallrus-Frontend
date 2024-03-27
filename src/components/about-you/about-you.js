import React from "react";
import "./about-you.scss";
import CameraIcon from "../../images/camera.svg";
import { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import AlertCircle from "../../images/alert-circle.svg";
import TextField from "@material-ui/core/TextField";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "@material-ui/lab/Skeleton";
import {
  setProfilePic,
  setFullName,
  setUserName,
  setEmail_AboutYou,
  setPhoneNumber_AboutYou,
  setBio,
  selectProfilePic,
  selectFullName,
  selectUserName,
  selectEmail_AboutYou,
  selectPhoneNumber_AboutYou,
  selectBio,
  setAddress_Street_AboutYou,
  setAddress_Apartment_AboutYou,
  setCity_AboutYou,
  setPincode_AboutYou,
  setState_AboutYou,
  selectAddress_Street_AboutYou,
  selectAddress_Apartment_AboutYou,
  selectCity_AboutYou,
  selectPincode_AboutYou,
  selectState_AboutYou,
} from "../../redux/Slices/userSignUpSlice/userSignUpSlice";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#000000",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  label: {
    color: "rgb(0, 0, 0)",
  },
  skeleton: {
    borderRadius: "12px 12px 0 0",
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

const AboutYou = (props) => {
  // console.log(props.validity)
  const classes = useStyles();
  const dispatch = useDispatch();
  const profilePic = useSelector(selectProfilePic);
  const fullName = useSelector(selectFullName);
  const userName = useSelector(selectUserName);
  const email = useSelector(selectEmail_AboutYou);
  const phoneNumber = useSelector(selectPhoneNumber_AboutYou);
  const bio = useSelector(selectBio);
  const addressStreet = useSelector(selectAddress_Street_AboutYou);
  const addressApartment = useSelector(selectAddress_Apartment_AboutYou);
  const city = useSelector(selectCity_AboutYou);
  const pincode = useSelector(selectPincode_AboutYou);
  const state = useSelector(selectState_AboutYou);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState({
    fullname: false,
    username: false,
    Email: false,
    phonenumber: false,
    street: false,
    City: false,
    Pincode: false,
    State: false,
  });

  const {
    fullname,
    username,
    Email,
    phonenumber,
    street,
    City,
    Pincode,
    State,
  } = error;

  if (props.isSocial?.email) {
    if (!props.EditPage) {
      profilePic !== "" &&
      fullName !== "" &&
      phoneNumber !== "" &&
      addressStreet !== "" &&
      city !== "" &&
      pincode !== "" &&
      state !== "" &&
      !fullname &&
      !phonenumber &&
      !street &&
      !City &&
      !Pincode &&
      !State
        ? props.onChange(true)
        : props.onChange(false);
    }
    if (props.EditPage) {
      !fullname &&
      !phonenumber &&
      !street &&
      !City &&
      !Pincode &&
      !State &&
      profilePic !== "" &&
      fullName !== "" &&
      phoneNumber !== "" &&
      addressStreet !== "" &&
      city !== "" &&
      pincode !== "" &&
      state !== ""
        ? props.handleValidity(false)
        : props.handleValidity(true);
    }
  } else {
    if (!props.EditPage) {
      profilePic !== "" &&
      fullName !== "" &&
      userName !== "" &&
      email !== "" &&
      phoneNumber !== "" &&
      addressStreet !== "" &&
      city !== "" &&
      pincode !== "" &&
      state !== "" &&
      !fullname &&
      !username &&
      !Email &&
      !phonenumber &&
      !street &&
      !City &&
      !Pincode &&
      !State
        ? props.onChange(true)
        : props.onChange(false);
    }
    if (props.EditPage) {
      !fullname &&
      !username &&
      !Email &&
      !phonenumber &&
      !street &&
      !City &&
      !Pincode &&
      !State &&
      profilePic !== "" &&
      fullName !== "" &&
      userName !== "" &&
      email !== "" &&
      phoneNumber !== "" &&
      addressStreet !== "" &&
      city !== "" &&
      pincode !== "" &&
      state !== ""
        ? props.handleValidity(false)
        : props.handleValidity(true);
    }
  }

  const emailRegex =
    /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  const NameRegex = /^[A-Za-z ]+$/;
  const addressRegex = /^[A-Za-z0-9,_.:#/() \-]+$/;
  const userNameRegex = /^[A-Za-z0-9_ ]+$/;

  const handleChange = (e) => {
    if (e.target.id == "about-you-fullName") {
      e.target.value === "" || !NameRegex.test(e.target.value)
        ? setError({ ...error, fullname: true })
        : setError({ ...error, fullname: false });
      dispatch(
        setFullName({
          fullName: e.target.value,
        })
      );
    } else if (e.target.id == "about-you-userName") {
      e.target.value === "" || !userNameRegex.test(e.target.value)
        ? setError({ ...error, username: true })
        : setError({ ...error, username: false });
      dispatch(
        setUserName({
          userName: props.isSocial?.email
            ? props.isSocial.username
            : e.target.value,
        })
      );
    } else if (e.target.id == "about-you-email") {
      e.target.value === "" || !emailRegex.test(e.target.value)
        ? setError({ ...error, Email: true })
        : setError({ ...error, Email: false });
      dispatch(
        setEmail_AboutYou({
          email_aboutyou: props.isSocial?.email
            ? props.isSocial.email
            : e.target.value.toLowerCase(),
        })
      );
    } else if (e.target.id == "about-you-phoneNumber") {
      e.target.value === "" || e.target.value.length != 10
        ? setError({ ...error, phonenumber: true })
        : setError({ ...error, phonenumber: false });
      dispatch(
        setPhoneNumber_AboutYou({
          phoneNumber_aboutyou: e.target.value,
        })
      );
    } else if (e.target.id == "about-you-bio") {
      dispatch(
        setBio({
          bio: e.target.value,
        })
      );
    } else if (e.target.id == "about-you-address-street") {
      e.target.value === "" || !addressRegex.test(e.target.value)
        ? setError({ ...error, street: true })
        : setError({ ...error, street: false });
      dispatch(
        setAddress_Street_AboutYou({
          address_street_aboutyou: e.target.value,
        })
      );
    } else if (e.target.id == "about-you-address-apartment") {
      dispatch(
        setAddress_Apartment_AboutYou({
          address_apartment_aboutyou: e.target.value,
        })
      );
    } else if (e.target.id == "about-you-city") {
      e.target.value === "" || !NameRegex.test(e.target.value)
        ? setError({ ...error, City: true })
        : setError({ ...error, City: false });
      dispatch(
        setCity_AboutYou({
          city_aboutyou: e.target.value,
        })
      );
    } else if (e.target.id == "about-you-pincode") {
      e.target.value === "" || e.target.value.length != 6
        ? setError({ ...error, Pincode: true })
        : setError({ ...error, Pincode: false });
      dispatch(
        setPincode_AboutYou({
          pincode_aboutyou: e.target.value,
        })
      );
    } else if (e.target.id == "about-you-state") {
      e.target.value === "" || !NameRegex.test(e.target.value)
        ? setError({ ...error, State: true })
        : setError({ ...error, State: false });
      dispatch(
        setState_AboutYou({
          state_aboutyou: e.target.value,
        })
      );
    }
  };

  const fileSelectHandler = (e) => {
    let uploadedProfilePic = e.target.files[0];
    console.log(e.target);
    dispatch(
      setProfilePic({
        profilePic: uploadedProfilePic,
      })
    );
    profilePic === ""
      ? setError({ ...error, profilepic: true })
      : setError({ ...error, profilepic: false });
  };

  if (typeof profilePic !== "string") {
    const reader = new FileReader();
    reader.addEventListener("load", function () {
      const uploadedProfilePicDiv = document.querySelector(".uploadedPic");
      document.querySelector(".cameraIcon").style.display = "none";
      uploadedProfilePicDiv.style.display = "flex";
      uploadedProfilePicDiv.style.justifyContent = "center";
      document.querySelector(".profilePic").style.border = "none";
      uploadedProfilePicDiv.setAttribute("src", this.result);
    });
    reader.readAsDataURL(profilePic);
  }

  return (
    <div className="aboutYou">
      <h1 className="about-you-title">About you</h1>
      <p className="about-you-sub-title">
        Don't get too serious in your Bio :-)
      </p>
      <div className="profilePicDiv">
        <div className="profilePic">
          {profilePic !== "" && typeof profilePic === "string" ? (
            <>
              <img
                src={profilePic}
                alt="ProfilePic"
                className="uploadedPic"
                style={{ display: "flex", justifyContent: "center" }}
              />
              <img
                src={CameraIcon}
                alt="camera"
                className="cameraIcon"
                style={{ display: "none" }}
              />
            </>
          ) : (
            <>
              <img
                src=""
                alt="ProfilePic"
                className="uploadedPic"
                style={{ display: "none" }}
              />
              <img src={CameraIcon} alt="camera" className="cameraIcon" />
            </>
          )}
        </div>
        <div className="uploadButton">
          <input
            type="file"
            accept="image/*"
            className="profilePicUpload"
            onChange={fileSelectHandler}
          />
        </div>
      </div>
      {profilePic === "" && !props.EditPage && (
        <span className="profile-pic-warning">
          Please upload your profile picture
        </span>
      )}
      {props.editProfileLoading && props.EditPage ? (
        <div>
          <Skeleton animation="wave" height={80} className={classes.skeleton} />
          <Skeleton animation="wave" height={80} className={classes.skeleton} />
          <Skeleton animation="wave" height={80} className={classes.skeleton} />
          <Skeleton animation="wave" height={80} className={classes.skeleton} />
          <Skeleton animation="wave" height={80} className={classes.skeleton} />
          <Skeleton animation="wave" height={80} className={classes.skeleton} />
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Skeleton
                animation="wave"
                className={classes.skeleton}
                height={80}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Skeleton
                animation="wave"
                className={classes.skeleton}
                height={80}
              />
            </Grid>
          </Grid>
          <Skeleton
            animation="wave"
            className={classes.skeleton}
            height={200}
          />
        </div>
      ) : (
        <React.Fragment>
          <InputTextField
            error={fullname}
            // disabled={props.EditPage ? true : false}
            value={fullName}
            helperText={fullname && "Please enter your fullname"}
            onChange={handleChange}
            className="about-you-input"
            id="about-you-fullName"
            label="Full name*"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              classes: { root: classes.label },
            }}
          />

          {!props.isSocial?.email && (
            <>
              <InputTextField
                error={username}
                value={userName}
                onChange={handleChange}
                helperText={username && "Please enter your username"}
                className="about-you-input"
                id="about-you-userName"
                label="Username*"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  classes: { root: classes.label },
                }}
              />
              <InputTextField
                // disabled={props.EditPage ? true : false}
                type="email"
                error={Email}
                helperText={Email && "Please enter a valid email-id"}
                value={email}
                onChange={handleChange}
                className="about-you-input"
                id="about-you-email"
                label="Email*"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  classes: {
                    root: classes.label,
                  },
                }}
              />
            </>
          )}

          <InputTextField
            type="text"
            error={phonenumber}
            helperText={phonenumber && "Please enter a valid phone number"}
            value={phoneNumber}
            onChange={handleChange}
            className="about-you-input"
            id="about-you-phoneNumber"
            label="Phone number*"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              classes: {
                root: classes.label,
              },
            }}
          />
          <InputTextField
            error={street}
            helperText={street && "Please enter your address"}
            value={addressStreet}
            onChange={handleChange}
            className="about-you-input-address"
            id="about-you-address-street"
            label="Address*"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              classes: {
                root: classes.label,
              },
            }}
          />

          <div className="text-muted-tags">
            <img
              src={AlertCircle}
              className="i-img"
              height="14px"
              width="14px"
            ></img>{" "}
            <span className="text-muted-business-details">
              Street address or P.O Box
            </span>
          </div>

          <InputTextField
            value={addressApartment}
            onChange={handleChange}
            className="about-you-input-address"
            id="about-you-address-apartment"
            label="Address"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              classes: {
                root: classes.label,
              },
            }}
          />
          <div className="text-muted-tags">
            <img
              src={AlertCircle}
              className="i-img"
              height="14px"
              width="14px"
            ></img>{" "}
            <span className="text-muted-business-details">
              apartment, unit, building, floor
            </span>
          </div>

          <InputTextField
            error={State}
            value={state}
            helperText={State && "Please enter your state"}
            onChange={handleChange}
            className="about-you-input"
            id="about-you-state"
            label="State*"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              classes: {
                root: classes.label,
              },
            }}
          />

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <InputTextField
                type="alphabets"
                error={City}
                helperText={City && "Please enter your city"}
                value={city}
                onChange={handleChange}
                className="about-you-input"
                id="about-you-city"
                label="City*"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  classes: {
                    root: classes.label,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputTextField
                type="text"
                error={Pincode}
                helperText={Pincode && "Please enter your Pin code"}
                value={pincode}
                onChange={handleChange}
                className="about-you-input"
                id="about-you-pincode"
                label="Pin code*"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  classes: {
                    root: classes.label,
                  },
                }}
              />
            </Grid>
          </Grid>
          <ThemeProvider theme={theme}>
            <InputTextField
              value={bio}
              onChange={handleChange}
              color="primary"
              className="about-you-input"
              id="about-you-bio"
              label="Bio"
              variant="outlined"
              fullWidth
              multiline={true}
              rows={5}
              InputProps={{ style: { borderRadius: "12px 12px 0 0" } }}
              InputLabelProps={{
                classes: {
                  root: classes.label,
                },
              }}
            />
          </ThemeProvider>
        </React.Fragment>
      )}
    </div>
  );
};

export default AboutYou;
