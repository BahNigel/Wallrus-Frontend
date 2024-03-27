import React from "react";
import "./story-card.scss";

const StoryCard = (props) => {
  return (
    <div className="story-card">
      <h2 className="h2 bold">{props.storyHeading}</h2>
      <img className="story-img" src={props.storyImg} alt="img" />
      <p className="para lh-2">{props.storyPara}</p>
    </div>
  );
};

export default StoryCard;
