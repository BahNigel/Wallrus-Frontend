import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ToggleButtons from "./ToggleButtons";
import { NotificationSettings } from "../../apis/apiCalls";
import {
  setDesignsViewNotification,
  setPaymentsNotification,
  setPurchaseNotification,
  setFavouriteNotification,
  setNewFollowerNotification,
  selectDesignView,
} from "../../redux/Slices/NotificationSettingSlice/NotificationSettingSlice";
import Skeleton from "@material-ui/lab/Skeleton";
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  label: {
    color: "rgb(0, 0, 0)",
  },
  skeleton: {
    border: "1px solid #DCDCDC",
    borderRadius: "30px",
  },
}));

const Notifications = (props) => {
  const userType = window.localStorage.getItem("User_Type");
  const classes = useStyles();
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const designViewFrequency = useSelector(selectDesignView);
  const handleChange = (value) => {
    setCount(1);
    console.log(value.name);
    if (value.name === "followerNotification") {
      dispatch(
        setNewFollowerNotification({
          follower_frequency: value.value,
        })
      );
    }
    if (value.name === "paymentNotification") {
      dispatch(
        setPaymentsNotification({
          payments_frequency: value.value,
        })
      );
    }
    if (value.name === "designViewNotification") {
      dispatch(
        setDesignsViewNotification({
          designs_view_frequency: value.value,
        })
      );
    }
    if (value.name === "favouriteNotification") {
      dispatch(
        setFavouriteNotification({
          favourite_frequency: value.value,
        })
      );
    }

    if (value.name === "purchaseNotification") {
      dispatch(
        setPurchaseNotification({
          purchase_frequency: value.value,
        })
      );
    }
  };

  let notificationTitles = [];

  if (userType === "Interior Decorator") {
    notificationTitles = [
      "Purchase and commission updates:",
      "Whenever my following artist upload new designs:",
      "My order status:",
      "Whenever new artist joins the platform:",
      "Blogs, newsletters and event notification:",
    ];
  } else if (userType === "Artist") {
    notificationTitles = [
      "When I get a new follower:",
      "When I receive payments from The Wallrus Company:",
      "When someone views my design:",
      "When someone favourites my design:",
      "When someone purchases my design:",
    ];
  }

  return (
    <div>
      {/* {console.log(count)} */}
      <div>
        <h4>{notificationTitles[0]}</h4>
        {designViewFrequency === "" ? (
          <Grid container md={7} spacing={4}>
            <Grid item md={3}>
              <Skeleton
                animation="wave"
                width={140}
                height={65}
                className={classes.skeleton}
              />
            </Grid>
            <Grid item md={3}>
              <Skeleton
                animation="wave"
                width={140}
                height={65}
                className={classes.skeleton}
              />
            </Grid>
            <Grid item md={3}>
              <Skeleton
                animation="wave"
                width={140}
                height={65}
                className={classes.skeleton}
              />
            </Grid>
            <Grid item md={3}>
              <Skeleton
                animation="wave"
                width={140}
                height={65}
                className={classes.skeleton}
              />
            </Grid>
          </Grid>
        ) : (
          <div>
            <ToggleButtons
              followerNotification={true}
              onChange={handleChange}
            />
          </div>
        )}
      </div>
      <div>
        <h4>{notificationTitles[1]}</h4>
        {designViewFrequency === "" ? (
          <Grid container md={7} spacing={4}>
            <Grid item md={3}>
              <Skeleton
                animation="wave"
                width={140}
                height={65}
                className={classes.skeleton}
              />
            </Grid>
            <Grid item md={3}>
              <Skeleton
                animation="wave"
                width={140}
                height={65}
                className={classes.skeleton}
              />
            </Grid>
            <Grid item md={3}>
              <Skeleton
                animation="wave"
                width={140}
                height={65}
                className={classes.skeleton}
              />
            </Grid>
            <Grid item md={3}>
              <Skeleton
                animation="wave"
                width={140}
                height={65}
                className={classes.skeleton}
              />
            </Grid>
          </Grid>
        ) : (
          <div>
            <ToggleButtons paymentNotification={true} onChange={handleChange} />
          </div>
        )}
      </div>
      <div>
        <h4>{notificationTitles[2]}</h4>
        {designViewFrequency === "" ? (
          <Grid container md={7} spacing={4}>
            <Grid item md={3}>
              <Skeleton
                animation="wave"
                width={140}
                height={65}
                className={classes.skeleton}
              />
            </Grid>
            <Grid item md={3}>
              <Skeleton
                animation="wave"
                width={140}
                height={65}
                className={classes.skeleton}
              />
            </Grid>
            <Grid item md={3}>
              <Skeleton
                animation="wave"
                width={140}
                height={65}
                className={classes.skeleton}
              />
            </Grid>
            <Grid item md={3}>
              <Skeleton
                animation="wave"
                width={140}
                height={65}
                className={classes.skeleton}
              />
            </Grid>
          </Grid>
        ) : (
          <div>
            <ToggleButtons
              designViewNotification={true}
              onChange={handleChange}
            />
          </div>
        )}
      </div>
      <div>
        <h4>{notificationTitles[3]}</h4>
        {designViewFrequency === "" ? (
          <Grid container md={7} spacing={4}>
            <Grid item md={3}>
              <Skeleton
                animation="wave"
                width={140}
                height={65}
                className={classes.skeleton}
              />
            </Grid>
            <Grid item md={3}>
              <Skeleton
                animation="wave"
                width={140}
                height={65}
                className={classes.skeleton}
              />
            </Grid>
            <Grid item md={3}>
              <Skeleton
                animation="wave"
                width={140}
                height={65}
                className={classes.skeleton}
              />
            </Grid>
            <Grid item md={3}>
              <Skeleton
                animation="wave"
                width={140}
                height={65}
                className={classes.skeleton}
              />
            </Grid>
          </Grid>
        ) : (
          <div>
            <ToggleButtons
              favouriteNotification={true}
              onChange={handleChange}
            />
          </div>
        )}
      </div>
      <div>
        <h4>{notificationTitles[4]}</h4>
        {designViewFrequency === "" ? (
          <Grid container md={7} spacing={4}>
            <Grid item md={3}>
              <Skeleton
                animation="wave"
                width={140}
                height={65}
                className={classes.skeleton}
              />
            </Grid>
            <Grid item md={3}>
              <Skeleton
                animation="wave"
                width={140}
                height={65}
                className={classes.skeleton}
              />
            </Grid>
            <Grid item md={3}>
              <Skeleton
                animation="wave"
                width={140}
                height={65}
                className={classes.skeleton}
              />
            </Grid>
            <Grid item md={3}>
              <Skeleton
                animation="wave"
                width={140}
                height={65}
                className={classes.skeleton}
              />
            </Grid>
          </Grid>
        ) : (
          <div>
            <ToggleButtons
              purchaseNotification={true}
              onChange={handleChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
