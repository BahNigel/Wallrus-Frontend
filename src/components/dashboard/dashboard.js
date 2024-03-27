import React, { useEffect } from "react";
import "./dashboard.scss";
import { useHistory } from "react-router-dom";
import { ArtistSnippet, getArtistDesignList } from "../../apis/apiCalls";

import CircularProgress from "@material-ui/core/CircularProgress";
import Edit from "../../images/Edit.svg";
// import ModelBig from '../../images/Model-big.svg';
import Gallery from "../../images/gallery.svg";
import PlusButton from "../../images/Plus.svg";
import Earning from "../../images/Earning.svg";
import Buy from "../../images/Buy.svg";
import Show from "../../images/Show.svg";
import Heart from "../../images/Heart.svg";
import Followers from "../../images/3 User.svg";
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
import Designs from "../designs/designs";
import Navheader from "../Nav-Header/Nav-Header";
import Analytics from "../analytics/analytics";
import UnderReview from "../under-review/under-review";
import DesignFAQ from "../design-faq/design-faq";
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
import { useState } from "react";

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

const Dashboard = (props) => {
  const accessToken = localStorage.getItem("Access_Key");
  const refreshToken = localStorage.getItem("Refresh_Key");
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [artistId, setArtistId] = useState("");
  const [designs, setDesigns] = useState([]);
  const [artistAllData, setArtistAllData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

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

    if (accessToken && refreshToken) {
      ArtistSnippet(accessToken, refreshToken)
        .then((artist_data) => {
          setIsLoading(false);
          artistDispatch(artist_data);
          setArtistAllData(artist_data);
          getArtistDesignList(artist_data.Unique_id, currentPage)
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
  }, [history]);

  useEffect(() => {
    ArtistSnippet(accessToken, refreshToken).then((artist_data) => {
      getArtistDesignList(artist_data.Unique_id, currentPage)
        .then((res) => {
          setDesigns(res);
        })
        .catch((e) => console.log(e));
    });
  }, [currentPage]);
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
          <Navheader profilePicture={profilePicture} />
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
                <p className="about-you-dashboard">{bio}</p>
                <Link to="/editprofile">
                  <Button variant="contained" className="edit-button">
                    <img src={Edit} className="edit-logo" alt="" /> Edit Profile
                  </Button>
                </Link>
                <p className="stats-dashboard">STATS</p>
                <div className="stats-flex">
                  <div>
                    <img src={Gallery} className="left-image" alt=""></img>
                    <span>
                      <p className="left-attributes">Total designs</p>
                    </span>
                  </div>
                  <div>
                    <p className="right-attributes"> {totalDesigns} </p>
                  </div>
                </div>
                <div className="stats-flex">
                  <div>
                    <img src={Earning} className="left-image" alt=""></img>
                    <span>
                      <p className="left-attributes">Earning</p>
                    </span>
                  </div>
                  <div>
                    <p className="right-attributes">
                      {" "}
                      {artistAllData.earnings
                        ? artistAllData.earnings
                        : "0"}{" "}
                    </p>
                  </div>
                </div>
                <div className="stats-flex">
                  <div>
                    <img src={Buy} className="left-image" alt=""></img>
                    <span>
                      <p className="left-attributes">Sales</p>
                    </span>
                  </div>
                  <div>
                    <p className="right-attributes"> {artistAllData.sales} </p>
                  </div>
                </div>
                <div className="stats-flex">
                  <div>
                    <img src={Followers} className="left-image" alt=""></img>
                    <span>
                      <p className="left-attributes">Followers</p>
                    </span>
                  </div>
                  <div>
                    <p className="right-attributes"> {followers} </p>
                  </div>
                </div>
                <div className="stats-flex">
                  <div>
                    <img src={Heart} className="left-image" alt=""></img>
                    <span>
                      <p className="left-attributes">Favourite</p>
                    </span>
                  </div>
                  <div>
                    <p className="right-attributes">
                      {" "}
                      {artistAllData.favourite}{" "}
                    </p>
                  </div>
                </div>
                <div className="stats-flex">
                  <div>
                    <img src={Show} className="left-image" alt=""></img>
                    <span>
                      <p className="left-attributes">Views</p>
                    </span>
                  </div>
                  <div>
                    <p className="right-attributes"> {views ? views : "0"} </p>
                  </div>
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
                      label="Designs"
                      className="tab-dashboard"
                      {...a11yProps(0)}
                    />
                    <Tab
                      label="Analytics"
                      className="tab-dashboard"
                      {...a11yProps(1)}
                    />
                    <Tab
                      label="Under review"
                      className="tab-dashboard"
                      {...a11yProps(2)}
                    />
                    <Tab
                      label="Artist FAQs"
                      className="tab-dashboard"
                      {...a11yProps(3)}
                    />
                  </StyledTabs>
                </Paper>

                <TabPanel value={value} index={0}>
                  <Designs
                    designs={designs}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <Analytics />
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <UnderReview />
                </TabPanel>
                <TabPanel value={value} index={3}>
                  <DesignFAQ />
                </TabPanel>
              </div>

              <Link to="/upload-design">
                <Button variant="contained" className="upload-design-yellow">
                  <div className="yellow-btn-align">
                    <img
                      src={PlusButton}
                      height="20px"
                      width="20px"
                      alt=""
                    ></img>
                    <p>Upload Design</p>
                  </div>
                </Button>
              </Link>
            </Grid>
          </Grid>
        </div>
      )}
    </React.Fragment>
  );
};

export default Dashboard;
