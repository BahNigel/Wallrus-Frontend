import React, { useState } from "react";
import Logo from "../../images/logo.svg";
import Notification from "../../images/Notification.svg";
import Model from "../../images/model.svg";
import "./Nav-Header.scss";
import { Link } from "react-router-dom";
import Notifications from "../Notifications/Notification";
import NotificationDrawer from "../Notifications/Notification";
import UserSettings from "../user-settings/user-settings";

const Navheader = (props) => {
  const { mobile, className, mobileImg, profilePicture } = props;
  const [notificationList, setNotificationList] = useState(false);
  const [anchorEl, setAnchorEl] = useState();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={className ? className : "nav"}>
      <div className="nav-logo">
        <Link to="/dashboard">
          <img src={Logo} alt="logo" className="artist-logo" />
        </Link>
      </div>
      {mobile ? (
        <>
          <div className="mobile-nav-right-side">
            <div className="nav-right-content">
              <>
                <img
                  src={Notification}
                  alt="Notification"
                  onClick={(e) => handleClick(e)}
                />
                <Notifications handleClose={handleClose} anchorEl={anchorEl} />
              </>
              <UserSettings />
            </div>
          </div>
        </>
      ) : (
        <div className="nav-right-side">
          <div className="nav-right-content">
            <>
              <img
                src={Notification}
                alt="Notification"
                onClick={(e) => handleClick(e)}
              />
              <Notifications handleClose={handleClose} anchorEl={anchorEl} />
            </>
            {/* <img src={Notification} alt="notification" className='notification' /> */}
            {/* {notificationList ? <Notifications/> : null} */}
            <UserSettings />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navheader;
