import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import UserSettings from "../user-settings/user-settings";
import { Button } from "@material-ui/core";
import Logo from "../../images/logo.svg";

import "./header.scss";

const Header = () => {
    let opacity0, rotateRight, rotateLeft;

    const [show, setShow] = useState(false);

    const toggleHandler = () => {
        setShow(!show);
    }

    let displayClass = show ? "show" : "hide-routes";
    let displayBlock = show ? "display-block" : "display-none";
    if (show) {
      opacity0 = "opacity-0";
      rotateRight = "rotate-right";
      rotateLeft = "rotate-left";
    }

  return (
    <div className="landing-page-header">
      <Link to="/">
        <img src={Logo} alt="logo" className="logo" />
      </Link>
      <div className={`landing-page-routes ${displayClass}`} onClick={toggleHandler}>
        <Link to="/about-us" className="landing-page-route-links">
          About Us
        </Link>
        <Link to="/design-to-sell" className="landing-page-route-links">
          Design to sell
        </Link>
        <div className="landing-page-authentications" onClick={toggleHandler}>
          {!window.localStorage.getItem("Access_Key") ? (
            <React.Fragment>
              <Link to="/login" style={{ marginRight: "24px" }}>
                <Button className="landingPageLoginBtn">Log In</Button>
              </Link>
              <Link to="/signup">
                <Button className="landingPageSignupBtn">Sign Up</Button>
              </Link>
            </React.Fragment>
          ) : (
            <UserSettings />
          )}
        </div>
      </div>
      <div className="toggler" onClick={toggleHandler}>
        <div className={`span-1 ${rotateRight}`}></div>
        <div className={`span-2 ${opacity0}`}></div>
        <div className={`span-3 ${rotateLeft}`}></div>
      </div>
      <div className={`backdrop ${displayBlock}`}></div>
    </div>
  );
};

export default Header;
