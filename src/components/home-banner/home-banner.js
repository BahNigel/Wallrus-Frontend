import { Button } from "@material-ui/core";
import React from "react";
import "./home-banner.css";
import { Link } from "react-router-dom";

const HomeBanner = () => {
  return (
    <div className="banner">
      <h2 className="margin-bottom-50 block-50 lh-2">
        A business platform that connects Artists & Interior Decorators through
        a range of custom manufactured decor products
      </h2>
      <Link to="/signup">
        <Button variant="contained" className="btn-filled">
          Sign up & expand your business
        </Button>
      </Link>
    </div>
  );
};

export default HomeBanner;
