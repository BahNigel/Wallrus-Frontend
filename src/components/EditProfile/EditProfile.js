import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import "./EditProfile.scss";
import AboutYou from "../about-you/about-you";
import BusinessDetails from "../business-details/business-details";
import BankDetails from "../bank-details/bank-details";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Skeleton from "@material-ui/lab/Skeleton";
import Grid from "@material-ui/core/Grid";
import ChangePass from "./PasswordChange";
import NotificationSettings from "./NotificationSettings";
import Navheader from "../Nav-Header/Nav-Header";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { getEditProfileDetails } from "../../apis/apiCalls";
import { Notificationsettings } from "../../apis/apiCalls";
import {
  setProfilePic,
  setFullName,
  setUserName,
  setEmail_AboutYou,
  setPhoneNumber_AboutYou,
  setAddress_Street_AboutYou,
  setAddress_Apartment_AboutYou,
  setState_AboutYou,
  setCity_AboutYou,
  setPincode_AboutYou,
  setBio,
  setOrganization,
  setPan,
  setGst,
  setEmail_Business,
  setPhoneNumber_Business,
  setAddress_Street_Business,
  setAddress_Apartment_Business,
  setState_Business,
  setCity_Business,
  setPincode,
  setAccountNumber,
  setIFSCCode,
  setBankName,
  setBankBranch,
  setSwiftCode,
  selectUserName,
  selectTab,
} from "../../redux/Slices/userSignUpSlice/userSignUpSlice";
import {
  setOldPassword,
  setNewPassword,
  setConfirmNewPassword,
} from "../../redux/Slices/changePasswordSlice/changePasswordSlice";
import { savePasswordChange } from "./SaveChangeHandler";

import {
  setDesignsViewNotification,
  setNewFollowerNotification,
  setFavouriteNotification,
  setPaymentsNotification,
  setPurchaseNotification,
  selectPaymentsFrequency,
  selectFollowersFrequency,
} from "../../redux/Slices/NotificationSettingSlice/NotificationSettingSlice";
import CustomButton from "../EditProfileSaveBtn/SaveBtn";
import ManageAccount from "./ManageAccount";
import HomeHeader from "../home/main-nav/main-nav";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Fade from "@material-ui/core/Fade";

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
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    borderRadius: "12px",
    padding: "40px",
  },
  root1: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    borderRadius: "12px",
  },
  MainContainer: {
    padding: "48px 0px 48px 0px",
    backgroundColor: "#e5e5e5",
  },
  MainContainer1: {
    padding: "20px 0px 20px 0px",
    backgroundColor: "#fff",
  },
  EditProfile: {
    backgroundColor: "#fff",
    flexGrow: 1,
    borderTopLeftRadius: "12px",
    borderTopRightRadius: "12px",
    boxShadow: "none",
    borderBottom: "1px solid #DCDCDC",
    width: "100vw !important",
  },
  List: {
    width: "100%",
    maxWidth: 260,
    backgroundColor: theme.palette.background.paper,
    marginLeft: "auto !important",
    position: "sticky !important",
    top: "5%",
    right: "5%",
  },
  ListItem: {
    color: "#6F6F6F",
    borderRadius: "8px",
  },
  active: {
    color: "#000",
  },
}));

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

const Editprofile = (props) => {
  const user_type = window.localStorage.getItem("User_Type");

  let dispatch = useDispatch();
  const classes = useStyles();
  const currentTab = useSelector(selectTab);
  const [value, setValue] = React.useState(currentTab === "" ? 0 : currentTab);
  const [index, setIndex] = React.useState(1);
  const location = useLocation();
  const businessRef = React.useRef(null);
  const abtRef = React.useRef(null);
  const bankRef = React.useRef(null);
  const mainRef = React.useRef(null);
  const accessToken = localStorage.getItem("Access_Key");
  const refreshToken = localStorage.getItem("Refresh_Key");

  const userName = useSelector(selectUserName);
  const followerFrequency = useSelector(selectFollowersFrequency);
  let editProfileDisabled = false;
  const [AboutYouDisabled, setAboutYouDisabled] = useState(false);
  const [BusinessDisabled, setBusinessDisabled] = useState(false);
  const [BankDisabled, setBankDisabled] = useState(false);
  const [ChangePassDisabled, setChangePassDisabled] = useState(false);
  const [NotificationDisabled, setNotificationDisabled] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [state, setState] = React.useState({
    open: false,
    Transition: Fade,
  });

  const { oldPassword, newPassword, confirmNewPassword } = useSelector(
    (state) => state.changePassword
  );

  const EditProfileDispatch = (editProfiledata) => {
    dispatch(
      setProfilePic({
        profilePic:
          `${process.env.REACT_APP_ROOT_URL}${editProfiledata.User_Info.profile_picture}` ||
          "",
      })
    );
    dispatch(
      setEmail_AboutYou({
        email_aboutyou: editProfiledata.User_Info.email,
      })
    );
    dispatch(
      setFullName({
        fullName: `${editProfiledata.User_Info.first_name} ${editProfiledata.User_Info.last_name}`,
      })
    );
    dispatch(
      setUserName({
        userName: editProfiledata.User_Info.username,
      })
    );
    dispatch(
      setPhoneNumber_AboutYou({
        phoneNumber_aboutyou: editProfiledata.User_Info.phone,
      })
    );
    dispatch(
      setBio({
        bio: editProfiledata.User_Info.bio,
      })
    );
    dispatch(
      setAddress_Street_AboutYou({
        address_street_aboutyou: editProfiledata.User_Personal_Add_Info.line1,
      })
    );
    dispatch(
      setAddress_Apartment_AboutYou({
        address_apartment_aboutyou:
          editProfiledata.User_Personal_Add_Info.line2,
      })
    );
    dispatch(
      setCity_AboutYou({
        city_aboutyou: editProfiledata.User_Personal_Add_Info.city,
      })
    );
    dispatch(
      setPincode_AboutYou({
        pincode_aboutyou: editProfiledata.User_Personal_Add_Info.pincode,
      })
    );
    dispatch(
      setState_AboutYou({
        state_aboutyou: editProfiledata.User_Personal_Add_Info.state,
      })
    );
    dispatch(
      setOrganization({
        organization: editProfiledata.Business_Info.brand_name,
      })
    );
    dispatch(
      setPan({
        pan: editProfiledata.Business_Info.pan_card_number,
      })
    );
    dispatch(
      setGst({
        gst: editProfiledata.Business_Info.gst_number,
      })
    );
    dispatch(
      setEmail_Business({
        email_business: editProfiledata.Business_Info.email,
      })
    );
    dispatch(
      setPhoneNumber_Business({
        phoneNumber_business: editProfiledata.Business_Info.phone,
      })
    );
    dispatch(
      setAddress_Street_Business({
        address_street_business: editProfiledata.User_Business_Add_Info.line1,
      })
    );
    dispatch(
      setAddress_Apartment_Business({
        address_apartment_business:
          editProfiledata.User_Business_Add_Info.line2,
      })
    );
    dispatch(
      setCity_Business({
        city_business: editProfiledata.User_Business_Add_Info.city,
      })
    );
    dispatch(
      setPincode({
        pincode: editProfiledata.User_Business_Add_Info.pincode,
      })
    );
    dispatch(
      setState_Business({
        state_business: editProfiledata.User_Business_Add_Info.state,
      })
    );
    if (editProfiledata.Bank_Info) {
      dispatch(
        setAccountNumber({
          accountNumber: editProfiledata.Bank_Info.account_number,
        })
      );
      dispatch(
        setIFSCCode({
          ifscCode: editProfiledata.Bank_Info.ifsc_code,
        })
      );
      dispatch(
        setBankName({
          bankName: editProfiledata.Bank_Info.name,
        })
      );
      dispatch(
        setBankBranch({
          bankBranch: editProfiledata.Bank_Info.branch,
        })
      );
      dispatch(
        setSwiftCode({
          swiftCode: editProfiledata.Bank_Info.swift_code,
        })
      );
    }
  };

  const NotificationSettingsDispatch = (Notification) => {
    if (user_type === "Artist") {
      dispatch(
        setNewFollowerNotification({
          follower_frequency: Notification.follower_frequency,
        })
      );
      dispatch(
        setDesignsViewNotification({
          designs_view_frequency: Notification.design_view_frequency,
        })
      );
      dispatch(
        setFavouriteNotification({
          favourite_frequency: Notification.design_favorite_frequency,
        })
      );
      dispatch(
        setPurchaseNotification({
          purchase_frequency: Notification.design_purchase_frequency,
        })
      );
      dispatch(
        setPaymentsNotification({
          payments_frequency: Notification.payment_frequency,
        })
      );
    } else if (user_type === "Interior Decorator") {
      dispatch(
        setNewFollowerNotification({
          follower_frequency: Notification.purchase_commision_update_frequency,
        })
      );
      dispatch(
        setDesignsViewNotification({
          designs_view_frequency: Notification.order_status_frequency,
        })
      );
      dispatch(
        setFavouriteNotification({
          favourite_frequency: Notification.new_artist_joined_frequency,
        })
      );
      dispatch(
        setPurchaseNotification({
          purchase_frequency:
            Notification.blog_news_event_notification_frequency,
        })
      );
      dispatch(
        setPaymentsNotification({
          payments_frequency:
            Notification.followed_artist_new_design_update_frequency,
        })
      );
    }
  };

  const [editProfileLoading, setEditProfileLoading] = useState(false);

  useEffect(() => {
    console.log("edit profile");
    if (accessToken && refreshToken) {
      // if (value === 0 && userName === "") {
      if (value === 0) {
        console.log("edit profile if");
        setEditProfileLoading(true);
        // GetEdit(accessToken, refreshToken)
        //   .then((artist_data) => {
        //     EditProfileDispatch(artist_data);
        //     setEditProfileLoading(false);
        //   })
        //   .catch((refreshed_data) => {
        //     EditProfileDispatch(refreshed_data);
        //     setEditProfileLoading(false);
        //   });
        getEditProfileDetails(accessToken)
          .then((artistData) => {
            if (artistData) {
              EditProfileDispatch(artistData);
              setEditProfileLoading(false);
            }
          })
          .catch((err) => {
            // console.log(err);
            // alert("Edit Profile: Something went wrong");
            setState({ ...state, open: true });
            setMessage("Edit Profile: Something went wrong");
            setErrorMessage("error");
            setEditProfileLoading(false);
          });
      }
      if (value === 2 && followerFrequency === "") {
        Notificationsettings(accessToken, refreshToken)
          .then((notificationSettings) => {
            // console.log(notificationSettings);
            console.log(notificationSettings);
            NotificationSettingsDispatch(notificationSettings);
          })
          .catch((refreshed_data) => {
            // console.log(refreshed_data);
            // alert("Notification Settings: Something went wrong");
            setState({ ...state, open: true });
            setMessage("Notification Settings: Something went wrong");
            setErrorMessage("error");
            setEditProfileLoading(false);
            NotificationSettingsDispatch(refreshed_data);
          });
      }
    }
  }, [value]);

  useEffect(() => {
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    let t = urlParams.get("t");
    if (t) {
      try {
        setValue(Number(t));
      } catch {}
    }
  }, [location]);

  if (AboutYouDisabled || BusinessDisabled || BankDisabled) {
    editProfileDisabled = true;
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (value === 0 || value === 2) {
    dispatch(
      setOldPassword({
        oldPassword: "",
      })
    );
    dispatch(
      setNewPassword({
        newPassword: "",
      })
    );
    dispatch(
      setConfirmNewPassword({
        confirmNewPassword: "",
      })
    );
  }

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
      <>
        <div ref={mainRef}>
          {user_type === "Artist" ? <Navheader /> : <HomeHeader />}
        </div>
        {/* {user_type === "Interior Decorator" && (
          <div className="back-savechanges-container">
            <Button
              className="editprofile-backbtn"
              onClick={() => window.history.back()}
            >
              Back
            </Button>
            {value !== 3 && (
              <CustomButton
                currentTab={value}
                editProfileValidity={editProfileDisabled}
                changePassValidity={ChangePassDisabled}
                notificationValidity={NotificationDisabled}
              >
                Save Changes
              </CustomButton>
            )}
          </div>
        )}
        {/* <div className="back-savechanges-container">
          <Button
            className="editprofile-backbtn"
            onClick={() => window.history.back()}
          >
            Back
          </Button>
          {value !== 3 && (
            <CustomButton
              currentTab={value}
              editProfileValidity={editProfileDisabled}
              changePassValidity={ChangePassDisabled}
              notificationValidity={NotificationDisabled}
            >
              Save Changes
            </CustomButton>
          )}
        </div> */}
        <Grid
          className={
            user_type === "Interior Decorator"
              ? classes.MainContainer1
              : classes.MainContainer
          }
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Grid
            container
            className={
              user_type === "Interior Decorator" ? classes.root1 : classes.root
            }
            spacing={0}
            item
            md={11}
          >
            <Paper square className={classes.EditProfile}>
              {/* {user_type === "Artist" && ( */}
              {true && (
                <div className="back-savechanges-container1">
                  <Button
                    className="editprofile-backbtn"
                    onClick={() => window.history.back()}
                  >
                    Back
                  </Button>
                  {value !== 3 && (
                    <CustomButton
                      currentTab={value}
                      editProfileValidity={editProfileDisabled}
                      changePassValidity={ChangePassDisabled}
                      notificationValidity={NotificationDisabled}
                    >
                      Save Changes
                    </CustomButton>
                  )}
                </div>
              )}
              <StyledTabs
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="edit-profile-tabs"
                TabIndicatorProps={{ style: { backgroundColor: "#000" } }}
                centered={false}
              >
                <Tab label="Edit profile" className="edittab" disableRipple />
                <Tab
                  label="Change password"
                  className="changetab"
                  disableRipple
                />
                <Tab
                  label="Notifications settings"
                  className="settingstab"
                  disableRipple
                />
                {/* <Tab
                  label="Manage Account"
                  className="managetab"
                  disableRipple
                /> */}
              </StyledTabs>
            </Paper>

            <Grid item md={12} container direction="row">
              <Grid item md={7}>
                <TabPanel value={value} index={0}>
                  <div>
                    <div>
                      <div ref={abtRef}>
                        <AboutYou
                          EditPage={true}
                          editProfileLoading={editProfileLoading}
                          handleValidity={(disabled) =>
                            setAboutYouDisabled(disabled)
                          }
                        />
                      </div>
                      <div ref={businessRef}>
                        <BusinessDetails
                          BusinessEditPage={true}
                          editProfileLoading={editProfileLoading}
                          handleValidity={(disabled) =>
                            setBusinessDisabled(disabled)
                          }
                        />
                      </div>
                      <div ref={bankRef}>
                        <BankDetails
                          BankEditPage={true}
                          editProfileLoading={editProfileLoading}
                          handleValidity={(disabled) =>
                            setBankDisabled(disabled)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </TabPanel>
              </Grid>
              <Grid item md={5}>
                <TabPanel value={value} index={0} style="100%">
                  <div className={classes.List}>
                    <List component="nav" aria-label="form-details">
                      <ListItem
                        button
                        selected={index === 1}
                        onClick={() => scroller("about")}
                        classes={{
                          root: classes.ListItem,
                          selected: classes.active,
                        }}
                      >
                        <ListItemText primary="About you" />
                      </ListItem>
                      <ListItem
                        button
                        selected={index === 2}
                        onClick={() => scroller("business")}
                        classes={{
                          root: classes.ListItem,
                          selected: classes.active,
                        }}
                      >
                        <ListItemText primary="Business details" />
                      </ListItem>
                      <ListItem
                        button
                        selected={index === 3}
                        onClick={() => scroller("bank")}
                        classes={{
                          root: classes.ListItem,
                          selected: classes.active,
                        }}
                      >
                        <ListItemText primary="Bank details" />
                      </ListItem>
                    </List>
                  </div>
                </TabPanel>
                <div className="back-to-top">
                  {value === 0 ? (
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
                  ) : null}
                </div>
              </Grid>
            </Grid>
            <Grid item md={7}>
              <TabPanel value={value} index={1}>
                <ChangePass
                  handleValidity={(disabled) => setChangePassDisabled(disabled)}
                />
              </TabPanel>
            </Grid>
            <Grid item md={12}>
              <TabPanel value={value} index={2}>
                <NotificationSettings
                  handleValidity={(disabled) =>
                    setNotificationDisabled(disabled)
                  }
                />
              </TabPanel>
            </Grid>
            {/* <Grid item md={12}>
              <TabPanel value={value} index={3}>
                <ManageAccount />
              </TabPanel>
            </Grid> */}
          </Grid>
        </Grid>
      </>
    </React.Fragment>
  );
};

export default Editprofile;
