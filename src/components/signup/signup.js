import "./signup.scss";
import React, { useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import StepConnector from "@material-ui/core/StepConnector";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { useState } from "react";
import Logo from "../../images/logo.svg";
import AccountType from "../account-type/account-type";
import CreateAccount from "../create-account/create-account";
import validator from "validator";
import AboutYou from "../about-you/about-you";
import BusinessDetails from "../business-details/business-details";
import BankDetails from "../bank-details/bank-details";
import BlackArrow from "../../images/black-arrow.svg";
import WhiteArrow from "../../images/white-arrow.svg";
import Left from "../../images/chevron-left.svg";
import { Link } from "react-router-dom";
// import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectFullName } from "../../redux/Slices/userSignUpSlice/userSignUpSlice";
import { selectAccountType } from "../../redux/Slices/userSignUpSlice/userSignUpSlice";
import Otp from "../otp/otp";
import { resetProfileData } from "./resetEditProfile";
import { useDispatch } from "react-redux";

const GreenConnector = withStyles({
  alternativeLabel: {
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  active: {
    "& $line": {
      borderColor: "#00B879",
    },
  },
  completed: {
    "& $line": {
      borderColor: "#00B879",
    },
  },
  line: {
    borderColor: "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
    borderWidth: 2,
  },
})(StepConnector);

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  icon: {
    color: "#1B1918 !important",
    borderLeftColor: "red !important",
  },
  tick: {
    color: "#00B879 !important",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
    height: "-10px !important",
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return [
    "Select account type",
    "Create an account",
    "About you",
    "Business details",
    "Bank details",
  ];
}

export default function SignUp() {
  const accountType = useSelector(selectAccountType);
  const [aboutYouvalidity, setaboutYouValidity] = useState(false);
  const [bussinessValidity, setbusinessValidity] = useState(false);
  const [isEmail, setEmail] = useState(false);
  const [isPhone, setPhone] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [isSocial, setIsSocial] = useState({});
  // const history = useHistory();
  const handleValidity = (validity) => {
    if (activeStep === 2) {
      setaboutYouValidity(validity);
    }

    if (activeStep === 3) {
      setbusinessValidity(validity);
    }
  };
  const classes = useStyles();
  let [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  let [componentCount, setComponentCount] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    resetProfileData(dispatch);
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setComponentCount((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setComponentCount((prevActiveStep) => prevActiveStep - 1);
  };

  const renderOtp = (email, password) => {
    setEmailOrPhone(email);
    if (validator.isEmail(email) && password.length >= 8) {
      setEmail(true);
      setShowOtp(true);
    } else if (
      validator.isMobilePhone(email) &&
      validator.isStrongPassword(password)
    ) {
      setPhone(true);
      setShowOtp(true);
    }
  };

  const renderSignUp = () => {
    handleNext();
    setShowOtp(false);
  };

  const reverseOtp = () => {
    setShowOtp(false);
  };

  const switchComponents = (step) => {
    switch (step) {
      case 0:
        return <AccountType />;
      case 1:
        return (
          <CreateAccount
            clicked={(email, password) => renderOtp(email, password)}
            setIsSocial={setIsSocial}
            handleNext={handleNext}
          />
        );
      case 2:
        return <AboutYou onChange={handleValidity} isSocial={isSocial} />;
      case 3:
        return <BusinessDetails onChange={handleValidity} />;
      case 4:
        return <BankDetails isSocial={isSocial} />;
      default:
        <> </>;
    }
  };

  let fullName = useSelector(selectFullName);
  let [countForRedux, setcountForRedux] = useState(0);
  // if (fullName && countForRedux === 0) {
  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   setComponentCount((prevActiveStep) => prevActiveStep + 1);
  //   setcountForRedux(1);
  // }
  let otp = null;
  if (showOtp) {
    otp = (
      <Otp
        isEmail={isEmail}
        type="Email"
        email={emailOrPhone}
        renderSignUp={renderSignUp}
        prev={reverseOtp}
      />
    );
  } else if (isPhone) {
    otp = (
      <Otp
        isEmail={isEmail}
        type="Mobile Number"
        phone={emailOrPhone}
        renderSignUp={renderSignUp}
        prev={reverseOtp}
      />
    );
  }

  return (
    <>
      {showOtp ? (
        otp
      ) : (
        <div className="signupMainContainer">
          <Grid container spacing={2}>
            <Grid className="left-container" item md={3} xs={12}>
              <img src={Logo} alt="logo" className="logo" />
              <div className={classes.root}>
                <Stepper
                  activeStep={activeStep}
                  orientation="vertical"
                  className="stepperContainer"
                  connector={<GreenConnector />}
                >
                  {steps.map((label, index) => (
                    <Step key={label}>
                      <StepLabel
                        StepIconProps={{
                          classes: {
                            active: classes.icon,
                            completed: classes.tick,
                          },
                        }}
                      >
                        {label}
                      </StepLabel>
                      <StepContent>
                        <div
                          className={classes.actionsContainer}
                          id="actionContainer"
                        >
                          <img
                            src={BlackArrow}
                            alt="blackarrow"
                            className="blackArrow"
                          />
                        </div>
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>
              </div>
            </Grid>
            <Grid className="right-container" item md={8} xs={12}>
              <img
                src={Logo}
                alt="logo"
                className="logo-mobile"
                style={{ display: "none" }}
              />
              {activeStep === 0 ? (
                <React.Fragment></React.Fragment>
              ) : (
                <div>
                  <Button
                    id="backButton"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    <img src={Left} className="leftArrow" alt="" />
                  </Button>
                  {activeStep === 0 ? (
                    <></>
                  ) : (
                    <span className="currentStep">{activeStep + 1} of 5</span>
                  )}
                </div>
              )}

              {switchComponents(componentCount)}

              {activeStep === steps.length - 1 || activeStep === 1 ? (
                <React.Fragment></React.Fragment>
              ) : (
                <div>
                  <Button
                    id="nextButton"
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                    disabled={
                      activeStep === 0 && accountType === ""
                        ? true
                        : activeStep === 2 && !aboutYouvalidity
                        ? true
                        : activeStep === 3 && !bussinessValidity
                        ? true
                        : false
                    }
                  >
                    <span>
                      Next
                      <img
                        className="whiteArrow"
                        src={WhiteArrow}
                        alt="white-arrow"
                      />
                    </span>
                  </Button>
                  {activeStep === 0 || activeStep === 1 ? (
                    <div className="memberStatusSignUpMobile">
                      <span>Already a member?</span>
                      <Link to="/login" className="linkSignUpMobile">
                        Log in
                      </Link>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              )}
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
}
