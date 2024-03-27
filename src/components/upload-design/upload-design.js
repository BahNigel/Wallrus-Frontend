import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./upload-design.scss";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Chip, CircularProgress } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Navheader from "../Nav-Header/Nav-Header";
import { TextField } from "@material-ui/core";
import AlertCircle from "../../images/alert-circle.svg";
import Help from "../../images/help.svg";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import { Checkbox } from "@material-ui/core";
import Plus from "../../images/plus-btn.svg";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { AppList, TagList } from "../../apis/apiCalls";
import { useSelector } from "react-redux";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import {
  selectAppList,
  selectTagList,
  selectColorwayName,
  // selectSelectApplications,
  selectTagColour,
  // selectTagDesign,
  // selecttLink,
  // selectTagTheme,
  // selecttDesignName
} from "../../redux/Slices/uploadDesign/uploadDesignSlice";
import { useDispatch } from "react-redux";
import Skeleton from "@material-ui/lab/Skeleton";
import MultiSelect from "./colorways";
import { UploadDesignAPI } from "../../apis/apiCalls";

import {
  setAppList,
  setTagList,
  // setTagColour,
  selectLink,
  // setCounter
} from "../../redux/Slices/uploadDesign/uploadDesignSlice";

import Autocomplete from "@material-ui/lab/Autocomplete";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    borderRadius: "12px",
    padding: "40px",
  },
  MainContainer: {
    padding: "0px 0px 48px 0px",
    overflowY: "hidden !important",
    backgroundColor: "#e5e5e5",
  },

  autocompleteInput: {
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgb(59,59,59)",
      borderWidth: 1,
    },

    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  popupIndicator: {
    visibility: "hidden !important",
  },

  clearIndicator: {
    position: "relative",
    top: "-5px",
    right: "0px",
    width: "0px",
  },

  tag: {
    backgroundColor: "#1B1918",
    position: "relative",
    "& .MuiChip-label": {
      color: "#fff",
      textTransform: "uppercase !important",
    },
    "& .MuiChip-deleteIcon": {
      color: "#fff",
    },
  },
}));

const InputTextField = withStyles({
  root: {
    margin: "20px auto 20px auto !important",
    "& input + fieldset": {
      borderWidth: "1px !important",
      borderRadius: `12px 12px 0 0 !important`,
    },
    "& input:focus + fieldset": {
      borderColor: "black !important",
    },
    "& label.Mui-focused": {
      color: "black !important",
    },
  },
  input: {
    "&::placeholder": {
      color: "black !important",
    },
  },
})(TextField);

const BlackRadio = withStyles({
  root: {
    color: "#000",
    "&$checked": {
      color: "#000",
    },
  },
  checked: {},
})((props) => <Radio {...props} />);

const Div = (props) => {
  return <MultiSelect colorArray={props.colorArray} counter={props.counter} />;
};

const UploadDesign = (props) => {
  // let counter = 1;
  const history = useHistory();
  const classes = useStyles();
  const mainRef = React.useRef(null);
  const [value, setValue] = useState("");
  const [designNameState, setDesignNameState] = React.useState("");
  const [tagDesignSyleState, setTagDesignStyleState] = React.useState("");
  const [tagThemeState, setTagThemeState] = React.useState("");
  const [app, setApp] = React.useState([]);
  const [loading, setLoading] = useState(false);
  const accessToken = localStorage.getItem("Access_Key");
  const refreshToken = localStorage.getItem("Refresh_Key");
  const dispatch = useDispatch();
  const appList_arr = useSelector(selectAppList);
  const [disableTagsPattern, setDisableTagsPattern] = useState(false);
  const [disableTagsTheme, setDisableTagsTheme] = useState(false);
  const [colorWay, setColorWay] = useState(1);
  const [check, setCheck] = useState(false);
  const [totalTags, setTotalTags] = useState({
    pattern: 0,
    theme: 0,
  });
  const [limitCheck, setLimitCheck] = useState({
    pattern: false,
    theme: false,
  });
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [state, setState] = useState({
    open: false,
    Transition: Fade,
  });
  const [anchorEl, setAnchorEl] = useState(null);

  const colorNameSelectorValue = useSelector(selectColorwayName);
  const linkSelectorValue = useSelector(selectLink);
  const tagColourSelectorValue = useSelector(selectTagColour);

  const declareFunc = (e) => {
    setCheck(!check);
  };

  const handleChangeForApp = (event) => {
    let id = event.target.parentNode.id;
    // let intId = parseInt(id)
    if (app.includes(id)) {
      setApp(app.filter((item) => item !== id && !isNaN(item)));
    } else {
      setApp([...app, id]);
    }
  };

  const handleChangeForRadio = (event) => {
    setValue(event.target.value);
  };

  const handleMultipleFields = (e) => {
    setColorWay(colorWay + 1);
    renderDiv();
  };

  // const scroller = (props) => {
  //   if (props === 'main') {
  //     mainRef.current.scrollIntoView(
  //       { block: 'end', behavior: 'smooth' }
  //     );
  //   }
  // }

  const appListDispatch = (app_list_arr) => {
    dispatch(
      setAppList({
        app_list: app_list_arr,
      })
    );
  };

  const tagListDispatch = (tag_list_arr) => {
    dispatch(
      setTagList({
        tag_list: tag_list_arr,
      })
    );
  };

  const handleChange = (e) => {
    if (e.target.id === "design_name") {
      setDesignNameState(e.target.value);
    }
  };

  useEffect(() => {
    if (accessToken && refreshToken) {
      AppList(accessToken, refreshToken)
        .then((app_list2) => {
          appListDispatch(app_list2);
        })
        .catch((refreshed_data) => {});

      TagList(accessToken, refreshToken)
        .then((tag_list) => {
          tagListDispatch(tag_list);
        })
        .catch((refreshed_data) => {});
    }
  }, []);

  const tags = useSelector(selectTagList);
  const patternArray = []; // Style tag
  const colorArray = [];
  const themeArray = [];
  tags &&
    tags[2]?.tags.forEach((current) => {
      patternArray.push(current.name);
    });
  tags &&
    tags[1]?.tags.forEach((current) => {
      themeArray.push(current.name);
    });
  tags &&
    tags[0]?.tags.forEach((current) => {
      colorArray.push(current.name);
    });

  const add_new_colorway_array = [];

  for (const [i, name] of colorNameSelectorValue.entries()) {
    add_new_colorway_array[i] = {};
    add_new_colorway_array[i].name = name;
    add_new_colorway_array[i].tagColor = tagColourSelectorValue[i];
    add_new_colorway_array[i].link = linkSelectorValue[i];
  }

  const colorway = [];

  for (const [i, name] of colorNameSelectorValue.entries()) {
    colorway[i] = {};
    colorway[i].name = name;
    colorway[i].tagColor = tagColourSelectorValue[i];
    colorway[i].link = linkSelectorValue[i];
  }

  const upload_design_object = {
    designName: designNameState,
    selectApp: app.filter((current) => current !== ""),
    tagDesignStyle: tagDesignSyleState,
    tagTheme: tagThemeState,
    customizable: value,
    colorwayArray: add_new_colorway_array,
  };

  const handleClick = (e) => {
    if (
      upload_design_object.designName &&
      upload_design_object.selectApp.length &&
      upload_design_object.tagDesignStyle &&
      upload_design_object.tagTheme &&
      upload_design_object.colorwayArray.length
    ) {
      setLoading(true);
      UploadDesignAPI(accessToken, refreshToken, upload_design_object)
        .then((res) => {
          setLoading(false);
          history.push("/dashboard");
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          // alert("Could not upload your design");
          setState({ ...state, open: true });
          setMessage("Could not upload your design");
          setErrorMessage("warning");
        });
    } else {
      setState({ ...state, open: true });
      setMessage("All fields are required");
      setErrorMessage("warning");
    }
  };

  const scroller = (props) => {
    if (props === "about") {
      setIndex(1);
      abtRef.current.scrollIntoView({ block: "start", behavior: "smooth" });
    }
    if (props === "business") {
      setIndex(2);
      businessRef.current.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    }
    if (props === "bank") {
      setIndex(3);
      bankRef.current.scrollIntoView({ block: "start", behavior: "smooth" });
    }
    if (props === "main") {
      mainRef.current.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  };

  const renderDiv = () => {
    const divs = [];
    for (let i = 1; i <= colorWay; i++) {
      divs.push(<Div counter={i} colorArray={colorArray} />);
    }

    return divs;
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

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{
          horizontal: "center",
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
      <>
        <div ref={mainRef}>
          <Navheader />
        </div>
        <Grid
          className={classes.MainContainer}
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Grid container className={classes.root} spacing={0} item md={11}>
            <div className="button-wrapper">
              <div>
                <Link to="/dashboard">
                  <Button
                    variant="contained"
                    className="upload-design-cancel"
                    disableElevation
                  >
                    Cancel
                  </Button>
                </Link>
              </div>
            </div>

            <h3 className="upload-design-titlee">Upload your Design</h3>

            <div className="upload-design-form">
              <InputTextField
                className="upload-design-name"
                id="design_name"
                label="Design Name"
                onChange={handleChange}
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  classes: {
                    root: classes.label,
                  },
                }}
              />

              <div className="select-app">
                <h2>Select Applications</h2>
                <Grid container spacing={2}>
                  {appList_arr.length === 0 ? (
                    <div>
                      <Grid container md={12} spacing={3}>
                        <Grid item xs={12} md={3}>
                          <Skeleton
                            animation="wave"
                            className="skeleton"
                            width={130}
                            height={70}
                          />
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Skeleton
                            animation="wave"
                            className="skeleton"
                            width={130}
                            height={70}
                          />
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Skeleton
                            animation="wave"
                            className="skeleton"
                            width={130}
                            height={70}
                          />
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Skeleton
                            animation="wave"
                            className="skeleton"
                            width={130}
                            height={70}
                          />
                        </Grid>
                      </Grid>
                    </div>
                  ) : (
                    appList_arr.map((app_list_btn) => {
                      return (
                        <Grid item md={3}>
                          <Button
                            key={app_list_btn.id}
                            id={app_list_btn.name}
                            onClick={handleChangeForApp}
                            className={
                              app.find((e) => e === app_list_btn.name)
                                ? "selected-app"
                                : "unselected-app"
                            }
                          >
                            {app_list_btn.name}
                          </Button>
                        </Grid>
                      );
                    })
                  )}
                </Grid>
              </div>

              <Autocomplete
                multiple
                getOptionDisabled={() => disableTagsPattern}
                disabled={limitCheck.pattern}
                id="tags-outlined"
                options={patternArray.map((option) => option)}
                filterSelectedOptions
                onChange={(event, value) => {
                  setTagDesignStyleState(value);
                  setTotalTags({ ...totalTags, pattern: value.length });

                  if (value.length < 3) {
                    setDisableTagsPattern(false);
                    setLimitCheck({ ...limitCheck, pattern: false });
                  } else {
                    setDisableTagsPattern(true);
                    setLimitCheck({ ...limitCheck, pattern: true });
                  }
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                      disabled={false}
                    />
                  ))
                }
                classes={{
                  tag: classes.tag,
                  inputRoot: classes.autocompleteInput,
                  popupIndicator: classes.popupIndicator,
                  clearIndicator: classes.clearIndicator,
                }}
                renderInput={(params) => (
                  <InputTextField
                    {...params}
                    variant="outlined"
                    label="Tag design style"
                    placeholder="Eg: Abstract,Floral..."
                  />
                )}
              />
              <div className="text-muted-tags-upload">
                <div>
                  <img
                    src={AlertCircle}
                    className="upload-design-img"
                    alt=""
                    height="14px"
                    width="14px"
                  ></img>{" "}
                  <span className="text-muted-upload-design">
                    Maximum of 3 tags allowed
                  </span>
                </div>
                <div>{totalTags.pattern}/3</div>
              </div>

              <Autocomplete
                multiple
                getOptionDisabled={() => disableTagsTheme}
                disabled={limitCheck.theme}
                id="tags-outlined"
                options={themeArray.map((option) => option)}
                filterSelectedOptions
                onChange={(event, value) => {
                  setTagThemeState(value);
                  setTotalTags({ ...totalTags, theme: value.length });
                  if (value.length < 3) {
                    setDisableTagsTheme(false);
                    setLimitCheck({ ...limitCheck, theme: false });
                  } else {
                    setDisableTagsTheme(true);
                    setLimitCheck({ ...limitCheck, theme: true });
                  }
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                      disabled={false}
                    />
                  ))
                }
                classes={{
                  tag: classes.tag,
                  inputRoot: classes.autocompleteInput,
                  popupIndicator: classes.popupIndicator,
                  clearIndicator: classes.clearIndicator,
                }}
                renderInput={(params) => (
                  <InputTextField
                    {...params}
                    variant="outlined"
                    label="Tag theme"
                    placeholder="Eg: Vintage,Modern..."
                    onChange={handleChange}
                    id="tag_theme"
                  />
                )}
              />

              <div className="text-muted-tags-upload">
                <div>
                  <img
                    src={AlertCircle}
                    className="upload-design-img"
                    height="14px"
                    width="14px"
                    alt=""
                  ></img>{" "}
                  <span className="text-muted-upload-design">
                    Maximum of 3 tags allowed
                  </span>
                </div>
                <div>{totalTags.theme}/3</div>
              </div>

              <h2 className="customizable">
                Is this design customizable?
                <img
                  src={Help}
                  alt="?"
                  aria-owns={open ? "mouse-over-popover" : undefined}
                  aria-haspopup="true"
                  onMouseEnter={handlePopoverOpen}
                  onMouseLeave={handlePopoverClose}
                />
                <Popover
                  id="mouse-over-popover"
                  sx={{
                    pointerEvents: "none",
                    marginLeft: "0.34rem",
                  }}
                  className="infopop"
                  open={open}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "center",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  onClose={handlePopoverClose}
                  disableRestoreFocus
                >
                  <Typography
                    sx={{
                      p: 1,
                      color: "#fff",
                      fontSize: "12px",
                      fontWeight: "400",
                      fontFamily: "AvenirNextRegular",
                    }}
                  >
                    By selecting Yes, you are permitting The Wallrus Co. to make
                    alterations/changes to your design based on customers’
                    specific requirements. These could involve minor layout
                    changes, modifications of scale, colour etc. The modified
                    designs will not appear on future searches and will be sold
                    only to the specific customer who requested these changes.
                    The sale will still be credited to your account.
                  </Typography>
                </Popover>
              </h2>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="user-notifications"
                  name="notifications"
                  value={value}
                  onChange={handleChangeForRadio}
                  row
                  className="radio-container-upload"
                >
                  <FormControlLabel
                    value="Yes"
                    control={<BlackRadio size="small" />}
                    label="Yes"
                    className="radio-btn-upload"
                    style={{ marginRight: "20px" }}
                  />
                  <FormControlLabel
                    value="No"
                    control={<BlackRadio size="small" />}
                    label="No"
                    className="radio-btn-upload"
                    style={{ marginRight: "20px" }}
                  />
                </RadioGroup>
              </FormControl>

              {renderDiv()}

              <Button
                onClick={handleMultipleFields}
                className="add-new-colorway"
              >
                <img alt="" src={Plus} />
                Add new colorway
              </Button>

              <FormControlLabel
                className="declaration"
                value="declaration"
                control={<Checkbox color="" />}
                onClick={declareFunc}
                label={
                  <span
                    style={{
                      fontStyle: "normal",
                      fontWeight: "normal",
                      fontSize: "12px",
                      marginTop: "500px !important",
                      display: "flex",
                      alignItems: "flex-start",
                      color: "#6F6F6F",
                    }}
                  >
                    I declare that the artworks being uploaded are my own
                    creations and are not in violation of any copyright laws. I
                    also approve of its use by The Wallrus Co on this platform
                    under the conditions of the artist agreement
                  </span>
                }
              />

              {check ? (
                <Button onClick={handleClick} className="upload-design-final">
                  {loading ? (
                    <CircularProgress size={25} className="button-loader" />
                  ) : (
                    "Upload Now"
                  )}
                </Button>
              ) : (
                <Button disabled className="upload-design-final-disabled">
                  Upload Now
                </Button>
              )}
            </div>

            <div className="back-to-top">
              <Fab
                color="secondary"
                size="small"
                aria-label="scroll back to top"
                variant="round"
                className="fabIcon"
                onClick={() => scroller("main")}
              >
                <KeyboardArrowUpIcon />
              </Fab>
            </div>
          </Grid>
        </Grid>
      </>
    </React.Fragment>
  );
};

export default UploadDesign;
