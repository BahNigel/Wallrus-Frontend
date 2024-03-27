import React from "react";
import { ButtonGroup, Button } from "@material-ui/core";
import filterLogo from "../../images/Filter.svg";
import swapLogo from "../../images/Swap.svg";
import "./button-float.scss";

const ButtonFloat = (props) => {
  return (
    <ButtonGroup className="btn-group" variant="contained" color="#fff">
      <Button className="btn-group--item">
        <img src={swapLogo} alt="logo" />
        Sort
      </Button>
      <Button className="btn-group--item">
        <img src={filterLogo} alt="logo" />
        Filter
      </Button>
    </ButtonGroup>
  );
};

export default ButtonFloat;
