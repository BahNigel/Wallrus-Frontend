import { Button } from "@material-ui/core";
import React from "react";
import DesignGroup from "../../../../images/design-group.png";
import Activity from "../../../activity/activity";
import Cta from "../../../cta/cta";
import Demand from "../../../demand/demand";
import Header from "../../../header/header";
import Footer from "../../footer/footer";
import Dropdowns from "../../../dropdowns/dropdowns";
import { Link } from "react-router-dom";
import Info from "../../../info/info";
import "./design-to-sell.scss";
import arrowForward from "../../../../images/arrow-forward.svg";

const DesignToSell = () => {
  return (
    <>
      <Header />
      <div className="sell-design">
        <div className="sell-design-banner flex">
          <div className="banner-1">
            <h2>Creativity. Community. And sweet, sweet cash too.</h2>
            <p className="margin-y-40 lh-2">
              If you are graphic designer, illustrator, photographer or anyone
              with art in your blood, The Wallrus Co. is the fastest and easiest
              way to see your creations come alive as interior decor
              applications.
            </p>
            <Link to="/signup">
              <Button variant="contained" className="btn-filled">
                Join now
              </Button>
            </Link>
          </div>
          <img className="only-desktop" src={DesignGroup} alt="img" />
        </div>
        <Info />
        <Activity />
        <Demand />
        <Dropdowns />
        <div className="design-cta margin-40">
          <h2>Start selling with Wallrus today</h2>
          <p className="bold text-grey margin-y-40">
            Be part of India’s first art + decor community
          </p>
          <Link to="signup">
            <Button variant="contained" className="btn-filled">
              Start selling
              <img className="margin-left-10" src={arrowForward} alt="img" />
            </Button>
          </Link>
        </div>
        <Cta />
      </div>
      <Footer />
    </>
  );
};

export default DesignToSell;
