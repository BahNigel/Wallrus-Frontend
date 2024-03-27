import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import "./info.css";
import upload from "../../images/upload.png";
import basket from "../../images/basket.png";
import dollar from "../../images/dollar.png";
import arrowForward from "../../images/arrow-forward.svg";

const Info = () => {
  const infos = [
    {
      img: upload,
      info: "Upload your design",
    },
    {
      img: basket,
      info: "Customer find & purchase product featuring your design ",
    },
    {
      img: dollar,
      info: "Product are produced by Wallrus team and shipped globally",
    },
    {
      img: dollar,
      info: "Customer gets an awesome product, & you get paid",
    },
  ];
  return (
    <div className="info padding-50">
      <h2>How Wallrus works</h2>
      <div className="grid-cols-4 gap-70" style={{ margin: "40px 0" }}>
        {infos.map((info) => {
          return (
            <div>
              <img src={info.img} alt="img" />
              <p className="x-bold">{info.info}</p>
            </div>
          );
        })}
      </div>
      <Link to="signup">
        <Button variant="contained" className="btn-filled">
          Sign up
          <img className="margin-left-10" src={arrowForward} alt="img" />
        </Button>
      </Link>
    </div>
  );
};

export default Info;
