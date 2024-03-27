import React, { useState } from "react";
import "./business-details.scss";
import TextField from "@material-ui/core/TextField";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import AlertCircle from "../../images/alert-circle.svg";
import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "@material-ui/lab/Skeleton";
import {
  setOrganization,
  setPan,
  setGst,
  selectAddress_Street_AboutYou,
  selectAddress_Apartment_AboutYou,
  selectState_AboutYou,
  selectCity_AboutYou,
  selectPincode_AboutYou,
  setEmail_Business,
  setPhoneNumber_Business,
  setAddress_Street_Business,
  setAddress_Apartment_Business,
  setState_Business,
  setCity_Business,
  setPincode,
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
} from "../../redux/Slices/userSignUpSlice/userSignUpSlice";

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

export default function BusinessDetails(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const organization = useSelector(selectOrganization);
  const pan = useSelector(selectPan);
  const gst = useSelector(selectGst);
  const emailBusiness = useSelector(selectEmail_Business);
  const phoneNumberBusiness = useSelector(selectPhoneNumber_Business);
  const addressStreet = useSelector(selectAddress_Street_Business);
  const addressApartment = useSelector(selectAddress_Apartment_Business);
  const cityBusiness = useSelector(selectCity_Business);
  const pincode = useSelector(selectPincode);
  const state = useSelector(selectState_Business);
  const addressStreetAboutyou = useSelector(selectAddress_Street_AboutYou);
  const addressApartmentAboutyou = useSelector(
    selectAddress_Apartment_AboutYou
  );
  const stateAboutyou = useSelector(selectState_AboutYou);
  const addressCityAboutyou = useSelector(selectCity_AboutYou);
  const addressPincodeAboutyou = useSelector(selectPincode_AboutYou);

  const [error, setError] = useState({
    organization: false,
    pan: false,
    gst: false,
    emailBusiness: false,
    phoneNumberBusiness: false,
    addressStreet: false,
    addressApartment: false,
    cityBusiness: false,
    pincode: false,
    state: false,
  });

  const [isGSTEligible, setIsGSTEligible] = useState(false);
  const [isSameAddress, setIsSameAddress] = useState(false);

  console.log(error.gst);

  if (!props.BusinessEditPage) {
    organization !== "" &&
    pan !== "" &&
    // gst !== '' &&
    emailBusiness !== "" &&
    phoneNumberBusiness !== "" &&
    addressStreet !== "" &&
    cityBusiness !== "" &&
    pincode !== "" &&
    state !== "" &&
    !error.organization &&
    !error.pan &&
    !error.gst &&
    !error.emailBusiness &&
    !error.phoneNumberBusiness &&
    !error.addressStreet &&
    !error.cityBusiness &&
    !error.pincode &&
    !error.state
      ? props.onChange(true)
      : props.onChange(false);
  }

  if (props.BusinessEditPage) {
    !error.organization &&
    !error.pan &&
    !error.gst &&
    !error.emailBusiness &&
    !error.phoneNumberBusiness &&
    !error.addressStreet &&
    !error.cityBusiness &&
    !error.pincode &&
    !error.state &&
    organization !== "" &&
    pan !== "" &&
    // gst !== '' &&
    emailBusiness !== "" &&
    phoneNumberBusiness !== "" &&
    addressStreet !== "" &&
    cityBusiness !== "" &&
    pincode !== "" &&
    state !== ""
      ? props.handleValidity(false)
      : props.handleValidity(true);
  }

  const regexPan = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  const regexGst = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  const regexEmail =
    /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  const regexOrganisation = /^[A-Za-z ]+$/;
  const regexAddress = /^[A-Za-z0-9,_.:#/() \-]+$/;

  const handleChange = (e) => {
    if (e.target.id == "business-details-organisation") {
      e.target.value === "" || !regexOrganisation.test(e.target.value)
        ? setError({ ...error, organization: true })
        : setError({ ...error, organization: false });
      dispatch(
        setOrganization({
          organization: e.target.value,
        })
      );
    } else if (e.target.id == "business-details-pan-card") {
      e.target.value === "" ||
      regexPan.test(e.target.value.toUpperCase()) === false
        ? setError({ ...error, pan: true })
        : setError({ ...error, pan: false });
      dispatch(
        setPan({
          pan: e.target.value.toUpperCase(),
        })
      );
    } else if (e.target.id == "business-details-gst-number") {
      if (!isGSTEligible) {
        e.target.value === "" ||
        regexGst.test(e.target.value.toUpperCase()) === false
          ? setError({ ...error, gst: true })
          : setError({ ...error, gst: false });
        dispatch(
          setGst({
            gst: e.target.value.toUpperCase(),
          })
        );
      }
    } else if (e.target.id == "business-details-email") {
      e.target.value === "" ||
      regexEmail.test(e.target.value.toLowerCase()) === false
        ? setError({ ...error, emailBusiness: true })
        : setError({ ...error, emailBusiness: false });
      dispatch(
        setEmail_Business({
          email_business: e.target.value.toLowerCase(),
        })
      );
    } else if (e.target.id == "business-details-phone-number") {
      e.target.value === "" || e.target.value.length != 10
        ? setError({ ...error, phoneNumberBusiness: true })
        : setError({ ...error, phoneNumberBusiness: false });
      dispatch(
        setPhoneNumber_Business({
          phoneNumber_business: e.target.value,
        })
      );
    } else if (e.target.id == "business-details-address-street") {
      e.target.value === "" || !regexAddress.test(e.target.value)
        ? setError({ ...error, addressStreet: true })
        : setError({ ...error, addressStreet: false });
      dispatch(
        setAddress_Street_Business({
          address_street_business: e.target.value,
        })
      );
    } else if (e.target.id == "business-details-address-home") {
      dispatch(
        setAddress_Apartment_Business({
          address_apartment_business: e.target.value,
        })
      );
    } else if (e.target.id == "business-details-city") {
      e.target.value === "" || !regexOrganisation.test(e.target.value)
        ? setError({ ...error, cityBusiness: true })
        : setError({ ...error, cityBusiness: false });
      dispatch(
        setCity_Business({
          city_business: e.target.value,
        })
      );
    } else if (e.target.id == "business-details-pincode") {
      e.target.value === "" || e.target.value.length != 6
        ? setError({ ...error, pincode: true })
        : setError({ ...error, pincode: false });
      dispatch(
        setPincode({
          pincode: e.target.value,
        })
      );
    } else if (e.target.id == "business-details-state") {
      e.target.value === "" || !regexOrganisation.test(e.target.value)
        ? setError({ ...error, state: true })
        : setError({ ...error, state: false });
      dispatch(
        setState_Business({
          state_business: e.target.value,
        })
      );
    }
  };

  const onGSTEligibleChangeHandler = (e) => {
    setIsGSTEligible(e.target.checked);
    if (e.target.checked) {
      setError({ ...error, gst: false });
      dispatch(
        setGst({
          gst: "",
        })
      );
    }
  };

  const onAddressCopyChangeHandler = (e) => {
    setIsSameAddress(e.target.checked);
    if (e.target.checked) {
      setError({
        ...error,
        addressStreet: false,
        addressApartment: false,
        cityBusiness: false,
        pincode: false,
        state: false,
      });
      dispatch(
        setAddress_Street_Business({
          address_street_business: addressStreetAboutyou,
        })
      );
      dispatch(
        setAddress_Apartment_Business({
          address_apartment_business: addressApartmentAboutyou,
        })
      );
      dispatch(
        setCity_Business({
          city_business: addressCityAboutyou,
        })
      );
      dispatch(
        setPincode({
          pincode: addressPincodeAboutyou,
        })
      );
      dispatch(
        setState_Business({
          state_business: stateAboutyou,
        })
      );
    }
  };

  return (
    <div className="businessDetails">
      <h1 className="business-details-title">Business Details</h1>
      <p className="business-details-sub-title">
        The following stationary details are required to transact on this
        platform
      </p>

      {props.editProfileLoading && props.BusinessEditPage ? (
        <div>
          <Skeleton animation="wave" className={classes.skeleton} height={80} />
          <Skeleton animation="wave" className={classes.skeleton} height={80} />
          <Skeleton animation="wave" className={classes.skeleton} height={80} />
          <Skeleton animation="wave" className={classes.skeleton} height={80} />
          <Skeleton animation="wave" className={classes.skeleton} height={80} />
          <Skeleton animation="wave" className={classes.skeleton} height={80} />
          <Skeleton animation="wave" className={classes.skeleton} height={80} />
          <Skeleton animation="wave" className={classes.skeleton} height={80} />
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
        </div>
      ) : (
        <React.Fragment>
          <InputTextField
            error={error.organization}
            helperText={
              error.organization && "Please enter your organization name"
            }
            value={organization}
            onChange={handleChange}
            className="business-details-input"
            id="business-details-organisation"
            label="Name / Organization name*"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              classes: {
                root: classes.label,
              },
            }}
          />

          <InputTextField
            error={error.pan}
            helperText={error.pan && "Please enter a valid PAN number"}
            value={pan}
            onChange={handleChange}
            className="business-details-input"
            id="business-details-pan-card"
            label="PAN card number*"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              classes: {
                root: classes.label,
              },
            }}
          />

          <InputTextField
            error={error.gst}
            helperText={error.gst && "Please enter a valid GST number"}
            value={gst}
            onChange={handleChange}
            className="business-details-input"
            id="business-details-gst-number"
            label="GST number*"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              classes: {
                root: classes.label,
              },
            }}
            disabled={isGSTEligible}
          />
          <div className="text-muted-tags">
            <input
              type="checkbox"
              id="gst-checkbox"
              name="GST"
              onChange={onGSTEligibleChangeHandler}
            />
            <label className="text-muted-business-details" for="GST">
              My business is not yet eligible for GST
            </label>
          </div>

          <InputTextField
            error={error.emailBusiness}
            helperText={error.emailBusiness && "Please enter a valid email-id"}
            value={emailBusiness}
            onChange={handleChange}
            className="business-details-input"
            id="business-details-email"
            label="Email*"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              classes: {
                root: classes.label,
              },
            }}
          />

          <InputTextField
            type="text"
            error={error.phoneNumberBusiness}
            helperText={
              error.phoneNumberBusiness && "Please enter a valid phone number"
            }
            value={phoneNumberBusiness}
            onChange={handleChange}
            className="business-details-input"
            id="business-details-phone-number"
            label="Phone Number*"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              classes: {
                root: classes.label,
              },
            }}
          />

          <InputTextField
            error={error.addressStreet}
            helperText={error.addressStreet && "Please enter your address"}
            value={addressStreet}
            onChange={handleChange}
            className="business-details-input"
            id="business-details-address-street"
            label="Address*"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              classes: {
                root: classes.label,
              },
            }}
            disabled={isSameAddress}
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
            className="business-details-input"
            id="business-details-address-home"
            label="Address"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              classes: {
                root: classes.label,
              },
            }}
            disabled={isSameAddress}
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
            error={error.state}
            helperText={error.state && "Please enter your state"}
            value={state}
            onChange={handleChange}
            className="business-details-input"
            id="business-details-state"
            label="State*"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              classes: {
                root: classes.label,
              },
            }}
            disabled={isSameAddress}
          />

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <InputTextField
                error={error.cityBusiness}
                helperText={error.cityBusiness && "Please enter your city"}
                value={cityBusiness}
                onChange={handleChange}
                className="business-details-input"
                id="business-details-city"
                label="City*"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  classes: {
                    root: classes.label,
                  },
                }}
                disabled={isSameAddress}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputTextField
                type="text"
                error={error.pincode}
                helperText={error.pincode && "Please enter your Pin code"}
                value={pincode}
                onChange={handleChange}
                className="business-details-input"
                id="business-details-pincode"
                label="Pin code*"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  classes: {
                    root: classes.label,
                  },
                }}
                disabled={isSameAddress}
              />
            </Grid>
          </Grid>
          <div className="text-muted-tags">
            <input
              type="checkbox"
              id="gst-checkbox"
              name="address"
              onChange={onAddressCopyChangeHandler}
            />
            <label className="text-muted-business-details" for="GST">
              Business address same as permanent address
            </label>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}
