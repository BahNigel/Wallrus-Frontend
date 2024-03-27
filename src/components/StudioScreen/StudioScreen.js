import { Avatar, Box } from "@material-ui/core";
import MainNav from "../home/main-nav/main-nav";
import img from "../../assets/images/picc.png";

import { useState, useEffect } from "react";

import { CircularProgress } from "@mui/material";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import "./studioScreen.css";
import { Divider } from "@mui/material";
import React from "react";
import axios from "axios";
import Card from "./Card/Card";
import ProfileCard from "./ProfileCard/ProfileCard";
const StyledTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "start",
    backgroundColor: "transparent",
    textColor: "#6F6F6F",
    borderBottom: "1px solid #222222",
    "& > span": {
      maxWidth: 0,

      width: "0%",
      borderBottom: "1px solid #222222",
    },
  },
  root: {
    maxWidth: "100% !important",
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);
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
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const StudioScreen = () => {
  const [value, setValue] = React.useState(0);
  const [userData, setUserData] = React.useState([]);
  const [blog, setBlog] = React.useState([]);
  const [userSnippet, setUserSnippet] = React.useState({});
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [UserLoaded, setUserLoaded] = React.useState(false);
  const [levels, setLevels] = React.useState([]);
  const [nextLevel, setNextLevel] = React.useState({});

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_ROOT_URL}/api/get-fllowed-artist-product`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("Access_Key")}`,
        },
      })
      .then((res) => {
        setUserData(res.data);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.log(err.response);
        setIsLoaded(true);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_ROOT_URL}/api/get-post/blog`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("Access_Key")}`,
        },
      })
      .then((res) => {
        setBlog(res.data);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.log(err.response);
        setIsLoaded(true);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_ROOT_URL}/api/decorator-snippet`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("Access_Key")}`,
        },
      })
      .then((res) => {
        setUserSnippet(res.data);
        setIsLoaded(true);
        axios
          .get(`${process.env.REACT_APP_ROOT_URL}/api/decorator-levels`, {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem(
                "Access_Key"
              )}`,
            },
          })
          .then((r) => {
            setLevels(r.data);
            let current;
            for (let i = 0; i < r.data.length; i++) {
              if (
                r.data[i].min_revenue > res.data.reward_points &&
                (!current ||
                  r.data[i].min_revenue < r.data[current].min_revenue)
              ) {
                current = i;
              }
            }
            setNextLevel({
              level: r.data[current].name,
              remaining: r.data[current].min_revenue - res.data.reward_points,
            });
          })
          .catch((err) => {
            console.log(err.response);
          });
      })
      .catch((err) => {
        console.log(err.response);
        setIsLoaded(true);
      });
  }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="main">
        <MainNav />

        <div className="mainLayout">
          <ProfileCard
            username={`${userSnippet.first_name}  ${userSnippet.last_name}`}
            level={userSnippet.level}
            img={`${process.env.REACT_APP_ROOT_URL}${userSnippet.profile_picture}`}
            rewardPoints={userSnippet.reward_points}
          />
          <div className="cart-container">
            <StyledTabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
            >
              <Tab className="tab" label={`Feed  `} {...a11yProps(0)} />
              <Tab className="tab" label="Blogs & Trends" {...a11yProps(1)} />
            </StyledTabs>
            <TabPanel value={value} index={0}>
              {isLoaded ? (
                userData
                  .map((item, i) => (
                    <Card
                      key={i}
                      img={`${process.env.REACT_APP_ROOT_URL}${item.artist_image}`}
                      username={item.artist}
                      designName={item.design_name}
                      designImage={`${process.env.REACT_APP_ROOT_URL}${item.productimage}`}
                    />
                  ))
                  .reverse()
              ) : (
                <div className="card">
                  <CircularProgress />
                </div>
              )}
            </TabPanel>
            <TabPanel value={value} index={1}>
              {isLoaded ? (
                blog?.map((item, i) => (
                  <Card
                    key={i}
                    img={img}
                    username={item.artist}
                    designName={item.title}
                    uploadTime={item.created_at}
                    designImage={`${process.env.REACT_APP_ROOT_URL}${item.image}`}
                  />
                ))
              ) : (
                <div className="card">
                  <CircularProgress />
                </div>
              )}
            </TabPanel>
          </div>
          <div
            className="rewardPointsCard"
            style={{ position: "sticky", top: 30 }}
          >
            <span className="textheader1">How many points away</span>
            <span className="rewardPointsValue">{nextLevel?.remaining}</span>
            <span className="textheader2">Points away from</span>
            <span className="textheader3">{nextLevel?.level}</span>
          </div>
        </div>
      </div>
    </>
  );
};
export default StudioScreen;
