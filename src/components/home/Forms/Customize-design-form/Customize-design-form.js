import React from "react";
import MainNav from "../../main-nav/main-nav";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import {
  Grid,
  Button,
  TextField,
  createMuiTheme,
  ThemeProvider,
  Select,
  MenuItem,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import "./Customize-design-form.scss";
import filterArrow from "../../../../images/arrow-down.svg";
import alertCircle from "../../../../images/alert-circle.svg";
import galleryimg from "../../../../images/Image.svg";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import validator from "validator";
import { customizeDesign } from "../formApiCalls";
import { getApplications, getProducts } from "../formApiCalls";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Fade from "@material-ui/core/Fade";
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

const CustomizeDesignForm = (props) => {
  const [appLoader, setAppLoader] = useState(true);
  const [prodLoader, setProdLoader] = useState(true);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [remark, setRemark] = useState("");
  const [application, setApplication] = useState();
  const [product, setProduct] = useState();
  const [submitLoader, setSubmitLoader] = useState(false);
  const [uploadImages, setUploadImages] = useState([]);
  const [validate, setValidate] = useState({
    name: true,
    phone: true,
    images: true,
    remark: true,
  });
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [state, setState] = React.useState({
    open: false,
    Transition: Fade,
  });
  // select list
  const [appList, setAppList] = useState([]);
  const [products, setProducts] = useState([]);
  const [widths, setWidths] = useState(["110", "210", "310", "410"]);
  const [heights, setHeights] = useState(["110", "210", "310", "410"]);
  const [units, setUnits] = useState(["MM", "IN"]);
  const classes = useStyles();

  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const [unit, setUnit] = useState(units[0]);
  const mainRef = React.useRef(null);

  const scroller = () => {
    mainRef.current.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  let upload;

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
        setProduct("No products found");
        setProdLoader(false);
      }
    });
  }, []);

  console.log(appList, product);

  const reset = () => {
    setName("");
    setPhone("");
    setRemark("");
    setUploadImages([]);
  };

  const validation = () => {
    const isName = name.trim().length > 0;
    const isPhone = validator.isMobilePhone(phone);
    const isRemark = name.trim().length > 0;
    const areImages = uploadImages.length > 0;

    setValidate({
      name: isName,
      phone: isPhone,
      remark: isRemark,
      images: areImages,
    });

    return isName && isPhone && isRemark && areImages;
  };
  const onSubmitHandler = async () => {
    if (validation()) {
      setSubmitLoader(true);

      customizeDesign({
        name,
        phone,
        remark,
        uploadImages,
        width,
        height,
        unit,
        application,
        product,
      }).then((res) => {
        if (res) {
          setSubmitLoader(false);
          // alert("Design customized successfully");
          setState({ ...state, open: true });
          setMessage("Design customized successfully");
          setErrorMessage("info");
          reset();
        } else {
          setSubmitLoader(false);
          // alert("Couldn't customize design");
          setState({ ...state, open: true });
          setMessage("Couldn't customize design");
          setErrorMessage("warning");
        }
      });
    }
  };

  const onImageChange = (e) => {
    setUploadImages(e.target.files);
  };

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

  const onApplicationChange = (e) => {
    setProdLoader(true);
    setApplication(e.target.value);
    getProducts(e.target.value).then((res) => {
      if (res && res.length !== 0) {
        setProducts(res);
        setProduct(res[0]?.slug);
        setProdLoader(false);
      } else {
        setProdLoader(false);
        setProducts([
          {
            name: "No products found",
            slug: "no data found",
          },
        ]);
        setProduct("No products found");
      }
    });
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
      <ThemeProvider theme={theme}>
        <div ref={mainRef}>
          <MainNav />
          <>
            <Button
              onClick={goBack}
              className="back-button-custom-design"
              variant="outlined"
            >
              Back
            </Button>
            <div className="customize-design-form-container">
              <div className="form-name">
                <h2>Customize this design</h2>
              </div>

              <div>
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
                  error={!validate.phone}
                  helperText={!validate.phone ? "Invalid Phone Number" : null}
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
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
                    <TextField
                      className="design-dimension-field"
                      arrowClosed={arrowClosed}
                      arrowOpen={arrowOpen}
                      placeholder="Width"
                      onChange={(e) => setWidth(e.value)}
                    />
                    <TextField
                      className="design-dimension-field"
                      arrowClosed={arrowClosed}
                      arrowOpen={arrowOpen}
                      placeholder="Height"
                      onChange={(e) => setHeight(e.value)}
                    />
                    <Dropdown
                      className="design-dimension-field"
                      arrowClosed={arrowClosed}
                      arrowOpen={arrowOpen}
                      options={units}
                      value={units[0]}
                      onChange={(e) => setUnit(e.value)}
                    />
                  </div>
                </div>

                <TextField
                  style={{ marginTop: "30px" }}
                  variant="outlined"
                  fullWidth
                  multiline={true}
                  rows={5}
                  label="Remarks"
                  onChange={(e) => setRemark(e.target.value)}
                  error={!validate.remark}
                  helperText={
                    !validate.remark ? "This field is required" : null
                  }
                  value={remark}
                />
                <p>
                  If you’ve a pictorial representation of the changes you
                  require or have a reference image, please upload the image.
                </p>
                <div>
                  <div className="drag-drop-designs-container">
                    <img
                      src={galleryimg}
                      style={{
                        width: "56px",
                        height: "56px",
                        marginTop: "10px",
                      }}
                      alt="img"
                    />
                    <p>
                      Drag and drop an image, or{" "}
                      {
                        <input
                          multiple
                          type="file"
                          style={{ display: "none" }}
                          onChange={(e) => onImageChange(e)}
                          ref={(ref) => (upload = ref)}
                          accept="image/*"
                        />
                      }
                      <span
                        style={{
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                        onClick={() => upload.click()}
                      >
                        Browse
                      </span>
                    </p>
                    <span>Maximum 4 images can be uploaded</span>
                    <Grid
                      container
                      className="design-upload-container"
                      xs={8}
                      spacing={2}
                      justify="space-between"
                      alignItems="space-between"
                    >
                      <Grid item className="design-upload" xs={2}>
                        {uploadImages.length >= 1 && (
                          <img
                            src={URL.createObjectURL(uploadImages[0])}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                            alt="upload-img"
                          />
                        )}
                      </Grid>
                      <Grid item className="design-upload" xs={2}>
                        {uploadImages.length >= 2 && (
                          <img
                            src={URL.createObjectURL(uploadImages[1])}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                            alt="upload-img"
                          />
                        )}
                      </Grid>
                      <Grid item className="design-upload" xs={2}>
                        {uploadImages.length >= 3 && (
                          <img
                            src={URL.createObjectURL(uploadImages[2])}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                            alt="upload-img"
                          />
                        )}
                      </Grid>
                      <Grid item className="design-upload" xs={2}>
                        {uploadImages.length >= 4 && (
                          <img
                            src={URL.createObjectURL(uploadImages[3])}
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
                  {!validate.images && (
                    <Typography color="error">
                      Upload at least 1 design image.
                    </Typography>
                  )}
                </div>
                <Button
                  className="submit-custom-design-btn"
                  variant="outlined"
                  onClick={onSubmitHandler}
                  disabled={submitLoader}
                >
                  {submitLoader ? (
                    <CircularProgress size={30} style={{ color: "#fff" }} />
                  ) : (
                    "Submit"
                  )}
                </Button>
                <span className="helper-text-custom-design-form">
                  {
                    <img
                      src={alertCircle}
                      className="alert-circle"
                      alt="alert-circle"
                    />
                  }
                  Wallrus Team will contact you for confirmation.
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

export default CustomizeDesignForm;
