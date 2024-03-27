import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../apis/AuthContext";
import "./main-nav.scss";
import Logo from "../../../images/logo.svg";

import axios from "axios";
import { NavLink, Link, useHistory } from "react-router-dom";

import DrawerIcon from "../../../images/navbar-drawer-icon.svg";
import { Drawer, makeStyles } from "@material-ui/core/";
import CloseDrawerIcon from "../../../images/close-black.svg";

import { useDispatch } from "react-redux";
import { setTab } from "../../../redux/Slices/userSignUpSlice/userSignUpSlice";

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

export default function MainNav(props) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState();
  let [isLogged, setIsLogged] = useState();
  const [search, setSearch] = useState("");
  useEffect(() => {
    setIsLogged(window.localStorage.getItem("Access_Key"));
  }, []);

  const routeCart = (e) => {
    history.push("/cart");
  };

  const [state, setState] = useState({
    left: false,
  });

  const { setIsAuth } = useContext(AuthContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = (e) => {
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
    </div>
  );
}
