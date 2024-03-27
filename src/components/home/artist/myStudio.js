import React, { useEffect, useState } from "react";
import "./myStudio.scss";
import { useHistory } from "react-router-dom";
import { ArtistSnippet } from "../../../apis/apiCalls";

import CircularProgress from "@material-ui/core/CircularProgress";
import Edit from "../../../images/Edit.svg";
// import ModelBig from '../../images/Model-big.svg';
import Gallery from "../../../images/gallery.svg";
import PlusButton from "../../../images/Plus.svg";
import Earning from "../../../images/Earning.svg";
import Buy from "../../../images/Buy.svg";
import Show from "../../../images/Show.svg";
import Heart from "../../../images/Heart.svg";
import Followers from "../../../images/3 User.svg";
import ticketStar from "../../../images/ticket-star.svg";
import bronze from "../../../images/bronze.svg";
import silver from "../../../images/silver.svg";
import gold from "../../../images/gold.svg";
import platinum from "../../../images/platinum.svg";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import Designs from "../../designs/designs";
import Navheader from "../../Nav-Header/Nav-Header";
import Analytics from "../../analytics/analytics";
import UnderReview from "../../under-review/under-review";
import DesignFAQ from "../../design-faq/design-faq";
import OrderManagement from "../../order-management/order-management";
import { useSelector } from "react-redux";
import {
  selectBio,
  selectFirstName,
  selectFollowers,
  selectLevel,
  selectMemberSince,
  selectProfilePicture,
  selectTotalDesigns,
  selectViews,
} from "../../../redux/Slices/artistSnippetSlice/artistSnippetSlice";
import { useDispatch } from "react-redux";
import {
  setFirstName,
  setLastName,
  setProfilePicture,
  setLevel,
  setBio,
  setTotalDesigns,
  setFollowers,
  setViews,
  setMemberSince,
} from "../../../redux/Slices/artistSnippetSlice/artistSnippetSlice";

import { setTab } from "../../../redux/Slices/userSignUpSlice/userSignUpSlice";
import { artistProfile } from "../../../initProfile";
import { TextField } from "@material-ui/core";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const StyledTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > span": {
      maxWidth: 70,
      width: "100%",
      borderBottom: "1px solid #1B1918",
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

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

const useStyles = makeStyles((theme) => ({
  Dashboard: {
    backgroundColor: "inherit",
    flexGrow: 1,
    boxShadow: "none",
    borderBottom: "2px solid #DCDCDC",
    width: "100%",
  },
  root: {
    backgroundColor: "#e5e5e5",
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
}));

const MyStudio = (props) => {
  const accessToken = localStorage.getItem("Access_Key");
  const refreshToken = localStorage.getItem("Refresh_Key");
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [text, setText] = useState("");
  let dispatch = useDispatch();

  dispatch(
    setTab({
      tab: 0,
    })
  );

  const bio = useSelector(selectBio);
  const level = useSelector(selectLevel);
  const totalDesigns = useSelector(selectTotalDesigns);
  const followers = useSelector(selectFollowers);
  const views = useSelector(selectViews);
  const memberSince = useSelector(selectMemberSince);
  const profilePicture = useSelector(selectProfilePicture);
  const firstName = useSelector(selectFirstName);

  const artistDispatch = (artist_data) => {
    dispatch(
      setFirstName({
        first_name: artist_data.first_name,
      })
    );
    dispatch(
      setLastName({
        last_name: artist_data.last_name,
      })
    );
    dispatch(
      setProfilePicture({
        profile_picture: `${process.env.REACT_APP_ROOT_URL}${artist_data.profile_picture}`,
      })
    );
    dispatch(
      setLevel({
        level: artist_data.level,
      })
    );
    dispatch(
      setBio({
        bio: artist_data.bio,
      })
    );
    dispatch(
      setTotalDesigns({
        total_designs: artist_data.total_designs,
      })
    );
    dispatch(
      setFollowers({
        followers: artist_data.followers,
      })
    );
    dispatch(
      setViews({
        views: artist_data.views,
      })
    );
    dispatch(
      setMemberSince({
        member_since: artist_data.member_since,
      })
    );
  };

  const history = useHistory();

  useEffect(() => {
    if (window.localStorage.getItem("Access_Key")) {
      window.localStorage.getItem("User_Type") === "Artist"
        ? history.push("/studio")
        : history.push("/home");
    } else {
      history.push("/");
    }
    setIsLoading(true);
    artistProfile(dispatch);
    setIsLoading(false);

    if (accessToken && refreshToken && firstName === "") {
      ArtistSnippet(accessToken, refreshToken)
        .then((artist_data) => {
          setIsLoading(false);
          artistDispatch(artist_data);
        })
        .catch((refreshed_data) => {
          setIsLoading(false);
          artistDispatch(refreshed_data);
        });
    }

    fetch(`${process.env.REACT_APP_ROOT_URL}/api/invite-friend`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (!result.detail) {
          setText(result.referral_code);
        }
      })
      .catch((error) => console.log("error", error));
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      {firstName === "" && isLoading ? (
        <div className={classes.root}>
          <CircularProgress className="loader" size={100} />
        </div>
      ) : (
        <div className="content-dashboard">
          <Navheader />
          <Grid container spacing={5}>
            <Grid className="left-container-dashboard" item md={3} xs={12}>
              <div className="left-content-wrapper">
                <div className="img-container">
                  <img
                    src={profilePicture}
                    alt="profile-pic"
                    className="profile-pic"
                  />
                </div>
                <h2 className="title-dashboard">{firstName}</h2>
                <p className="sub-title-dashboard">{level}</p>
                <div className="stats-points">
                  <div className="stats-level">
                    <div
                      style={{
                        width: "100%",
                        background: "#FFF0D4",
                        borderRadius: "4px",
                      }}
                    >
                      <div
                        style={{
                          height: "8px",
                          width: "10%",
                          borderRadius: "4px",
                          background: "#F9D41B",
                        }}
                      ></div>
                    </div>
                    <div className="stats-level-images">
                      <img src={bronze} alt="bronze" />
                      <img src={silver} alt="silver" />
                      <img src={gold} alt="gold" />
                      <img src={platinum} alt="platinum" />
                    </div>
                  </div>
                  <div className="stats-points-reward">
                    <div>
                      <img src={ticketStar} alt="ticket-star" /> Reward Points
                    </div>
                    <span>1000</span>
                  </div>
                  <Link to="/editprofile">
                    <Button variant="outlined">Redeem Points</Button>
                  </Link>
                </div>
                <div className="stats-invite">
                  <InputTextField
                    id="sharing-link"
                    value={text}
                    variant="outlined"
                    fullWidth
                    label="Referral Code"
                    disabled
                    InputLabelProps={{
                      classes: {
                        root: classes.label,
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    className="edit-button"
                    onClick={() => {
                      navigator.clipboard.writeText(text);
                    }}
                  >
                    Invite
                  </Button>
                </div>

                <p className="dashboard-footer">MEMBER SINCE: {memberSince}</p>
              </div>
            </Grid>
            <Grid className="right-container-dashboard" item md={9} xs={12}>
              <div className="right-content-wrapper">
                <Paper square className={classes.Dashboard}>
                  <StyledTabs
                    value={value}
                    onChange={handleChange}
                    aria-label="edit-profile-tabs"
                    TabIndicatorProps={{ style: { backgroundColor: "#000" } }}
                  >
                    <Tab
                      label="Feed"
                      className="tab-dashboard"
                      {...a11yProps(0)}
                    />
                    <Tab
                      label="Blogs & Trends"
                      className="tab-dashboard"
                      {...a11yProps(1)}
                    />
                    <Tab
                      label="Seminars & Competitions"
                      className="tab-dashboard"
                      {...a11yProps(2)}
                    />
                  </StyledTabs>
                </Paper>

                <TabPanel value={value} index={0}>
                  <div className="studio-tab-wrap">
                    <Designs />
                    <div>
                      <div className="studio-upgrade-card">
                        <h2 className="title-dashboard">Upgrade your plan</h2>
                        <span className="studio-upgrade-card-point">500</span>
                        <p>Points away from</p>
                        <h1>Silver Level</h1>
                        <Button
                          variant="contained"
                          style={{ background: "#FADD4B" }}
                        >
                          Instant Upgrade
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <div className="studio-tab-wrap">
                    <Analytics />
                    <div>
                      <div className="studio-upgrade-card">
                        <h2 className="title-dashboard">Upgrade your plan</h2>
                        <span className="studio-upgrade-card-point">500</span>
                        <p>Points away from</p>
                        <h1>Silver Level</h1>
                        <Button
                          variant="contained"
                          style={{ background: "#FADD4B" }}
                        >
                          Instant Upgrade
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <div className="studio-tab-wrap">
                    <UnderReview />
                    <div>
                      <div className="studio-upgrade-card">
                        <h2 className="title-dashboard">Upgrade your plan</h2>
                        <span className="studio-upgrade-card-point">500</span>
                        <p>Points away from</p>
                        <h1>Silver Level</h1>
                        <Button
                          variant="contained"
                          style={{ background: "#FADD4B" }}
                        >
                          Instant Upgrade
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabPanel>
              </div>
            </Grid>
          </Grid>
        </div>
      )}
    </React.Fragment>
  );
};

export default MyStudio;
