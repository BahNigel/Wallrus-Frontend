import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { ArtistSnippet, getArtistDesignList } from "../../apis/apiCalls";
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
import Designs from "../designs/designs";
import PropTypes from "prop-types";
import "./MobileDashboard.scss";
import PlusButton from "../../images/Plus.svg";
import ModelBig from "../../images/Model-big.svg";
import Edit from "../../images/Edit.svg";
import Navheader from "../Nav-Header/Nav-Header";
import Gallery from "../../images/gallery.svg";
import Earning from "../../images/Earning.svg";
import Buy from "../../images/Buy.svg";
import Show from "../../images/Show.svg";
import Heart from "../../images/Heart.svg";
import Followers from "../../images/3 User.svg";
import DesignFAQ from "../design-faq/design-faq";
import UnderReview from "../under-review/under-review";
import Analytics from "../analytics/analytics";
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
} from "../../redux/Slices/artistSnippetSlice/artistSnippetSlice";
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
} from "../../redux/Slices/artistSnippetSlice/artistSnippetSlice";

import { setTab } from "../../redux/Slices/userSignUpSlice/userSignUpSlice";
import { artistProfile } from "../../initProfile";
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
  const accessToken = localStorage.getItem("Access_Key");
  const refreshToken = localStorage.getItem("Refresh_Key");
  const [value, setValue] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [designs, setDesigns] = useState([]);
  const [artistAllData, setArtistAllData] = useState({});
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
        ? history.push("/dashboard")
        : history.push("/home");
    } else {
      history.push("/");
    }
    setIsLoading(true);
    artistProfile(dispatch);
    setIsLoading(false);
    console.log(accessToken, refreshToken);
    if (accessToken && refreshToken && firstName === "") {
      ArtistSnippet(accessToken, refreshToken)
        .then((artist_data) => {
          setIsLoading(false);
          artistDispatch(artist_data);

          setArtistAllData(artist_data);
          getArtistDesignList(artist_data.Unique_id, 1)
            .then((res) => {
              setDesigns(res);
            })
            .catch((e) => console.log(e));
        })
        .catch((refreshed_data) => {
          setIsLoading(false);
          artistDispatch(refreshed_data);
        });
    }
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
      <Navheader
        mobile={true}
        className="mobileNav"
        mobileImg="mobileImg"
        profilePicture={profilePicture}
      />
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
              <Link to="/editprofile">
                <div className="mobile-edit-profile-container">
                  <Fab
                    size="small"
                    variant="round"
                    color="secondary"
                    className="edit-profile-fab-icon"
                    onClick={handleClick}
                  >
                    <img
                      src={Edit}
                      alt="edit-profile"
                      className="edit-button-mobile"
                    />
                  </Fab>
                </div>
              </Link>
            </div>
          </Grid>
          <Grid item xs style={{ paddingTop: "0px" }}>
            <div className="user-dashboard-mobile-bio">
              <p className="mobile-bio">{bio}</p>
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
                  // className="Stats-Mobile-Tab"
                  disableRipple
                  className={classes.root}
                />
                <Tab
                  label="Designs"
                  // className="Designs-Mobile-Tab"
                  disableRipple
                  className={classes.root}
                />
                <Tab
                  label="Analytics"
                  // className="Settings-Mobile-Tab"
                  disableRipple
                  className={classes.root}
                />
                <Tab
                  label="Under review"
                  // className="Settings-Mobile-Tab"
                  disableRipple
                  className={classes.root}
                />
                <Tab
                  label="Design FAQ"
                  // className="Settings-Mobile-Tab"
                  disableRipple
                  className={classes.root}
                />
              </StyledTabs>
            </Paper>
            <Grid item xs>
              <TabPanel value={value} index={0}>
                <div className="mobile-stats-container">
                  <div className="mobile-stats-flex">
                    <div>
                      <img
                        src={Gallery}
                        className="mobile-left-image"
                        alt=""
                      ></img>
                      <span>
                        <p className="mobile-stats-left-attributes">
                          Total designs
                        </p>
                      </span>
                    </div>
                    <div>
                      <p className="mobile-stats-right-attributes">
                        {" "}
                        {totalDesigns}{" "}
                      </p>
                    </div>
                  </div>
                  <div className="mobile-stats-flex">
                    <div>
                      <img
                        src={Earning}
                        className="mobile-left-image"
                        alt=""
                      ></img>
                      <span>
                        <p className="mobile-stats-left-attributes">Earning</p>
                      </span>
                    </div>
                    <div>
                      <p className="mobile-stats-right-attributes">
                        {" "}
                        {artistAllData.earnings
                          ? artistAllData.earnings
                          : "0"}{" "}
                      </p>
                    </div>
                  </div>
                  <div className="mobile-stats-flex">
                    <div>
                      <img src={Buy} className="mobile-left-image" alt=""></img>
                      <span>
                        <p className="mobile-stats-left-attributes">Sales</p>
                      </span>
                    </div>
                    <div>
                      <p className="mobile-stats-right-attributes">
                        {" "}
                        {artistAllData.sales}{" "}
                      </p>
                    </div>
                  </div>
                  <div className="mobile-stats-flex">
                    <div>
                      <img
                        src={Show}
                        className="mobile-left-image"
                        alt=""
                      ></img>
                      <span>
                        <p className="mobile-stats-left-attributes">
                          Followers
                        </p>
                      </span>
                    </div>
                    <div>
                      <p className="mobile-stats-right-attributes">
                        {" "}
                        {followers}{" "}
                      </p>
                    </div>
                  </div>
                  <div className="mobile-stats-flex">
                    <div>
                      <img
                        src={Heart}
                        className="mobile-left-image"
                        alt=""
                      ></img>
                      <span>
                        <p className="mobile-stats-left-attributes">
                          Favourite
                        </p>
                      </span>
                    </div>
                    <div>
                      <p className="mobile-stats-right-attributes">
                        {" "}
                        {artistAllData.favourite}{" "}
                      </p>
                    </div>
                  </div>
                  <div className="mobile-stats-flex">
                    <div>
                      <img
                        src={Followers}
                        className="mobile-left-image"
                        alt=""
                      ></img>
                      <span>
                        <p className="mobile-stats-left-attributes">Views</p>
                      </span>
                    </div>
                    <div>
                      <p className="mobile-stats-right-attributes">
                        {" "}
                        {views ? views : "0"}{" "}
                      </p>
                    </div>
                  </div>
                  <p className="mobile-stats-footer">
                    MEMBER SINCE: {memberSince}
                  </p>
                  <Link to="/upload-design">
                    <Button
                      variant="contained"
                      className="mobile-upload-button"
                    >
                      <div className="upload-button-wrapper">
                        <img
                          src={PlusButton}
                          alt="upload-design-button"
                          className="mobile-upload-image"
                        />
                        <span>Upload new design</span>
                      </div>
                    </Button>
                  </Link>
                </div>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <div>
                  <Designs mobile={true} designs={designs} />
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
                <div>
                  <DesignFAQ mobile={true} />
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
