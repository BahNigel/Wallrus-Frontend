import React, { useState } from "react";
import MainNav from "../../main-nav/main-nav";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import {
  Button,
  TextField,
  Select,
  createMuiTheme,
  ThemeProvider,
  MenuItem,
  CircularProgress,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";
import filterArrow from "../../../../images/arrow-down.svg";
import alertCircle from "../../../../images/alert-circle.svg";
import "./upload-design-form.scss";
import { useEffect } from "react";
import validator from "validator";
import { uploadDesign } from "../formApiCalls";
import { getApplications, getProducts } from "../formApiCalls";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Fade from "@material-ui/core/Fade";
import arrow from "../../../../images/arrow-left.svg";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#000000",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  label: {
    color: "#000",
  },
  skeleton: {
    borderRadius: "12px 12px 0 0",
  },
}));

const UploadDesignForm = (props) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [application, setApplication] = useState("");
  const [product, setProduct] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [unit, setUnit] = useState("");
  const [remark, setRemark] = useState("");
  const [link, setLink] = useState("");
  const [price, setPrice] = useState("900");
  const [submitLoader, setSubmitLoader] = useState(false);
  const [appLoader, setAppLoader] = useState(true);
  const [prodLoader, setProdLoader] = useState(true);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [state, setState] = useState({
    open: false,
    Transition: Fade,
  });

  // selectors
  const [appList, setAppList] = useState([]);
  const [products, setProducts] = useState([]);
  const [widths, setWidths] = useState(["110", "210", "310", "410"]);
  const [heights, setHeights] = useState(["110", "210", "310", "410"]);
  const [units, setUnits] = useState(["MM", "IN"]);
  const [validate, setValidate] = useState({
    name: true,
    link: true,
    phone: true,
    remark: true,
  });
  const mainRef = React.useRef(null);

  useEffect(() => {
    getApplications().then((appsResponse) => {
      if (appsResponse && appsResponse.length !== 0) {
        setAppList(appsResponse);
        setApplication(appsResponse[0]?.slug);
        setAppLoader(false);

        getProducts(appsResponse[0]?.slug).then((prodsResponse) => {
          if (prodsResponse) {
            setProducts(prodsResponse.results);
            setProduct(prodsResponse.results[0]?.slug);
            setProdLoader(false);
          }
        });
      } else {
        setAppList([
          {
            name: "No applications found",
            slug: "no data found",
          },
        ]);
        setApplication("No application found");
        setAppLoader(false);
        setProducts([
          {
            name: "No products found",
            slug: "no data found",
          },
        ]);
        setProduct([]);
        setProdLoader(false);
      }
    });

    setWidth(widths[0]);
    setHeight(heights[0]);
    setUnit(units[0]);
  }, []);

  const classes = useStyles();
  const goBack = () => {
    window.history.back();
  };
  const arrowClosed = (
    <img
      src={filterArrow}
      alt="arrow-closed"
      className="shop-filter-arrow-closed"
    />
  );
  const arrowOpen = (
    <img
      src={filterArrow}
      alt="arrow-open"
      className="shop-filter-arrow-open"
    />
  );

  const borderStyle = {
    borderRadius: "12px 12px 0 0",
  };

  const reset = () => {
    setName("");
    setPhoneNumber("");
    setRemark("");
    setLink("");
  };

  const validation = () => {
    const isName = name.trim().length > 0;
    const isLink = validator.isURL(link);
    const isPhone = validator.isMobilePhone(phoneNumber);
    const isRemark = remark.trim().length > 0;
    setValidate({
      name: isName,
      link: isLink,
      phone: isPhone,
      remark: isRemark,
    });

    return isName && isRemark && isLink && isPhone;
  };
  const onApplicationChange = (e) => {
    setProdLoader(true);
    setApplication(e.target.value);
    if (e.target.value !== "no data found") {
      getProducts(e.target.value).then((res) => {
        setProducts(res);
        setProdLoader(false);
      });
    } else {
      setProdLoader(false);
    }
  };
  const onSubmitHandler = async () => {
    if (validation()) {
      setSubmitLoader(true);

      uploadDesign({
        name,
        phoneNumber,
        application,
        product,
        width,
        height,
        unit,
        link,
        price,
        remark,
      }).then((res) => {
        if (res) {
          setSubmitLoader(false);
          // alert("Design Uploaded successfully");
          setState({ ...state, open: true });
          setMessage("Design Uploaded successfully");
          setErrorMessage("info");
          reset();
        } else {
          setSubmitLoader(false);
          // alert("Something went wrong!");
          setState({ ...state, open: true });
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

    setState({
      ...state,
      open: false,
    });
  };

  const scroller = () => {
    mainRef.current.scrollIntoView({ block: "start", behavior: "smooth" });
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
      <ThemeProvider theme={theme}>
        <div className="upload-design" ref={mainRef}>
          <MainNav />

          <>
            <div className="back-group">
              <img
                src={arrow}
                alt="arrowLeft"
                onClick={goBack}
                className="back-arrow"
              />
              <Button
                onClick={goBack}
                className="back-button-custom-design"
                variant="outlined"
              >
                Back
              </Button>
            </div>
            <div className="customize-design-form-container">
              <div className="form-name">
                <h2>Upload your own design</h2>
              </div>

              <div className="upload-form">
                <TextField
                  style={{ marginBottom: "30px" }}
                  variant="outlined"
                  InputLabelProps={{ classes: { root: classes.label } }}
                  fullWidth
                  label="Name"
                  error={!validate.name}
                  helperText={!validate.name ? "The Field is required" : null}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  value={name}
                />
                <TextField
                  style={{ marginBottom: "20px" }}
                  variant="outlined"
                  InputLabelProps={{ classes: { root: classes.label } }}
                  fullWidth
                  type="text"
                  label="Phone number"
                  style={{ borderRadius: "12px 12px 0 0 !important" }}
                  error={!validate.phone}
                  helperText={!validate.phone ? "Invalid Phone Number" : null}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  value={phoneNumber}
                />

                {appLoader ? (
                  <Skeleton
                    animation="wave"
                    height={100}
                    className={classes.skeleton}
                  />
                ) : (
                  <div>
                    <p>Select applications</p>
                    <Select
                      fullWidth
                      value={application}
                      variant="outlined"
                      onChange={(e) => onApplicationChange(e)}
                    >
                      {appList.map((app) => (
                        <MenuItem value={app.slug}>{app.name}</MenuItem>
                      ))}
                    </Select>
                  </div>
                )}
                {prodLoader ? (
                  <Skeleton
                    animation="wave"
                    height={100}
                    className={classes.skeleton}
                  />
                ) : (
                  <div style={{ marginTop: "30px" }}>
                    <p>Select products</p>
                    <Select
                      fullWidth
                      value={product}
                      variant="outlined"
                      onChange={(e) => setProduct(e.target.value)}
                    >
                      {products.map((app) => (
                        <MenuItem value={app.slug}>{app.design_name}</MenuItem>
                      ))}
                    </Select>
                  </div>
                )}
                <div>
                  <p>Dimensions</p>
                  <div className="customize-design-dimensions-container">
                    <Dropdown
                      className="design-dimension-field"
                      arrowClosed={arrowClosed}
                      arrowOpen={arrowOpen}
                      options={widths}
                      placeholder="Select"
                      value={widths[0]}
                      onChange={(e) => setWidth(e.value.toLowerCase())}
                    />
                    <Dropdown
                      className="design-dimension-field"
                      arrowClosed={arrowClosed}
                      arrowOpen={arrowOpen}
                      options={heights}
                      placeholder="Select"
                      value={heights[0]}
                      onChange={(e) => setHeight(e.value.toLowerCase())}
                    />
                    <Dropdown
                      className="design-dimension-field"
                      arrowClosed={arrowClosed}
                      arrowOpen={arrowOpen}
                      options={units}
                      value={units[0]}
                      onChange={(e) => setUnit(e.value.toLowerCase())}
                    />
                  </div>
                </div>

                <TextField
                  style={{ marginTop: "30px", marginBottom: "20px" }}
                  variant="outlined"
                  fullWidth
                  multiline={true}
                  rows={5}
                  label="Remarks"
                  error={!validate.remark}
                  helperText={!validate.remark ? "The Field is required" : null}
                  onChange={(e) => setRemark(e.target.value)}
                  value={remark}
                />
                <TextField
                  style={{ marginBottom: "20px" }}
                  variant="outlined"
                  fullWidth
                  type="text"
                  label="Link"
                  error={!validate.link}
                  helperText={!validate.link ? "Invalid link" : null}
                  onChange={(e) => setLink(e.target.value)}
                  value={link}
                />
                <span className="helper-text-custom-design-form">
                  {<img src={alertCircle} className="alert-circle" />}Attach
                  google drive, drop box link of your design
                </span>
                <ul className="list-container">
                  <li className="list-item">Design must be at least 150 DPI</li>
                  <li className="list-item">
                    Design must be EPS, PDF, AI, JPEG, or CDR formats
                  </li>
                  <li className="list-item">
                    Design must be in the CMYK Color format
                  </li>
                </ul>
                <div style={{ marginBottom: "30px" }}>
                  <p style={{ fontWeight: "600" }}>Price</p>
                  <span style={{ fontSize: "25px", fontWeight: "600" }}>
                    900
                  </span>
                  <span
                    style={{
                      fontWeight: "400",
                      color: "#6F6F6F",
                      marginLeft: "5px",
                      fontSize: "14px",
                    }}
                  >
                    {" "}
                    inclusive of all taxes
                  </span>
                </div>
                <Button
                  disabled={submitLoader}
                  className="submit-custom-design-btn"
                  variant="outlined"
                  onClick={onSubmitHandler}
                >
                  {submitLoader ? (
                    <CircularProgress
                      style={{ color: "#fff", marginRight: 20 }}
                      size={30}
                    />
                  ) : (
                    "Submit"
                  )}
                </Button>
                <span className="helper-text-custom-design-form">
                  {<img src={alertCircle} className="alert-circle" />}Wallrus
                  Team will contact you for confirmation.
                </span>
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
          </>
        </div>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default UploadDesignForm;
