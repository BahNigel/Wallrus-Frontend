import React from "react";
import StoryCard from "../story-card/story-card";
import design from "../../../../../images/about-us-design.png";
import video from "../../../../../images/about-us-video.png";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import "./story.scss";

const Story = (props) => {
  const heading = "Our Story";
  const para =
    "Our style is a unique curation of all periods and provenance with a distinctive European influence. We reinterpret classic designs in a contemporary way, so pieces feel at once fresh and timeless. Our designers constantly travel the world in search of new trends in fashion, color and style that we translate into exclusive products you can't find anywhere else. Today, we offer more than 300 pieces you can customize from finish to fabric. With Ballard, you can make any project your own.";

  return (
    <div className="story">
      <h1 className="h1 bold">{heading}</h1>
      <p className="para lh-2">{para}</p>
      <p className="para lh-2">{para}</p>
      <StoryCard
        storyHeading="Uncommon designs on awesome stuff."
        storyPara="Our style is a unique curation of all periods and provenance with a distinctive European influence. We reinterpret classic designs in a contemporary way, so pieces feel at once fresh and timeless. Our designers constantly travel the world in search of new trends in fashion, color and style that we translate into exclusive products you can't find anywhere else. Today, we offer more than 300 pieces you can customize from finish to fabric. With Ballard, you can make any project your own."
        storyImg={design}
      />
      <StoryCard
        storyHeading="How print on demand works"
        storyPara="Learn how Wallrus team fulfils your designing and ship them"
        storyImg={video}
      />
      <Link to="signup">
        <Button variant="contained" className="btn-filled">
          Upload your design
        </Button>
      </Link>
    </div>
  );
};

export default Story;
