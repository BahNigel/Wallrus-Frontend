import Footer from "../footer/footer";
import MainNav from "../main-nav/main-nav";
import "./payment.scss";
import {
  Grid,
  Button,
  Paper,
  Tabs,
  withStyles,
  Tab,
  makeStyles,
} from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import PhonePeIcon from "../../../images/phonepe.svg";
import GooglePayIcon from "../../../images/google-pay.svg";
import UpiIdIcon from "../../../images/upi.svg";
import BackArrow from "../../../images/back-left-arrow.svg";

const RequestInstallationCheckbox = withStyles({
  root: {
    color: "#000",
    "&$checked": {
      color: "#000",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const SaveCardCheckbox = withStyles({
  root: {
    color: "#000",
    "&$checked": {
      color: "#000",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const radioStyles = makeStyles({
  root: {
    color: "#000",
  },
});

function StyledRadio(props) {
  const classes = radioStyles();

  return <Radio className={classes.root} color="#000" {...props} />;
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ padding: "25px 0px 0px 4px", minHeight: `${props.style}` }}
    >
      {value === index && children}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  PaymentTabs: {
    backgroundColor: "#fff",
    flexGrow: 1,
    borderTopLeftRadius: "12px",
    borderTopRightRadius: "12px",
    boxShadow: "none",
    borderBottom: "1px solid #DCDCDC",
    maxWidth: "100vw !important",
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

const StyledTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "start",
    backgroundColor: "transparent",
    "& > span": {
      maxWidth: 160,

      width: "100%",
      borderBottom: "1px solid #1B1918",
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const Payment = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [requestInstallation, setRequestInstallation] = React.useState(false);
  const [saveCard, setSaveCard] = React.useState(false);

  const [upi, setUpi] = React.useState("");

  const handleUpiChange = (event) => {
    setUpi(event.target.value);
  };

  const [savedOption, setSavedOption] = React.useState("");
  const handleSavedOptionChange = (event) => {
    setSavedOption(event.target.value);
  };

  return (
    <div>
      <MainNav />
      <div className="payment-container">
        <Button
          className="paymentBackBtn"
          onClick={() => window.history.back()}
        >
          Back
        </Button>
        <div className="paymentBackArrowContainer">
          <img
            src={BackArrow}
            alt="back"
            className="paymentBackArrow"
            onClick={() => window.history.back()}
          />
        </div>
        <h3 className="payment-container-title">Choose payment mode</h3>
        <Grid container spacing={1}>
          <Grid item xs={12} md={8}>
            <Grid container direction="column" spacing={0}>
              <Grid
                className="tab-grid-1"
                item
                xs
                style={{ padding: "0px 0px", borderRight: "1px solid #dcdcdc" }}
              >
                <Paper square className={classes.PaymentTabs}>
                  <StyledTabs
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="payment-tabs"
                    TabIndicatorProps={{ style: { backgroundColor: "#000" } }}
                    centered={false}
                  >
                    <Tab label="Saved Option" className="tab" disableRipple />
                    <Tab
                      label="Credit/Debit Card"
                      className="tab"
                      disableRipple
                    />
                    <Tab label="UPI" className="tab" disableRipple />
                    <Tab label="Netbanking" className="tab" disableRipple />
                  </StyledTabs>
                </Paper>
              </Grid>

              <Grid
                className="tab-grid-2"
                item
                xs
                style={{ padding: "0px 0px", borderRight: "1px solid #dcdcdc" }}
              >
                <TabPanel value={value} index={0}>
                  <div className="saved-option-container">
                    <RadioGroup
                      name="saved-option"
                      value={savedOption}
                      onChange={handleSavedOptionChange}
                    >
                      <FormControlLabel
                        style={{ marginBottom: "30px" }}
                        value="AmanSinghDebitCard"
                        control={<StyledRadio />}
                        label={
                          <span className="saved-option-labels">
                            Aman Singh Debit Card
                            <br />
                            <span className="saved-card-details">
                              **** 8190
                            </span>
                          </span>
                        }
                      />
                      {savedOption === "AmanSinghDebitCard" && (
                        <div className="saved-option-input-container">
                          <InputTextField
                            type="text"
                            id="saved-option-cvv-input"
                            label="CVV"
                            variant="outlined"
                            onInput={(e) => {
                              e.target.value = Math.max(
                                0,
                                parseInt(e.target.value)
                              )
                                .toString()
                                .slice(0, 3);
                            }}
                          />
                          <Button className="PayNowBtn">Pay now</Button>
                        </div>
                      )}

                      <FormControlLabel
                        style={{ marginBottom: "30px" }}
                        value="AmanSinghCreditCard"
                        control={<StyledRadio />}
                        label={
                          <span className="saved-option-labels">
                            Aman Singh Credit Card
                            <br />
                            <span className="saved-card-details">
                              **** 6745
                            </span>
                          </span>
                        }
                      />
                      {savedOption === "AmanSinghCreditCard" && (
                        <div className="saved-option-input-container">
                          <InputTextField
                            type="text"
                            id="saved-option-cvv-input"
                            label="CVV"
                            variant="outlined"
                            onInput={(e) => {
                              e.target.value = Math.max(
                                0,
                                parseInt(e.target.value)
                              )
                                .toString()
                                .slice(0, 3);
                            }}
                          />
                          <Button className="PayNowBtn">Pay now</Button>
                        </div>
                      )}
                    </RadioGroup>
                  </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <div className="credit-debit-card-container">
                    <InputTextField
                      fullWidth
                      type="text"
                      className="card-inputs"
                      id="card-number"
                      label="Card number"
                      variant="outlined"
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 16);
                      }}
                    />
                    <InputTextField
                      className="card-inputs"
                      fullWidth
                      type="text"
                      id="name-on-card"
                      label="Name on card"
                      variant="outlined"
                    />
                    <Grid container>
                      <Grid item xs={6} className="validity-container">
                        <InputTextField
                          className="card-inputs"
                          fullWidth
                          id="valid-thru"
                          label="Valid thru (MM/YY)"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={6} className="cvv-container">
                        <InputTextField
                          className="card-inputs"
                          fullWidth
                          type="text"
                          id="cvv"
                          label="CVV"
                          variant="outlined"
                          onInput={(e) => {
                            e.target.value = Math.max(
                              0,
                              parseInt(e.target.value)
                            )
                              .toString()
                              .slice(0, 3);
                          }}
                        />
                      </Grid>
                    </Grid>
                    <FormControlLabel
                      control={
                        <SaveCardCheckbox
                          checked={saveCard}
                          onChange={() => setSaveCard(!saveCard)}
                        />
                      }
                      label="Save card details"
                    />
                    <Button className="PayNowBtn">Pay now</Button>
                  </div>
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <div className="upi-container">
                    <RadioGroup
                      name="upi"
                      value={upi}
                      onChange={handleUpiChange}
                    >
                      <FormControlLabel
                        style={{ marginBottom: "30px" }}
                        value="PhonePe"
                        control={<StyledRadio />}
                        label={
                          <span className="upi-radio-labels">
                            <img
                              src={PhonePeIcon}
                              alt="PhonePe"
                              className="phonepe-icon"
                            />{" "}
                            PhonePe
                          </span>
                        }
                      />
                      {upi === "PhonePe" && (
                        <div className="upi-id-input-container">
                          <InputTextField
                            className="upi-id-input"
                            fullWidth
                            id="phonepe-upi-id"
                            label="Enter UPI Id"
                            variant="outlined"
                          />
                          <Button className="PayNowBtn">Pay now</Button>
                        </div>
                      )}

                      <FormControlLabel
                        style={{ marginBottom: "30px" }}
                        value="GooglePay"
                        control={<StyledRadio />}
                        label={
                          <span className="upi-radio-labels">
                            <img
                              src={GooglePayIcon}
                              alt="GooglePay"
                              className="googlepay-icon"
                            />{" "}
                            Google Pay
                          </span>
                        }
                      />
                      {upi === "GooglePay" && (
                        <div className="upi-id-input-container">
                          <InputTextField
                            className="upi-id-input"
                            fullWidth
                            id="googlepay-upi-id"
                            label="Enter UPI Id"
                            variant="outlined"
                          />
                          <Button className="PayNowBtn">Pay now</Button>
                        </div>
                      )}

                      <FormControlLabel
                        style={{ marginBottom: "30px" }}
                        value="UPIId"
                        control={<StyledRadio />}
                        label={
                          <span className="upi-radio-labels">
                            <img
                              src={UpiIdIcon}
                              alt="upiId"
                              className="upiid-icon"
                            />{" "}
                            UPI Id
                          </span>
                        }
                      />
                      {upi === "UPIId" && (
                        <div className="upi-id-input-container">
                          <InputTextField
                            className="upi-id-input"
                            fullWidth
                            id="UPI-upi-id"
                            label="Enter UPI Id"
                            variant="outlined"
                          />
                          <Button className="PayNowBtn">Pay now</Button>
                        </div>
                      )}
                    </RadioGroup>
                  </div>
                </TabPanel>
                <TabPanel value={value} index={3}>
                  4
                </TabPanel>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4} className="payment-page-right-grid">
            <div className="payment-delivery-address">
              <h4>Deliver address:</h4>
              <span>
                Flat 304, Om Pragan, Bada Bazzar, Kolkata, West Bengal - 733201
              </span>
            </div>
            <div className="payment-price-details-container">
              <h4>Price details (3)</h4>
              <div className="payment-price-details">
                <div className="payment-total-mrp">
                  <span>Total MRP</span>
                  <span>&#8377; 2,700</span>
                </div>
                <div className="payment-wallrus-coins">
                  <span>Wallrus coins</span>
                  <span>-&#8377; 256</span>
                </div>
              </div>
            </div>
            <div className="payment-total-amount-container">
              <div className="payment-total-amount">
                <span>Total amount</span>
                <span>&#8377; 2,444</span>
              </div>
              <FormControlLabel
                control={
                  <RequestInstallationCheckbox
                    checked={requestInstallation}
                    onChange={() =>
                      setRequestInstallation(!requestInstallation)
                    }
                  />
                }
                label="Request installation."
              />
            </div>
          </Grid>
        </Grid>
      </div>
      <Footer />
    </div>
  );
};

export default Payment;
