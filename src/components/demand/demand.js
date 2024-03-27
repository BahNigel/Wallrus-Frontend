import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import video from "../../images/about-us-video.png";
import "./demand.scss";

const Demand = () => {
  return (
    <div className="grid-cols-2-half round-border-12 margin-40">
      <div className="grid-child">
        <h2 className="h2 bold">How print on demand works</h2>
        <p className="para block-50">
          Learn how Wallrus team fulfils your designing and ship them
        </p>
        <Link to="signup">
          <Button variant="contained" className="btn-filled">
            Upload your design
          </Button>
        </Link>
      </div>
      <img className="round-border-12 block" src={video} alt="img" />
    </div>
  );
};

export default Demand;
