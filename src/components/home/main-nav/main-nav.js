import React, { useState, useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../../apis/AuthContext";
import "./main-nav.scss";
import Logo from "../../../images/logo.svg";
import Search from "../../../images/Search.svg";
import SearchBlack from "../../../images/Search-black.svg";
import Bag from "../../../images/Bag.svg";
import Bag2 from "../../../images/Bag2.svg";
import Heart from "../../../images/Heart.svg";
import Model from "../../../images/model.svg";
import Notification from "../../../images/Notification.svg";
import Notification2 from "../../../images/Notification2.svg";
// import ArrowDown from "../../../images/arrow-down.svg";
import axios from "axios";
import { NavLink, Link, useHistory } from "react-router-dom";
import { Button, makeStyles, InputBase, Avatar } from "@material-ui/core";
import UserSettings from "../../user-settings/user-settings";
import DrawerIcon from "../../../images/navbar-drawer-icon.svg";
import Drawer from "@material-ui/core/Drawer";
import CloseDrawerIcon from "../../../images/close-black.svg";
import ArrowRight from "../../../images/arrow-right.svg";
import collectionImg from "../../../images/Addfile-light.svg";
import heartImg from "../../../images/Heart-light.svg";
import cartIcon from "../../../images/Bag-light.svg";
import InviteFriendsIcon from "../../../images/invite-friends.svg";
import EditProfile from "../../../images/edit-profile-icon.svg";
import ChangePassword from "../../../images/change-password-icon.svg";
import NotificationSettings from "../../../images/notification-settings-icon.svg";
import LogOut from "../../../images/logout-icon.svg";
import { useDispatch } from "react-redux";
import { setTab } from "../../../redux/Slices/userSignUpSlice/userSignUpSlice";
import LoginIcon from "../../../images/login-icon.svg";
import NotificationDrawer from "../../Notifications/Notification";
import { AvatarGroup } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    maxHeight: "50px",
    borderRadius: "40px",
    backgroundColor: "#F6F7F7",
    marginRight: theme.spacing(2),
    marginTop: "0px",
    maxWidth: "40%",
    minWidth: "15%",

    "&:hover": {
      backgroundColor: "#eeeeee",
    },

    "&:focus": {
      backgroundColor: "#eeeeee",
    },
  },
  searchIcon: {
    padding: theme.spacing(2, 2),
    paddingTop: "12px",
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "#6F6F6F",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),

    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    paddingTop: "10px",
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

export default function MainNav({ setTyping }, props) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState();
  let [isLogged, setIsLogged] = useState();
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [isNotification, setIsNotification] = useState(false);
  const hide = useRef();
  const location = useLocation();
  useEffect(() => {
    setIsLogged(window.localStorage.getItem("Access_Key"));
  }, []);
  const userInfo = useSelector((state) => state.userDetails);

  const routeCart = (e) => {
    history.push("/cart");
  };

  const [state, setState] = useState({
    left: false,
  });

  const { setIsAuth, cart } = useContext(AuthContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_ROOT_URL}/api/global-search/?keyword=${search}`,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(
              "Access_Key"
            )}`,
          },
        }
      )
      .then((res) => {
        setSearchData(res.data);
      })
      .catch((err) => console.log(err));
  }, [search]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_ROOT_URL}/api/add-to-cart`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("Access_Key")}`,
        },
      })
      .then((res) => {
        console.log("cart", res?.data?.items);
        if (res?.data?.items.length > 0) {
          localStorage.setItem("cartStatus", "not empty");
        } else {
          localStorage.setItem("cartStatus", "empty");
        }
      });
  }, []);
  const handleSearch = (e) => {
    hide.current.style.display = "flex";
    if (e.target.value.length <= 0) {
      if (location.pathname === "/home") {
        if (typeof setTyping === "function") {
          setTyping(true);
        }
      }
    } else {
      if (location.pathname === "/home") {
        if (typeof setTyping === "function") {
          setTyping(false);
        }
      }
    }
    setSearch(e.target.value);
  };
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleTabs = (event) => {
    let id = event.target.parentNode.id;
    id = parseInt(id);
    dispatch(
      setTab({
        tab: id,
      })
    );
  };

  const handleTabs0 = (event) => {
    dispatch(
      setTab({
        tab: 0,
      })
    );
  };

  const LogoutHandler = () => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    setIsAuth(false);
    history.push("/");
  };

  const toFavorite = () => {
    history.push("/userprofile");
  };

  const list = (anchor) => (
    <div className="drawer-list">
      <div className="drawer-content-container">
        <div
          style={{
            padding: "10px 15px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src={CloseDrawerIcon}
            alt="close"
            className="drawer-close-icon"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
          />
        </div>

        <hr className="divider" />

        <div className="drawer-contents">
          {window.localStorage.getItem("Access_Key") && (
            <div className="drawer-profile-info">
              <img
                src={`${process.env.REACT_APP_ROOT_URL}${userInfo.profilePic}`}
                alt="model"
                className="user-avatar"
              />
              <div style={{ marginLeft: "10px" }}>
                <h4 className="user-name">
                  {`${userInfo.firstName} ${userInfo.lastName}`}
                </h4>
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
              </div>
            </div>
          )}

          <div className="drawer-nav-links">
            <Link to="/home" className="drawer-nav-links-button">
              Shop
            </Link>
            <Link to="/artist" className="drawer-nav-links-button">
              Artist
            </Link>
            <Link to="/faq" className="drawer-nav-links-button">
              FAQ
            </Link>
          </div>

          {window.localStorage.getItem("Access_Key") && (
            <hr className="divider" />
          )}

          {window.localStorage.getItem("Access_Key") && (
            <div className="drawer-content-section-1">
              <ul className="user-settings-list">
                <Link to="/userprofile" style={{ textDecoration: "none" }}>
                  <li id="3" onClick={handleTabs}>
                    <img
                      src={cartIcon}
                      alt="orders"
                      className="settings-icon"
                    />{" "}
                    <span>My order</span>
                  </li>
                </Link>
                <Link to="/userprofile" style={{ textDecoration: "none" }}>
                  <li id="4" onClick={handleTabs}>
                    <img
                      src={heartImg}
                      alt="favourites"
                      className="settings-icon"
                    />
                    <span>Favourites</span>
                  </li>
                </Link>
                <Link to="/userprofile" style={{ textDecoration: "none" }}>
                  <li id="5" onClick={handleTabs}>
                    <img
                      src={collectionImg}
                      alt="collection"
                      className="settings-icon"
                    />
                    <span>Collection</span>
                  </li>
                </Link>
              </ul>
            </div>
          )}

          {window.localStorage.getItem("Access_Key") && (
            <hr className="divider" />
          )}

          {window.localStorage.getItem("Access_Key") && (
            <div className="drawer-content-section-2">
              <ul className="user-settings-list">
                <Link to="/editprofile" style={{ textDecoration: "none" }}>
                  <li id="0" onClick={handleTabs0}>
                    <img
                      src={EditProfile}
                      alt="edit-profile"
                      className="settings-icon"
                    />{" "}
                    <span>Edit profile</span>
                  </li>
                </Link>
                <Link to="/editprofile" style={{ textDecoration: "none" }}>
                  <li id="1" onClick={handleTabs}>
                    <img
                      src={ChangePassword}
                      alt="change-password"
                      className="settings-icon"
                    />
                    <span>Change password</span>
                  </li>
                </Link>
                <Link to="/editprofile" style={{ textDecoration: "none" }}>
                  <li id="2" onClick={handleTabs}>
                    <img
                      src={NotificationSettings}
                      alt="notifications"
                      className="settings-icon"
                    />
                    <span>Notification settings</span>
                  </li>
                </Link>
              </ul>
            </div>
          )}

          <hr className="divider" />

          {/* {window.localStorage.getItem("Access_Key") && (
            <div className="drawer-content-section-3">
              <ul className="user-settings-list">
                <Link to="/userprofile" style={{ textDecoration: "none" }}>
                  <li id="6" onClick={handleTabs}>
                    <img
                      src={InviteFriendsIcon}
                      alt="invite-friends"
                      className="settings-icon"
                    />{" "}
                    <span>Invite Friends</span>
                  </li>
                </Link>
              </ul>
            </div>
          )} */}

          {window.localStorage.getItem("Access_Key") && (
            <hr className="divider" />
          )}

          <div className="drawer-content-section-4">
            <ul className="user-settings-list">
              {window.localStorage.getItem("Access_Key") ? (
                <li onClick={LogoutHandler}>
                  <img src={LogOut} alt="logout" className="settings-icon" />
                  <span>Log out</span>
                </li>
              ) : (
                <li>
                  <Link
                    to="/login"
                    style={{
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={LoginIcon}
                      alt="logout"
                      className="login-icon-nav"
                    />
                    <span style={{ color: "#000" }}>Log In</span>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="main-nav">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div className="mobile-drawer-container">
          <img
            src={DrawerIcon}
            alt="drawer"
            className="drawer-icon"
            onClick={toggleDrawer("left", true)}
          />
          <Drawer
            anchor={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
          >
            {list("left")}
          </Drawer>
        </div>
        <NavLink to={!!isLogged ? "/home" : "/"}>
          <img
            src={Logo}
            alt="logo"
            className="logo nav-logo"
            style={{ zIndex: "-2 !important" }}
          />
        </NavLink>
      </div>
      <div className="main-nav-routes" style={{ marginLeft: "-100px" }}>
        <NavLink activeClassName="selected" to="/home">
          <Button value="shop" className="main-nav-routes-button">
            Shop
          </Button>
        </NavLink>
        <NavLink activeClassName="selected" to="/artist">
          <Button value="artist" className="main-nav-routes-button">
            Artist
          </Button>
        </NavLink>
        <NavLink activeClassName="selected" to="/faq">
          <Button value="faq" className="main-nav-routes-button">
            FAQ
          </Button>
        </NavLink>
      </div>

      <div
        style={{ position: "relative" }}
        className={`${classes.search} desktop-search-icon`}
      >
        <div className={classes.searchIcon}>
          <img src={Search} alt="SearchIcon" />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
          value={search}
          onChange={handleSearch}
          onBlur={() => {
            setTimeout(() => {
              setSearch("");
              if (location.pathname === "/home") {
                setTyping(true);
              }
            }, 300);
          }}
          onFocus={(e) => {
            hide.current.style.display = "flex";
          }}
        />

        <div className="searchDiv" ref={hide}>
          {search?.length > 0 && (
            <>
              {searchData?.users?.slice(0, 2).map((item) => (
                <div
                  className="searchItem"
                  onClick={() => {
                    // alert(item.unique_id)
                    history.push(`/artist/${item.Unique_id}`);
                  }}
                >
                  <Avatar
                    style={{ width: "20px", height: "20px" }}
                    src={`${process.env.REACT_APP_ROOT_URL}${item.profile_picture}`}
                    alt="p"
                  />
                  <span style={{ paddingLeft: "4px" }}>
                    {item.first_name ? item.first_name : item.username}
                  </span>
                </div>
              ))}

              {searchData?.products?.slice(0, 2).map((item) => (
                <div
                  className="searchItem"
                  to={`/shop/${item.slug}`}
                  onClick={() => {
                    console.log(item);
                    history.push(`/shop/${item.slug}`);
                  }}
                >
                  <Avatar
                    style={{ width: "20px", height: "20px" }}
                    src={`${process.env.REACT_APP_ROOT_URL}${item.productimage}`}
                    alt="p"
                  />
                  <span style={{ paddingLeft: "4px" }}>
                    {" "}
                    {item?.design_name}
                  </span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <div className="main-nav-right-content">
        <img className="mob-search-icon" src={SearchBlack} alt="SearchIcon" />
        <>
          {isNotification ? (
            <img
              src={Notification2}
              alt="Notification"
              onClick={(e) => handleClick(e)}
            />
          ) : (
            <img
              src={Notification}
              alt="Notification"
              onClick={(e) => handleClick(e)}
            />
          )}

          <NotificationDrawer
            handleClose={handleClose}
            anchorEl={anchorEl}
            isNotification={isNotification}
            setIsNotification={setIsNotification}
          />
        </>
        <img src={Heart} alt="Heart" onClick={toFavorite} />
        {localStorage.getItem("is_firm_user") != "true" &&
          (localStorage.getItem("cartStatus") === "empty" ? (
            <img src={Bag} onClick={routeCart} alt="Bag" />
          ) : (
            <img src={Bag2} onClick={routeCart} alt="Bag" />
          ))}
        {!window.localStorage.getItem("Access_Key") ? (
          <Link to="/login">
            <Button variant="outlined" className="main-nav-login">
              Log In
            </Button>
            <img src={LoginIcon} alt="login" className="login-icon" />
          </Link>
        ) : (
          <div className="main-nav-profile-pic">
            <UserSettings />
          </div>
        )}
      </div>
    </div>
  );
}
