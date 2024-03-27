import React from "react";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import Notification from "../../images/Notification.svg";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import User from "../../images/user.svg";
import Badge from "@material-ui/core/Badge";
import { useEffect, useState } from "react";
import axios from "axios";
import { touchRippleClasses } from "@mui/material";
const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
    borderRadius: "12px",
    marginTop: "10px",
    marginRight: "40px",
    height: "auto",
    width: "340px",
  },
  list: {
    padding: "0px 0px 0px 0px",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    {...props}
  />
));

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "23vw",
    backgroundColor: theme.palette.background.paper,
    height: "10vh",
    paddingLeft: "18px !important",
    borderBottom: "2.2px solid #F0F0F0",
    alignItems: "center",
    "&:hover": {
      background: "#e5e5e5",
    },
  },

  inline: {
    display: "inline",
  },
  ListItemAvatar: {
    paddingLeft: "6px",
  },
  Avatar: {
    width: 38,
    height: 38,
  },
  MainAvatar: {
    border: "7px solid #F6F6F6",
    width: 38,
    height: 38,
  },
  ListItemText: {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "22px",
    display: "flex",
    alignItems: "center",
    color: "#1B1918",
    width: "100%",
  },
  badgeStyles: {
    backgroundColor: "#F47A32",
    position: "absolute",
    top: "25px",
    left: "-12px",
  },
  btnRoot: {
    backgroundColor: "#F6F7F7",
    marginTop: "12px",
    fontWeight: "500 !important",
    letterSpacing: "1px !important",
    borderRadius: "0 !important",
  },
  BellIcon: {
    borderRadius: "50% !important",
    padding: "10px !important",
  },
}));

export default function Notifications(props) {
  const { mobile, isNotification, setIsNotification } = props;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [allRead, setAllRead] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_ROOT_URL}/api/user-notification`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("Access_Key")}`,
        },
      })
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
        res.data.map((item) => {
          if (item.is_read === false) {
            setIsNotification(true);
          }
        });
      })
      .catch((err) => console.log(err));
  }, [allRead]);

  const markasread = () => {
    axios
      .get(`${process.env.REACT_APP_ROOT_URL}/api/notification-mark-all-read`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("Access_Key")}`,
        },
      })
      .then((res) => {
        setAllRead(!allRead);
        setIsNotification(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <StyledMenu
        id="simple-menu"
        anchorEl={props.anchorEl}
        keepMounted
        open={Boolean(props.anchorEl)}
        onClose={props.handleClose}
      >
        {!isLoading &&
          data.map((item, i) => (
            <>
              {!item.is_read ? (
                <ListItem alignItems="flex-start" className={classes.root}>
                  <ListItemText className={classes.ListItemText}>
                    <Badge
                      variant="dot"
                      overlap="circle"
                      classes={{ badge: classes.badgeStyles }}
                      anchorOrigin={{ vertical: "top", horizontal: "left" }}
                      style={{ margin: "0 16px" }}
                    >
                      <small>{item.text}</small>
                    </Badge>
                  </ListItemText>
                </ListItem>
              ) : null}
            </>
          ))}
        {isNotification ? (
          <Button
            variant="contained"
            className={classes.btnRoot}
            onClick={() => {
              markasread();
            }}
          >
            Mark all as read
          </Button>
        ) : (
          <span style={{ padding: "10px" }}>No New Notifications</span>
        )}
      </StyledMenu>
    </div>
  );
}
