import React from "react";
import "./reviews.scss";
import { useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Prev from "../../images/carousel-left-arrow.svg";
import Next from "../../images/carousel-right-arrow.svg";

const Reviews = (props) => {
  const [indexes, setIndexes] = useState({ current: 0, next: 1 });

  const prev = () => {
    if (indexes.current > 0) {
      setIndexes({ current: indexes.current - 1, next: indexes.next - 1 });
    }
  };

  const next = () => {
    if (indexes.current < props.reviews.length - 1) {
      setIndexes({ current: indexes.current + 1, next: indexes.next + 1 });
    }
  };

  let transform = null;
  if (props.reviews.length === 1) {
    transform = null;
  } else if (indexes.current === 0) {
    transform = "transform-left-50";
  } else if (indexes.current === props.reviews.length - 1) {
    transform = "transform-right-50";
  }

  let prevReviewer =
    indexes.current > 0 ? (
      <img
        className="user-img unactive"
        src={props.reviews[indexes.current - 1].reviewerImage}
        alt=''
      />
    ) : null;

  let nextReviewer =
    indexes.current < props.reviews.length - 1 ? (
      <img
        className="user-img unactive"
        src={props.reviews[indexes.current + 1].reviewerImage}
        alt=''
      />
    ) : null;

  let review;

  if (!props.loading && props.reviews.length > 0) {
    review = (
      <>
        <p className="lh-2 para margin-y-40">
          {props.reviews[indexes.current].review}
        </p>
        <div className="flex">
          <div className={`user ${transform}`}>
            {prevReviewer}
            <img
              className="user-img"
              src={props.reviews[indexes.current].profile_picture}
              alt=''
            />
            {nextReviewer}
          </div>
        </div>
        <p className="x-bold block">
          {props.reviews[indexes.current].reviewer}
        </p>
      </>
    );
  } else {
    review = (
      <CircularProgress size={50} className="circular-progress" />
    );
  }

  return (
    <div className="reviews round-border-12 margin-40">
      <img className="left-150 center-y pointer" src={Prev} onClick={prev} />
      <img className="right-150 center-y pointer" src={Next} onClick={next} />
      <h2>Don't just believe our word</h2>
      {review}
    </div>
  );
};

export default Reviews;
