import React, { useEffect, useRef } from "react";
import { AuthContext } from "../../apis/AuthContext";
import "./user-settings.scss";
import ArrowDown from "../../images/arrow-down.svg";
import ArrowRight from "../../images/arrow-right.svg";
import EditProfile from "../../images/edit-profile-icon.svg";
import ChangePassword from "../../images/change-password-icon.svg";
import NotificationSettings from "../../images/notification-settings-icon.svg";
import LogOut from "../../images/logout-icon.svg";
import Model from "../../images/model.svg";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import { Link, useHistory } from "react-router-dom";
import { setTab } from "../../redux/Slices/userSignUpSlice/userSignUpSlice";
import { useDispatch } from "react-redux";
import collectionImg from "../../images/Addfile-light.svg";
import heartImg from "../../images/Heart-light.svg";
import cartIcon from "../../images/Bag-light.svg";
import InviteFriendsIcon from "../../images/invite-friends.svg";
import { getDecoratorSnippet } from "../../apis/apiCalls";
import { Avatar, Divider } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  paper: {
    borderRadius: "12px",
    padding: theme.spacing(2),
    paddingTop: 0,
    backgroundColor: theme.palette.background.paper,
  },
  paper2: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    "&:hover": {
      background: "#dcdcdc",
    },
    borderRadius: "12px 12px 0 0 ",
    cursor: "pointer",
  },
}));

const UserSettings = (props) => {
  const { setIsAuth } = React.useContext(AuthContext);

  const userType = window.localStorage.getItem("User_Type");
  const dispatch = useDispatch();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();
  const userInfo = useSelector((state) => state.userDetails);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const LogoutHandler = () => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    setIsAuth(false);
    history.push("/");
  };

  return (
    <React.Fragment>
      <div
        className="user-settings"
        aria-describedby={id}
        type="button"
        onClick={handleClick}
      >
        {userInfo.loader ? (
          <Skeleton variant="circle" width={50} height={50} />
        ) : (
          <img
            src={`${process.env.REACT_APP_ROOT_URL}${userInfo.profilePic}`}
            alt="model"
            className="user-avatar"
          />
        )}
        <img src={ArrowDown} alt="arrow-down" className="arrow-down" />
      </div>
      <Popover
        onClose={handleClose}
        id={id}
        open={open}
        anchorEl={anchorEl}
        className="user-setting-popper"
      >
        <div
          className={classes.paper2}
          onClick={() => {
            if (userType !== "Artist") {
              history.push("/userprofile");
            }
          }}
        >
          {userInfo.loader ? (
            <Skeleton variant="circle" width={50} height={50} />
          ) : (
            <img
              src={`${process.env.REACT_APP_ROOT_URL}${userInfo.profilePic}`}
              alt="model"
              className="user-avatar"
            />
          )}
          {userInfo.loader ? (
            <Skeleton width={200} height={30} />
          ) : (
            <h4 className="user-name">{`${userInfo.firstName} ${userInfo.lastName}`}</h4>
          )}
          {userType !== "Artist" && (
            <Link
              to="/userprofile"
              style={{ textDecoration: "none", color: "#6F6F6F" }}
            >
              <div className="view-page-container">
                <p>View my page</p>
                <img
                  src={ArrowRight}
                  alt="arrow-right"
                  className="arrow-right"
                />
              </div>
            </Link>
          )}
        </div>
        <div className={classes.paper}>
          <hr className="divider" style={{ margin: 0, padding: 0 }} />

          {userType !== "Artist" && (
            <React.Fragment>
              <ul className="user-settings-list">
                <Link to="/userprofile?t=4" style={{ textDecoration: "none" }}>
                  <li>
                    <img
                      src={cartIcon}
                      alt="orders"
                      className="settings-icon"
                    />{" "}
                    <span>My order</span>
                  </li>
                </Link>
                <Link to="/userprofile?t=0" style={{ textDecoration: "none" }}>
                  <li>
                    <img
                      src={heartImg}
                      alt="favourites"
                      className="settings-icon"
                    />
                    <span>Favourites</span>
                  </li>
                </Link>
                <Link to="/userprofile?t=1" style={{ textDecoration: "none" }}>
                  <li>
                    <img
                      src={collectionImg}
                      alt="collection"
                      className="settings-icon"
                    />
                    <span>Collection</span>
                  </li>
                </Link>
                <Link to="/studio-screen" style={{ textDecoration: "none" }}>
                  <li>
                    <img
                      src={cartIcon}
                      alt="collection"
                      className="settings-icon"
                    />
                    <span>My Studio</span>
                  </li>
                </Link>
              </ul>
              <hr className="divider" />
            </React.Fragment>
          )}
          <ul className="user-settings-list">
            <Link to="/editprofile?t=0" style={{ textDecoration: "none" }}>
              <li>
                <img
                  src={EditProfile}
                  alt="edit-profile"
                  className="settings-icon"
                />{" "}
                <span>Edit profile</span>
              </li>
            </Link>
            <Link to="/editprofile?t=1" style={{ textDecoration: "none" }}>
              <li>
                <img
                  src={ChangePassword}
                  alt="change-password"
                  className="settings-icon"
                />
                <span>Change password</span>
              </li>
            </Link>
            <Link to="/editprofile?t=2" style={{ textDecoration: "none" }}>
              <li>
                <img
                  src={NotificationSettings}
                  alt="notifications"
                  className="settings-icon"
                />
                <span>Notification settings</span>
              </li>
            </Link>
          </ul>
          {/* {userType !== "Artist" && (
            <React.Fragment>
              <hr className="divider" />
              <ul className="user-settings-list">
                <Link to="/userprofile?t=6" style={{ textDecoration: "none" }}>
                  <li id="6">
                    <img
                      src={InviteFriendsIcon}
                      alt="invite-friends"
                      className="settings-icon"
                    />{" "}
                    <span>Invite Friends</span>
                  </li>
                </Link>
              </ul>
            </React.Fragment>
          )} */}
          <hr className="divider" />
          <ul className="user-settings-list">
            <li onClick={LogoutHandler}>
              <img src={LogOut} alt="logout" className="settings-icon" />
              <span>Log out</span>
            </li>
          </ul>
        </div>
      </Popover>
    </React.Fragment>
  );
};

export default UserSettings;
