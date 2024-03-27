import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./home.scss";
import { Button, Grid, TextField, CircularProgress } from "@material-ui/core";
import MainNav from "./main-nav/main-nav";
import Footer from "./footer/footer";
import Banner from "./banner";
import userImg from "../../images/model.svg";
import ProductCard from "./product-cards";
import design1 from "../../images/design1.svg";
import design2 from "../../images/design2.svg";
import design3 from "../../images/design3.svg";
import design4 from "../../images/design4.svg";
import Display from "../../images/Rectangle 875.svg";
import ProfileCard from "./profile-card";
import { LatestDesigns } from "../../apis/apiCalls";
import Cta from "../cta/cta";

const HomePage = () => {
  const [newDesigns, setNewDesigns] = useState([]);
  const [apiStatus, setApiStatus] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (window.localStorage.getItem("Access_Key")) {
      window.localStorage.getItem("User_Type") === "Artist"
        ? history.push("/dashboard")
        : history.push("/home");
    } else {
      history.push("/");
    }

    LatestDesigns().then((newDesignsList) => {
      setNewDesigns(newDesignsList);
      setApiStatus(true);
      // setApiStatus({ ...apiStatus, productList: true });
    });
  }, []);

  const designContents = [
    {
      designName: "Art Decon1",
      applications: "Wallpaper",
      name: "Jassie Mario",
      image: design1,
    },
    {
      designName: "Art Decon2",
      applications: "Curtains",
      name: "Ronald Richards",
      image: design2,
    },
    {
      designName: "Art Decon3",
      applications: "Table cloth",
      name: "Leslie Alexander",
      image: design3,
    },
    {
      designName: "Art Decon4",
      applications: "Curtain blinds",
      name: "Savannah Nguyen",
      image: design4,
    },
    {
      designName: "Art Decon2",
      applications: "Curtains",
      name: "Ronald Richards",
      image: design2,
    },
    {
      designName: "Art Decon3",
      applications: "Table cloth",
      name: "Leslie Alexander",
      image: design3,
    },

    {
      designName: "Art Decon1",
      applications: "Wallpaper",
      name: "Jassie Mario",
      image: design1,
    },
    {
      designName: "Art Decon4",
      applications: "Curtain blinds",
      name: "Savannah Nguyen",
      image: design4,
    },
  ];

  const profiles = [
    {
      designs: 230,
      followers: "2.5k",
      name: "Leslie Alexander",
    },
    {
      designs: 230,
      followers: "2.5k",
      name: "Leslie Alexander",
    },
    {
      designs: 230,
      followers: "2.5k",
      name: "Leslie Alexander",
    },
    {
      designs: 230,
      followers: "2.5k",
      name: "Leslie Alexander",
    },
    {
      designs: 230,
      followers: "2.5k",
      name: "Leslie Alexander",
    },
    {
      designs: 230,
      followers: "2.5k",
      name: "Leslie Alexander",
    },
    {
      designs: 230,
      followers: "2.5k",
      name: "Leslie Alexander",
    },
    {
      designs: 230,
      followers: "2.5k",
      name: "Leslie Alexander",
    },
  ];

  return (
    <div className="home-container">
      <MainNav />
      <Banner homePage>
        Invite friends to The Wallrus Company & get up to 2500 Coins for every
        person who sign up
      </Banner>

      <img className="display-img" src={Display} alt="" />

      <div className="home-container-padding" style={{ padding: "40px" }}>
        <p className="home-headers">DESIGNS OF THE WEEK</p>
        <Grid container style={{ justifyContent: "space-between" }}>
          {designContents.map((item, index) => (
            <ProductCard
              key={index}
              id={index}
              artist={item.artist_unique_id}
              image={item.image}
              userimg={userImg}
              artistname={item.name}
              generaldata
            />
          ))}
        </Grid>
      </div>
      <div className="home-container-padding" style={{ padding: "40px" }}>
        <p className="home-headers">TOP ARTISTS OF THE WEEK</p>
        <Grid container spacing={2}>
          {profiles.map((item, index) => (
            <Grid item xs={6} sm={6} md={4} lg={3}>
              <ProfileCard
                key={index}
                id={index}
                userimg={userImg}
                name={item.name}
                designs={item.designs}
                followers={item.followers}
                landingPage={false}
              />
            </Grid>
          ))}
        </Grid>
      </div>
      <div className="home-container-padding" style={{ padding: "40px" }}>
        <p className="home-headers">NEW DESIGNS</p>
        {apiStatus === false ? (
          <div className="application-loader-container">
            <div>
              <CircularProgress size={80} className="application-loader" />
            </div>
          </div>
        ) : (
          <Grid container spacing={2}>
            {newDesigns.map((item, index) => (
              <ProductCard
                key={index}
                id={index}
                image={
                  item.productimages_set.length !== 0
                    ? item.productimages_set[0]?.image
                    : ""
                }
                artist={item.artist_unique_id}
                userimg={userImg}
                artistname={item.artist}
                generaldata
              />
            ))}
          </Grid>
        )}
      </div>
      <Cta />
      <Footer />
    </div>
  );
};

export default HomePage;
