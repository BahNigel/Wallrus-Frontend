import {
  Button,
  ButtonGroup,
  Grid,
  TextField,
  Box,
  Typography,
  ThemeProvider,
  createMuiTheme,
  CircularProgress,
} from "@material-ui/core";
import { useState, useRef } from "react";
import { withStyles } from "@material-ui/core/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import AlertCircle from "../../../../images/alert-circle.svg";
import Footer from "../../footer/footer";
import MainNav from "../../main-nav/main-nav";
import Image from "../../../../images/Image.svg";
import "./request-form.scss";
import validator from "validator";
import axios from "axios";
import { requestMeasurement } from "../formApiCalls";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Fade from "@material-ui/core/Fade";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const InputTextField = withStyles({
  root: {
    margin: "20px auto 20px auto !important",
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

const RequestForm = () => {
  const [name, setName] = useState("");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [date, setDate] = useState("");
  const [smartDate, setSmartDate] = useState("");
  const [remark, setRemark] = useState("");
  const [siteImages, setSiteImages] = useState([]);
  const [validate, setValidate] = useState({
    name: true,
    line1: true,
    state: true,
    city: true,
    pincode: true,
    date: true,
    timeFrame: true,
  });
  const [submitLoader, setSubmitLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [states, setStates] = useState({
    open: false,
    Transition: Fade,
  });
  const mainRef = useRef(null);

  const scroller = () => {
    mainRef.current.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  const goBack = () => {
    window.history.back();
  };

  let upload;

  const timeFrames = [
    "6:00 am - 10:00 am",
    "10:00 am - 2:00 pm",
    "2:00 pm - 6:00 pm",
    "6:00 pm - 9:00 pm",
  ];
  const [selectedTime, setSelectedTime] = useState(timeFrames[1]);
  const handleChange = (event, timeFrame) => {
    setSelectedTime(timeFrame);
    // console.log('timeFrame', timeFrame);
  };

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#000000",
      },
    },
  });

  const validation = () => {
    const isname = name.length > 0;
    const isline1 = line1.length > 0;
    const isstate = state.length > 0;
    const iscity = city.length > 0;
    const isdate = validator.isDate(date);
    const istimeFrame = selectedTime.length > 0;
    const ispincode = pincode.length === 6;

    setValidate({
      name: isname,
      line1: isline1,
      state: isstate,
      city: iscity,
      pincode: ispincode,
      date: isdate,
      timeFrame: istimeFrame,
    });

    return (
      isname &&
      isline1 &&
      iscity &&
      isstate &&
      isdate &&
      istimeFrame &&
      ispincode
    );
  };

  const reset = () => {
    setName("");
    setLine1("");
    setLine2("");
    setCity("");
    setState("");
    setDate("");
    setSelectedTime(timeFrames[1]);
    setPincode("");
    setRemark("");
    setSiteImages([]);
  };

  const dateChangeHandler = (e) => {
    const date = new Date(e.target.value);
    const array = date.toDateString().split(" ");
    const smartDate = [array[2], array[1], array[3]].join(" ");
    setDate(e.target.value);
    setSmartDate(smartDate);
  };

  const onSubmitHandler = async () => {
    if (validation()) {
      setSubmitLoader(true);

      requestMeasurement({
        name,
        line1,
        line2,
        state,
        city,
        pincode,
        smartDate,
        selectedTime,
        remark,
        siteImages,
      }).then((res) => {
        if (res) {
          setSubmitLoader(false);
          reset();
          // alert("Measurement requested successfully");
          setStates({ ...states, open: true });
          setMessage("Measurement requested successfully");
          setErrorMessage("info");
        } else {
          setSubmitLoader(false);
          // alert("Something went wrong!");
          setStates({ ...states, open: true });
          setMessage("Something went wrong!");
          setErrorMessage("warning");
        }
      });
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setStates({
      ...states,
      open: false,
    });
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        TransitionComponent={states.Transition}
        open={states.open}
        autoHideDuration={2000}
        onClose={handleClose}
        key={states.Transition.name}
      >
        <Alert
          onClose={handleClose}
          severity={errorMessage}
          // sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      <ThemeProvider theme={theme} ref={mainRef}>
        <MainNav />
        <div className="request-main-div">
          <Button onClick={goBack} className="back-button" variant="outlined">
            Back
          </Button>
          <div>
            <Grid
              className="request-sub-div"
              direction="column"
              justifyContent="center"
              alignItems="center"
              container
            >
              <h3>Request Measurement Form</h3>
              <Grid className="request-input-fields" item lg={12}>
                <TextField
                  className="blocked"
                  placeholder="Name"
                  style={{ borderRadius: "8px 8px 2px 2px" }}
                  label="Name*"
                  fullWidth
                  variant="outlined"
                  onChange={(e) => setName(e.target.value)}
                  error={!validate.name}
                  helperText={!validate.name ? "This field is required" : null}
                  value={name}
                ></TextField>
                <TextField
                  className="blocked-label"
                  placeholder="Address"
                  label="Address*"
                  fullWidth
                  variant="outlined"
                  onChange={(e) => setLine1(e.target.value)}
                  error={!validate.line1}
                  helperText={!validate.line1 ? "This field is required" : null}
                  value={line1}
                  style={{ marginBottom: "16px !important" }}
                ></TextField>
                <div className="text-muted-tags-request">
                  <div>
                    <img
                      src={AlertCircle}
                      className="edit-design-img"
                      alt=""
                      height="14px"
                      width="14px"
                    ></img>{" "}
                    <span className="text-muted-edit-design">
                      Street address or P.O box
                    </span>
                  </div>
                  <div>0/3</div>
                </div>
                <TextField
                  className="blocked-label"
                  placeholder="Address"
                  label="Address"
                  fullWidth
                  variant="outlined"
                  onChange={(e) => setLine2(e.target.value)}
                  value={line2}
                ></TextField>
                <div className="text-muted-tags-request">
                  <div>
                    <img
                      src={AlertCircle}
                      className="edit-design-img"
                      alt=""
                      height="14px"
                      width="14px"
                    ></img>{" "}
                    <span className="text-muted-edit-design">
                      Apartment, unit, building, floor
                    </span>
                  </div>
                  <div>0/3</div>
                </div>
                <TextField
                  className="blocked"
                  placeholder="State"
                  label="State*"
                  fullWidth
                  variant="outlined"
                  onChange={(e) => setState(e.target.value)}
                  error={!validate.state}
                  helperText={!validate.state ? "This field is required" : null}
                  value={state}
                ></TextField>
                <Box
                  display="grid"
                  style={{ gridTemplateColumns: "repeat(2, 1fr)", gridGap: 30 }}
                >
                  <TextField
                    placeholder="City"
                    style={{ marginRight: "20px" }}
                    fullWidth
                    label="City*"
                    variant="outlined"
                    onChange={(e) => setCity(e.target.value)}
                    error={!validate.city}
                    helperText={
                      !validate.city ? "This field is required" : null
                    }
                    value={city}
                  ></TextField>
                  <TextField
                    placeholder="Pincode"
                    fullWidth
                    label="Pincode*"
                    variant="outlined"
                    onChange={(e) => setPincode(e.target.value)}
                    error={!validate.pincode}
                    helperText={
                      !validate.pincode
                        ? "Please provide a valid pincode"
                        : null
                    }
                    value={pincode}
                  ></TextField>
                </Box>

                <TextField
                  type="date"
                  variant="outlined"
                  fullWidth
                  style={{ margin: "30px 0" }}
                  onChange={dateChangeHandler}
                  error={!validate.date}
                  helperText={
                    !validate.date ? "Please provide a valid date" : null
                  }
                  value={date}
                />

                <h2>Timeframe of measurement</h2>
                {/* <ButtonGroup
                  className="select-time"
                  color="primary"
                  aria-label="outlined primary button group"
                >
                  {timeFrames.map((el) => {
                    return (
                      <Button onClick={() => setTimeFrame(el)}>
                        {el.toUpperCase()}
                      </Button>
                    );
                  })}
                </ButtonGroup> */}

                <ToggleButtonGroup
                  className="select-time"
                  color="primary"
                  value={selectedTime}
                  exclusive
                  onChange={handleChange}
                >
                  {timeFrames.map((time) => {
                    return (
                      <ToggleButton value={time}>
                        {time.toUpperCase()}
                      </ToggleButton>
                    );
                  })}
                </ToggleButtonGroup>

                {!validate.timeFrame && (
                  <Typography style={{ color: "red" }}>
                    Please select a Time Frame of measurement
                  </Typography>
                )}
                <TextField
                  className="blocked-long"
                  fullWidth
                  placeholder="Remarks"
                  label="Remarks"
                  variant="outlined"
                  style={{ margin: "30px 0" }}
                  onChange={(e) => setRemark(e.target.value)}
                  value={remark}
                />
                <div>
                  <p>Site / wall image for reference</p>
                  <div className="drop-img">
                    <img
                      src={Image}
                      style={{
                        width: "56px",
                        height: "56px",
                        marginTop: "10px",
                      }}
                      alt="img"
                    />
                    <h3>
                      Drag and drop an image, or{" "}
                      <input
                        multiple
                        style={{ display: "none" }}
                        type="file"
                        ref={(ref) => (upload = ref)}
                        onChange={(e) => setSiteImages(e.target.files)}
                        accept="image/*"
                      />
                      <h3
                        style={{
                          textDecoration: "underline",
                          cursor: "pointer",
                          display: "inline",
                        }}
                        onClick={() => upload.click()}
                      >
                        Browse
                      </h3>
                    </h3>
                    <p>Maximum 4 images can be uploaded</p>
                    <Grid
                      className="mini-upload-container"
                      container
                      xs={8}
                      spacing={2}
                      justify="space-between"
                      alignItems="space-between"
                    >
                      <Grid item className="mini-upload" xs={6} lg={2}>
                        {siteImages.length >= 1 && (
                          <img
                            src={URL.createObjectURL(siteImages[0])}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                            alt="upload-img"
                          />
                        )}
                      </Grid>
                      <Grid item className="mini-upload" xs={6} lg={2}>
                        {siteImages.length >= 2 && (
                          <img
                            src={URL.createObjectURL(siteImages[1])}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                            alt="upload-img"
                          />
                        )}
                      </Grid>
                      <Grid item className="mini-upload" xs={6} lg={2}>
                        {siteImages.length >= 3 && (
                          <img
                            src={URL.createObjectURL(siteImages[2])}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                            alt="upload-img"
                          />
                        )}
                      </Grid>
                      <Grid item className="mini-upload" xs={6} lg={2}>
                        {siteImages.length >= 4 && (
                          <img
                            src={URL.createObjectURL(siteImages[3])}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                            alt="upload-img"
                          />
                        )}
                      </Grid>
                    </Grid>
                  </div>
                </div>
                <Button
                  className="submit-request"
                  variant="outlined"
                  onClick={onSubmitHandler}
                  disabled={submitLoader}
                >
                  {submitLoader ? (
                    <CircularProgress style={{ color: "#fff" }} size={30} />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>
        <div className="back-to-top">
          <Fab
            color="secondary"
            size="small"
            aria-label="scroll back to top"
            variant="round"
            className="fabIcon"
            onClick={() => scroller()}
          >
            <KeyboardArrowUpIcon />
          </Fab>
        </div>
      </ThemeProvider>
    </>
  );
};

export default RequestForm;
