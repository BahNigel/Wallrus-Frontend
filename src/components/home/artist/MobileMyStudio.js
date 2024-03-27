import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { ArtistSnippet } from "../../../apis/apiCalls";
import {
  Container,
  Grid,
  Fab,
  Paper,
  Tabs,
  Tab,
  makeStyles,
  withStyles,
  Button,
} from "@material-ui/core";
import Designs from "../../designs/designs";
import PropTypes from "prop-types";
import "./MobileMyStudio.scss";
import PlusButton from "../../../images/Plus.svg";
import ModelBig from "../../../images/Model-big.svg";
import Edit from "../../../images/Edit.svg";
import Navheader from "../../Nav-Header/Nav-Header";
import Gallery from "../../../images/gallery.svg";
import Earning from "../../../images/Earning.svg";
import Buy from "../../../images/Buy.svg";
import Show from "../../../images/Show.svg";
import Heart from "../../../images/Heart.svg";
import Followers from "../../../images/3 User.svg";
import DesignFAQ from "../../design-faq/design-faq";
import OrderManagement from "../../order-management/order-management";
import ticketStar from "../../../images/ticket-star.svg";
import bronze from "../../../images/bronze.svg";
import silver from "../../../images/silver.svg";
import gold from "../../../images/gold.svg";
import platinum from "../../../images/platinum.svg";
import UnderReview from "../../under-review/under-review";
import Analytics from "../../analytics/analytics";
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
import { TextField } from "@mui/material";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ padding: "25px 0px 0px 4px" }}
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

const StyledTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "start",
    position: "absolute",
    bottom: "0%",
    backgroundColor: "transparent",
    "& > span": {
      maxWidth: "90%",

      width: "80%",
      borderBottom: "1.5px solid #1B1918",
    },
  },
  root: {
    width: "95vw",
    borderBottom: "2px solid #F6F6F6",
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
  root: {
    maxWidth: "35%",
    fontSize: "14px !important",
    position: "relative",
    left: "0px",
    paddingLeft: "0px !important",
    position: "relative",
  },
  mobileTabsContainer: {
    boxShadow: "none",
  },
  mobileTabs: {},
}));

const MobileDashboard = (props) => {
  const [value, setValue] = React.useState(0);
  const accessToken = localStorage.getItem("Access_Key");
  const refreshToken = localStorage.getItem("Refresh_Key");
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  let dispatch = useDispatch();

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
  const handleClick = () => {
    console.log("mobile-edit-btn-clicked");
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const classes = useStyles();
  return (
    <div className="mobile-dashboardWrapper">
      <Navheader mobile={true} className="mobileNav" mobileImg="mobileImg" />
      <Container>
        <Grid container spacing={3} direction="column">
          <Grid item xs>
            <div className="user-description-mobile">
              <div className="user-img-container-mobile">
                <img
                  src={profilePicture}
                  alt="user-picture"
                  className="user-img-mobile"
                />
              </div>
              <div className="user-details-container-mobile">
                <h2 className="user-name">{firstName}</h2>
                <p className="user-experience">{level}</p>
              </div>
            </div>
          </Grid>
          <Grid item xs style={{ paddingTop: "0px" }}>
            <div className="user-dashboard-mobile-bio">
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
            </div>
          </Grid>
          <Grid item xs>
            <Paper square className={classes.mobileTabsContainer}>
              <StyledTabs
                variant="scrollable"
                value={value}
                onChange={handleChange}
                TabIndicatorProps={{ style: { backgroundColor: "#000" } }}
              >
                <Tab
                  label="Stats"
                  className="Stats-Mobile-Tab"
                  disableRipple
                  className={classes.root}
                />
                <Tab
                  label="Feed"
                  className="Stats-Mobile-Tab"
                  disableRipple
                  className={classes.root}
                />
                <Tab
                  label="Blogs & Trends"
                  className="Designs-Mobile-Tab"
                  disableRipple
                  className={classes.root}
                />
                <Tab
                  label="Seminars & Competitions"
                  className="Settings-Mobile-Tab"
                  disableRipple
                  className={classes.root}
                />
                <Tab
                  label="Upgrade"
                  className="Settings-Mobile-Tab"
                  disableRipple
                  className={classes.root}
                />
              </StyledTabs>
            </Paper>
            <Grid item xs>
              <TabPanel value={value} index={0}>
                <div className="mobile-stats-container">
                  <div className="stats-points">
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

                  <p className="dashboard-footer">
                    MEMBER SINCE: {memberSince}
                  </p>
                </div>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <div>
                  <Designs mobile={true} />
                </div>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <div>
                  <Analytics mobile={true} />
                </div>
              </TabPanel>
              <TabPanel value={value} index={3}>
                <div>
                  <UnderReview mobile={true} />
                </div>
              </TabPanel>
              <TabPanel value={value} index={4}>
                <div className="studio-upgrade-card-wrap">
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
              </TabPanel>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default MobileDashboard;
