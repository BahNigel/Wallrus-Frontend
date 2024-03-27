import React from "react";
import "./design-card.scss";

const DesignCard = (props) => {
  return (
    <div className="design-card">
      <img
        className="block round-border-12 margin-bottom-10 square"
        src={props.designImage}
        alt=""
      />
      <div className="design-card--bottom">
        <img className="user-img" src={props.designerImage} alt="" />
        <p className="para x-bold" style={{ fontSize: 20 }}>
          {props.designerName}
        </p>
        <p className="text-grey bold">{props.noOfDesigns} designs</p>
      </div>
    </div>
  );
};

export default DesignCard;
