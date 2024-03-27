import React, { useEffect, useState } from "react";
import { Grid, Button } from "@material-ui/core";
import plusIcon from "../../../images/plus1.svg";
import { followArtist, unfollowArtist } from "../../../apis/apiCalls";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Fade from "@material-ui/core/Fade";

const Artistitem = (props) => {
  const [followLoader, setFollowLoader] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [followers, setFollowers] = useState();
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [state, setState] = React.useState({
    open: false,
    Transition: Fade,
  });
  const { item, handleArtistClick, removeFollower, shouldRemoveFollower } =
    props;
  let width;

  useEffect(() => {
    setFollowers(item.followers);
    setIsFollowed(item.status);
    width = window.innerWidth;
    window.addEventListener("resize", () => {
      width = window.innerWidth;
    });
  }, []);

  const handleFollow = (e) => {
    e.stopPropagation();
    setFollowLoader(true);
    let formData = new FormData();
    formData.append("user_unique_id", e.target.id);

    followArtist(formData)
      .then((data) => {
        if (shouldRemoveFollower) {
          removeFollower();
        } else {
          setIsFollowed(true);
        }
        setFollowLoader(false);
        setFollowers(followers + 1);
      })
      .catch((messed) => {
        // alert("Couldn't follow that artist!");
        setState({ ...state, open: true });
        setMessage("Couldn't follow that artist!");
        setErrorMessage("warning");
        setFollowLoader(false);
      });
  };

  const handleUnfollow = (e) => {
    e.stopPropagation();
    setFollowLoader(true);
    let formData = new FormData();
    formData.append("user_unique_id", item.Unique_id);

    unfollowArtist(formData)
      .then((data) => {
        if (shouldRemoveFollower) {
          removeFollower(item.Unique_id);
        } else {
          setIsFollowed(false);
        }
        setFollowers(followers - 1);
        setFollowLoader(false);
      })
      .catch((messed) => {
        // alert("Couldn't unfollow that artist!");
        setState({ ...state, open: true });
        setMessage("Couldn't unfollow that artist!");
        setErrorMessage("warning");
        setFollowLoader(false);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setState({
      ...state,
      open: false,
    });
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        TransitionComponent={state.Transition}
        open={state.open}
        autoHideDuration={2000}
        onClose={handleClose}
        key={state.Transition.name}
      >
        <Alert
          onClose={handleClose}
          severity={errorMessage}
          // sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      <div
        className="artist-page-container"
        name={item.full_name}
        key={item.Unique_id}
      >
        <Grid
          container
          justify="space-between"
          direction={width > 800 ? "row" : "column"}
          spacing={2}
          onClick={() => handleArtistClick(item.Unique_id)}
        >
          <Grid item xs>
            <div className="artist-container">
              <div className="artist-img-container">
                <img
                  // src={[
                  //   item.user.profile_picture
                  //   "s",
                  //   item.user.profile_picture.slice(4),
                  // ].join("")}  //use this when server is https
                  src={[item.user.profile_picture]}
                  className="artist-list-img"
                  alt=""
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className="artistList-details-container">
                <h2 className="artistList-name">{item.full_name}</h2>
                <p className="artistList-details">
                  {item.Designs > 1
                    ? `${item.Designs} designs`
                    : `${item.Designs} design`}{" "}
                  |{" "}
                  {item.followers > 1
                    ? `${followers} followers`
                    : `${followers} follower`}
                </p>
                {isFollowed ? (
                  <Button
                    variant="outlined"
                    id={item.Unique_id}
                    onClick={handleUnfollow}
                    style={{
                      width: "120px",
                      height: "40px",
                      padding: "8px 16px",
                      borderRadius: "8px",
                    }}
                  >
                    {followLoader ? (
                      <CircularProgress style={{ color: "#000" }} size={20} />
                    ) : (
                      "Unfollow"
                    )}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    id={item.Unique_id}
                    onClick={handleFollow}
                    style={{
                      width: "120px",
                      height: "40px",
                      background: "#1b1918",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      color: "#FFFFFF",
                    }}
                  >
                    {followLoader ? (
                      <CircularProgress style={{ color: "#fff" }} size={20} />
                    ) : (
                      <>
                        <img
                          id={item.Unique_id}
                          src={plusIcon}
                          style={{ width: "24px", height: "24px" }}
                          alt=""
                        />
                        <span
                          id={item.Unique_id}
                          style={{
                            padding: "0px 10px",
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "#1B1918 !important",
                          }}
                        >
                          Follow
                        </span>
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </Grid>

          <Grid item xs>
            <div style={{ padding: "0px 10px" }}>
              <Grid container spacing={2}>
                {item.design_images.map((img) => (
                  <Grid
                    item
                    xs={6}
                    md={4}
                    lg={4}
                    xl={4}
                    style={{ padding: "0px" }}
                  >
                    <img
                      src={`${process.env.REACT_APP_ROOT_URL}${img}`}
                      style={{
                        width: 236,
                        height: 140,
                        borderRadius: 12,
                        objectFit: "cover",
                        margin: width > 800 ? "0 30px" : "0",
                      }}
                      alt="design img"
                    />
                  </Grid>
                ))}
              </Grid>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Artistitem;
