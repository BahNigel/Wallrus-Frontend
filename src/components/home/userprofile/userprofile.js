import React, { useState, useEffect } from "react";
import "./userprofile.scss";
import MainNav from "../main-nav/main-nav";
import Footer from "../footer/footer";
import {
  Grid,
  Button,
  Paper,
  Tabs,
  withStyles,
  Tab,
  makeStyles,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import Hidden from "@material-ui/core/Hidden";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";
import userImg from "../../../images/model.svg";
import Edit from "../../../images/Edit.svg";
import design from "../../../images/design1.svg";
import { useHistory, useLocation } from "react-router-dom";
import ProductCard from "../../product-card/product-card";
import UserFollowing from "./user-profile-tabs-components/user-following/user-followings";
import UserOrders from "./user-profile-tabs-components/user-orders/user-orders";
import UserAnalytics from "./user-profile-tabs-components/user-analytics/user-analytics";
import UserWallrusCoins from "./user-profile-tabs-components/user-wallrus-coins/user-wallrus-coins";
// import InviteFriends from "./user-profile-tabs-components/invite-friends/invite-friends";
import { Link } from "react-router-dom";
import UserCollections from "./user-profile-tabs-components/user-collections/user-collections";
import {
  getDecoratorSnippet,
  getDecoratorFavourites,
} from "../../../apis/apiCalls";
import { setTab } from "../../../redux/Slices/userSignUpSlice/userSignUpSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import MyStudio from "../artist/myStudio";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Fade from "@material-ui/core/Fade";
import Pagination from "../../pagination/pagination";

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
  UserProfileTabs: {
    backgroundColor: "#fff",
    flexGrow: 1,
    borderTopLeftRadius: "12px",
    borderTopRightRadius: "12px",
    boxShadow: "none",
    borderBottom: "1px solid #DCDCDC",
    maxWidth: "100vw !important",
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

const UserProfile = (props) => {
  const classes = useStyles();
  const [loader, setloader] = useState(true);
  const [value, setValue] = useState(0);
  const location = useLocation();
  const [userDetails, setuserDetails] = useState({
    first_name: "",
    last_name: "",
    level: "",
    profile_picture: undefined,
  });
  const [designContents, setdesignContents] = useState([]);
  const [coins, setCoins] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [mobile, setMobile] = useState(false);
  const [state, setState] = React.useState({
    open: false,
    Transition: Fade,
  });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_ROOT_URL}/api/decorator-snippet`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("Access_Key")}`,
        },
      })
      .then((res) => {
        setCoins(res.data.reward_points);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setMobile(true);
    } else {
      setMobile(false);
    }

    window.addEventListener("resize", () => {
      if (window.innerWidth < 768) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    });

    return () => {
      window.removeEventListener("resize", () => {
        if (window.innerWidth < 768) {
          setMobile(true);
        } else {
          setMobile(false);
        }
      });
    };
  }, [mobile]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleTab = () => {
    dispatch(
      setTab({
        tab: 0,
      })
    );
  };

  const sample = [
    {
      designName: "Art Decon1",
      applications: "Wallpaper",
      name: "Jassie Mario",
      image: design,
    },
    {
      designName: "Art Decon2",
      applications: "Curtains",
      name: "Ronald Richards",
      image: design,
    },
    {
      designName: "Art Decon3",
      applications: "Table cloth",
      name: "Leslie Alexander",
      image: design,
    },
    {
      designName: "Art Decon4",
      applications: "Curtain blinds",
      name: "Savannah Nguyen",
      image: design,
    },
    {
      designName: "Art Decon2",
      applications: "Curtains",
      name: "Ronald Richards",
      image: design,
    },
    {
      designName: "Art Decon3",
      applications: "Table cloth",
      name: "Leslie Alexander",
      image: design,
    },

    {
      designName: "Art Decon1",
      applications: "Wallpaper",
      name: "Jassie Mario",
      image: design,
    },
    {
      designName: "Art Decon4",
      applications: "Curtain blinds",
      name: "Savannah Nguyen",
      image: design,
    },
  ];

  useEffect(() => {
    getDecoratorSnippet()
      .then((res) => {
        setuserDetails({
          first_name: res.first_name,
          last_name: res.last_name,
          level: res.level,
          profile_picture: res.profile_picture,
        });
      })
      .catch((err) => {
        // alert("Couldn't fetch your details")
        setState({ ...state, open: true });
        setMessage("Couldn't fetch your details");
        setErrorMessage("warning");
      });
    getDecoratorFavourites(currentPage)
      .then((res) => {
        let list = [];
        res.forEach((value) => {
          const design = {
            name: value.artist,
            image: value.image,
            artist_image: value.artist_image,
            sku: value.sku,
            slug: value.slug,
          };
          list.push(design);
        });
        setloader(false);
        console.log(list);
        setdesignContents(list);
      })
      .catch((err) => {
        // alert("Couldn't fetch your favorite designs")
        setState({ ...state, open: true });
        setMessage("Couldn't fetch your favorite designs");
        setErrorMessage("warning");
      });
  }, [currentPage]);

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

  const removeFavourite = (id) => {
    const favDesigns = [...designContents];
    const newFavDesigns = favDesigns.filter((design) => design.sku !== id);
    setdesignContents(newFavDesigns);
  };

  const handleClick = (slug) => {
    history.push(`shop/${slug}`);
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

  const PER_PAGE = 12;
  let pages = [];
  const length = designContents.length || 0;
  for (let i = 1; i <= Math.ceil(length / PER_PAGE); i++) {
    pages.push(i);
  }

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
      <div className="user-profile-page-container">
        <MainNav />
        <Grid container style={{ margin: "32px 0px" }}>
          <Grid item xs>
            <div className="user-profile-container">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <div className="user-profile-img-container">
                  {userDetails.profile_picture ? (
                    <img
                      src={
                        userDetails.profile_picture !== ""
                          ? `${process.env.REACT_APP_ROOT_URL}${userDetails.profile_picture}`
                          : userImg
                      }
                      className="user-profile-img"
                      alt="user profile"
                    />
                  ) : (
                    <Skeleton
                      animation="wave"
                      height={90}
                      width={90}
                      style={{ borderRadius: "50%", transform: "none" }}
                    />
                  )}
                </div>

                <div className="user-profile-details-container">
                  <h2 className="user-profile-name">
                    {userDetails.first_name + " " + userDetails.last_name}
                  </h2>
                  <p className="user-profile-experience">{userDetails.level}</p>
                </div>
              </div>
              <div className="user-profile-editBtn-container">
                <Link to="/editprofile">
                  <Button
                    variant="contained"
                    size="large"
                    className="user-profile-editBtn"
                    onClick={handleTab}
                  >
                    <img src={Edit} className="edit-btn-logo" alt="" />
                    <Hidden only={["xs", "sm"]}>
                      <span style={{ paddingLeft: "10px" }}>Edit profile</span>
                    </Hidden>
                  </Button>
                </Link>
              </div>
            </div>
          </Grid>
        </Grid>

        <div>
          <Grid container direction="column" spacing={0}>
            <Grid item xs style={{ padding: "0px 40px" }}>
              <Paper square className={classes.UserProfileTabs}>
                <StyledTabs
                  variant="scrollable"
                  value={value}
                  onChange={handleChange}
                  aria-label="edit-profile-tabs"
                  TabIndicatorProps={{ style: { backgroundColor: "#000" } }}
                  centered={false}
                >
                  <Tab label="Favourites" className="tab" disableRipple />
                  <Tab label="Collections" className="tab" disableRipple />
                  <Tab label="Analytics" className="tab" disableRipple />
                  <Tab label={`Following`} className="tab" disableRipple />
                  <Tab label="My order" className="tab" disableRipple />
                  <Tab label="Wallrus coins" className="tab" disableRipple />
                  {/* <Tab label="MyStudio" className="tab" disableRipple /> */}
                  {/* <Tab label="Invite friends" className="tab" disableRipple /> */}
                </StyledTabs>
              </Paper>
            </Grid>

            <Grid item xs>
              <TabPanel value={value} index={0}>
                {loader ? (
                  <div
                    style={{
                      display: "flex",
                      padding: "20vw 0",
                      width: "100%",
                      justifyContent: "center",
                    }}
                  >
                    <CircularProgress
                      size={50}
                      style={{ color: "#000", margin: "40px 0 60px" }}
                    />
                  </div>
                ) : designContents && designContents.length === 0 ? (
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "center",
                      padding: "10vw 0",
                    }}
                  >
                    No data to show
                  </div>
                ) : (
                  <div className="fav-design-grid">
                    {designContents.map((item, index) => (
                      <div style={{ width: "400px" }}>
                        <ProductCard
                          width={400}
                          key={item.sku}
                          id={item.slug}
                          sku={item.sku}
                          artist={item.artist_unique_id}
                          designImage={`${process.env.REACT_APP_ROOT_URL}${item.image}`}
                          designerImage={`${process.env.REACT_APP_ROOT_URL}${item.artist_image}`}
                          designerName={item.name}
                          isFavourite={true}
                          shouldRemoveFavourite
                          removeFavourite={() => removeFavourite(item.sku)}
                          onClick={() => handleClick(item.slug)}
                          general
                        />
                      </div>
                    ))}
                  </div>
                )}
                <Pagination
                  pages={pages}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <div>
                  <UserCollections />
                </div>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <div>
                  <UserAnalytics coins={coins} mobile={mobile} />
                </div>
              </TabPanel>
              <TabPanel value={value} index={3}>
                <div>
                  <UserFollowing />
                </div>
              </TabPanel>
              <TabPanel value={value} index={4}>
                <div>
                  <UserOrders />
                </div>
              </TabPanel>
              <TabPanel value={value} index={5}>
                <div>
                  <UserWallrusCoins coins={coins} />
                </div>
              </TabPanel>
              <TabPanel value={value} index={6}>
                <div>
                  <MyStudio />
                </div>
              </TabPanel>
              {/* <TabPanel value={value} index={6}>
                <div>
                  <InviteFriends />
                </div>
              </TabPanel> */}
            </Grid>
          </Grid>
        </div>

        <Footer />
      </div>
    </React.Fragment>
  );
};

export default UserProfile;
