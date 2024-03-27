import { Button } from '@material-ui/core';
import React from 'react';
import "./sign-up-card.scss";

const SignUpCard = (props) => {
  const backgroundImage = {
    backgroundImage: `url(${props.bgImage})`
  }

  return (
    <div className="sign-up-card text-white round-border-12" style={backgroundImage}>
      <div className="title">
        <div className="left-20 bottom-30">
        <p className="capital x-thin size-24 margin-10">{props.title}</p>
        <p className="x-bold capital size-48 margin-10">{props.type}</p>
        </div>
      </div>
      <a href="signup">
        <Button variant="contained" className="btn-white transform-up-50">
          {props.btnText}
        </Button>
      </a>
      <a href="#" className="para learn-more text-white">Learn more</a>
    </div>
  );
}

export default SignUpCard;
