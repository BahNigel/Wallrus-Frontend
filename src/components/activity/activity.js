import React from "react";
import "./activity.scss";
import ActivityImg from "../../images/activity.png";

const Activity = () => {
  return (
    <div className="flex activity round-border-12 margin-40">
      <div className="activity-banner">
        <div>
          <p className="capitalise bold">STORE INSIGHTS</p>
          <h1>Your business activity</h1>
        </div>
        <div>
          <p className="x-bold size-24">Analytics</p>
          <p className="bold lh-2">
            Find out which products are the most popular and how your business
            is performing in real-time.
          </p>
        </div>
        <div>
          <p className="x-bold size-24">Filtration</p>
          <p className="bold lh-2">
            Filter your product information based on colour, theme, room and
            product to get detailed information about it.
          </p>
        </div>
      </div>
      <img className="activity-img" src={ActivityImg} alt="img" />
    </div>
  );
};

export default Activity;
