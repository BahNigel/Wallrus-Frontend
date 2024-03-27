import React from "react";
import "./banner.scss";
import bannerImg1 from "../../images/banner-img1.svg";
import bannerArrow from "../../images/Stroke1.svg";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const BannerButton = (props) => {
  const history = useHistory();
  const handleBannerClick = (bannerclick) => {
    history.push("/uploaddesignform");
  };
  return (
    <>
      <Button
        variant="outlined"
        color="default"
        size="small"
        className="banner-button"
        onClick={
          props.children[0] !== undefined
            ? handleBannerClick
            : console.log("invite")
        }
      >
        {props.children}
      </Button>
      <Button
        variant="outlined"
        color="default"
        size="small"
        className="banner-button-mobile"
        onClick={
          props.children[0] !== undefined
            ? handleBannerClick
            : console.log("invite")
        }
      >
        {props.children}
      </Button>
    </>
  );
};

const Banner = (props) => {
  const { shopPage, homePage } = props;

  return (
    <div className="banner-container">
      <div className="banner-content">
        <div className="banner-image-container">
          {(shopPage && (
            <img src={bannerImg1} alt="banner-image" className="banner-image" />
          )) ||
            (homePage && (
              <img
                src={bannerImg1}
                alt="banner-image"
                className="banner-image"
              />
            ))}
        </div>
        <div className="banner-text">{props.children}</div>
        <div>
          <BannerButton>
            {shopPage && (
              <div className="upload-group">
                <span className="upload-now">Upload now</span>
                <span className="banner-button-arrow shop-arrow">
                  <img className="banner-arrow" src={bannerArrow} alt="" />
                </span>
              </div>
            )}
            {homePage && (
              <div>
                <span className="banner-button-text">Invite now</span>
                <span className="banner-button-arrow-container">
                  <img
                    src={bannerArrow}
                    alt=""
                    className="banner-button-arrow"
                  />
                </span>
              </div>
            )}
          </BannerButton>
        </div>
      </div>
    </div>
  );
};

export default Banner;
