import "./under-review.scss";
import Stars from "../../images/underReviewStars.svg";
import { CircularProgress, Grid, makeStyles } from "@material-ui/core";
import design from "../../images/design4.svg";
import { useEffect, useState, useRef } from "react";
import { getUnderReviews } from "../../apis/apiCalls";
import { color } from "@mui/system";
import Pagination from "../pagination/pagination";

const useStyles = makeStyles({
  Grid: {
    flexGrow: 1,
  },
  mobileUnderReviewContainer: {
    display: "flex",
    justifyContent: "center",
  },

  mobileUnderReviewEmpty: {
    // display: "flex",
    // justifyContent: "center",
    position: "relative",
    left: "-25vw",
    height: "37vh",
  },
  mobileText: {
    whiteSpace: "nowrap",
  },
  mobileUnderReviewEmptyText: {
    fontWeight: "600",
    color: "#1B1918",
    position: "absolute",
    left: "0%",
    bottom: "15%",
    // left: "50%"
  },
  mobileUnderReviewEmptyImg: {
    position: "absolute",
    left: "0%",
    top: "0%",
    height: 200,
    width: 200,
  },
});

const UnderReview = (props) => {
  const { mobile } = props;
  const classes = useStyles();
  const [underReviews, setUnderReviews] = useState([]);
  const [loader, setloader] = useState([]);
  const imageSet = useRef(null);
  const [imgError, setImgError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const init = async () => {
      setloader(true);
      try {
        const response = await getUnderReviews(currentPage);
        setUnderReviews(response);
        setloader(false);
      } catch (err) {
        setloader(false);
      }
    };
    init();
  }, [currentPage]);

  // console.log(underReviews);

  const PER_PAGE = 12;

  let pages = [];
  const length = underReviews?.length || 0;
  for (let i = 1; i <= Math.ceil(length / PER_PAGE); i++) {
    pages.push(i);
  }

  return (
    <div className="under-review-main">
      {loader ? (
        <div style={{ margin: "30vh auto", textAlign: "center" }}>
          <CircularProgress size={80} style={{ color: "#000" }} />
        </div>
      ) : (
        <Grid container className={classes.Grid} spacing={6}>
          {underReviews?.length <= 0 ? (
            <Grid
              item
              xs
              className={mobile ? classes.mobileUnderReviewContainer : ""}
            >
              <div
                className={
                  mobile ? classes.mobileUnderReviewEmpty : "under-review-empty"
                }
              >
                <div>
                  <img
                    src={Stars}
                    alt=""
                    className={mobile ? classes.mobileUnderReviewEmptyImg : ""}
                  />
                </div>
                <div className={mobile ? classes.mobileText : ""}>
                  <p
                    className={
                      mobile
                        ? classes.mobileUnderReviewEmptyText
                        : "under-review-empty-text"
                    }
                  >
                    No design under Review
                  </p>
                </div>
              </div>
            </Grid>
          ) : underReviews?.length !== undefined ? (
            underReviews?.map((review, id) => {
              let generalString = [review.name];

              if (
                review.colorway_set.length > 0 &&
                review.colorway_set[0]?.color_tags.length > 0
              ) {
                generalString.push(review.colorway_set[0]?.color_tags[0]?.name);
              }

              if (review.applications.length > 0) {
                generalString.push(review.applications[0]?.name);
              }

              return (
                <Grid key={id} item xs={12} md={6} lg={4} xl={4}>
                  <div className="under-review-card">
                    <img
                      className="under-review-image"
                      src={
                        review.colorway_set.length > 0
                          ? review?.colorway_set[0]?.image_url?.includes(
                              "export=view"
                            )
                            ? review?.colorway_set[0]?.image_url
                            : design
                          : design
                      }
                      alt="img"
                      onError={() => {
                        // console.log(imageSet.current);
                        imageSet.current.src = design;
                        setImgError(!imgError);
                      }}
                      ref={imageSet}
                    />
                    <div className="under-review-labels">
                      <h3 className="under-review-primary-text">
                        {generalString.join(" . ")}
                      </h3>
                      <p className="under-review-secondary-text">
                        Waiting for approval
                      </p>
                    </div>
                  </div>
                </Grid>
              );
            })
          ) : (
            <div>
              <h2>No data to show</h2>
            </div>
          )}
        </Grid>
      )}
      <Pagination
        pages={pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default UnderReview;
