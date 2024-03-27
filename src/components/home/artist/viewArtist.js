import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Button, CircularProgress } from "@material-ui/core";
import Footer from "../footer/footer";
import MainNav from "../main-nav/main-nav";
import ProductCard from "../../product-card/product-card";
import plusIcon from "../../../images/plus1.svg";
import "./viewArtist.scss";
import { getArtistDesignList, getArtistDetails } from "../../../apis/apiCalls";
import { useHistory } from "react-router";
import { followArtist, unfollowArtist } from "../../../apis/apiCalls";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Fade from "@material-ui/core/Fade";

const ViewArtist = (props) => {
  const { name } = useParams();
  const [loader, setLoader] = useState(true);
  const [artistDetails, setartistDetails] = useState(true);
  const [artistDesignList, setartistDesignList] = useState(true);
  const [followLoader, setFollowLoader] = useState(false);
  const [followers, setFollowers] = useState();
  const [isFollowed, setIsFollowed] = useState(false);
  const history = useHistory();
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [state, setState] = React.useState({
    open: false,
    Transition: Fade,
  });

  useEffect(() => {
    const init = async () => {
      try {
        const artistDesignList = await getArtistDesignList(name, 1);
        const artistDetails = await getArtistDetails(name);
        const modifiedDate = getModifiedDate(artistDetails.user_since);
        setIsFollowed(artistDetails.is_followed);
        setartistDetails({ ...artistDetails, user_since: modifiedDate });
        setartistDesignList(artistDesignList);
        setFollowers(artistDetails.followers_count);
        setLoader(false);
      } catch (err) {
        setLoader(false);
      }
    };
    init();
  }, []);

  const onFollowCall = isFollowed ? unfollowArtist : followArtist;

  const handleFollowUnfollow = (e) => {
    setFollowLoader(true);
    let formData = new FormData();
    formData.append("user_unique_id", name);

    onFollowCall(formData)
      .then(() => {
        if (isFollowed) {
          setFollowers((prev) => prev - 1);
        } else {
          setFollowers((prev) => prev + 1);
        }
        setIsFollowed((prev) => !prev);
        setFollowLoader(false);
      })
      .catch(() => {
        // alert("Couldn't follow that artist!");
        setState({ ...state, open: true });
        setMessage("Couldn't follow that artist!");
        setErrorMessage("warning");
        setFollowLoader(false);
      });
  };

  const getModifiedDate = (inputDate) => {
    const date = new Date(inputDate).toDateString().split(" ");
    return `${date[1]} ${date[2]}, ${date[3]}`;
  };

  const viewProduct = (e) => {
    history.push(`/shop/${e.target.id}`);
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
    <React.Fragment>
      <Snackbar
        anchorOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        TransitionComponent={state.Transition}
        open={state.open}
        autoHideDuration={2000}
        onClose={handleClose}
        // key={state.Transition.name}
      >
        <Alert
          onClose={handleClose}
          severity={errorMessage}
          // sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      <div>
        <MainNav />
        {loader ? (
          <div style={{ margin: "40vh auto", textAlign: "center" }}>
            <CircularProgress size={80} style={{ color: "#000" }} />
          </div>
        ) : (
          <div className="view-artist-wrap">
            <Grid item md={3}>
              <div className="artist-details-snippet-container">
                <div className="artist-snippet-img-container">
                  <img
                    src={`${process.env.REACT_APP_ROOT_URL}${artistDetails.profile_pic}`}
                    className="artist-snippet-img"
                    alt=""
                  />
                </div>
                <div className="artist-snippet-details">
                  <div className="artist-snippet-name">
                    <h2>{artistDetails.full_name}</h2>
                  </div>
                  <div className="artist-snippet-stats">
                    <p>{`${artistDetails.no_of_designs} designs | ${followers} followers`}</p>
                  </div>
                  <div className="artist-snippet-bio">
                    <p>{artistDetails.bio}</p>
                  </div>
                </div>

                <div className="artist-snippet-btn-container">
                  {isFollowed ? (
                    <Button
                      variant="outlined"
                      className="artist-snippet-btn-outlined"
                      onClick={handleFollowUnfollow}
                    >
                      {followLoader ? (
                        <CircularProgress size={30} style={{ color: "#000" }} />
                      ) : (
                        "Unfollow"
                      )}
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      className="artist-snippet-btn"
                      onClick={handleFollowUnfollow}
                    >
                      {followLoader ? (
                        <CircularProgress size={30} style={{ color: "#fff" }} />
                      ) : (
                        <>
                          <img
                            src={plusIcon}
                            style={{ width: "24px", height: "24px" }}
                            alt="icon"
                          />
                          <span
                            style={{
                              padding: "0px 10px",
                              fontSize: "18px",
                              fontWeight: "500",
                              color: "#1B1918 !important",
                              position: "relative",
                              top: "2px",
                            }}
                          >
                            Follow
                          </span>
                        </>
                      )}
                    </Button>
                  )}
                </div>
                <div className="artist-snippet-date-container">
                  <span className="artist-snippet-date">
                    {`MEMBER SINCE: ${artistDetails.user_since}`}
                  </span>
                </div>
              </div>
            </Grid>
            <Grid
              container
              spacing={4}
              justifyContent="flex-end"
              direction="row"
              style={{ marginTop: "2.6%" }}
              className="view-artist-grid"
            >
              {artistDesignList?.length <= 0 ? (
                <p>No Designs found</p>
              ) : (
                artistDesignList?.map((item, index) => (
                  <Grid
                    item
                    xs={6}
                    md={4}
                    lg={3}
                    xl={3}
                    className="product-wrap"
                  >
                    <ProductCard
                      key={item.sku}
                      id={item.slug}
                      designImage={
                        process.env.REACT_APP_ROOT_URL + item.product_image
                      }
                      artist={item.artist_unique_id}
                      sku={item.sku}
                      isFavourite={item.is_favourite}
                      onClick={viewProduct}
                    />
                  </Grid>
                ))
              )}
            </Grid>
          </div>
        )}
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default ViewArtist;
