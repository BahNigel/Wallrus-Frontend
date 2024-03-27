import React from "react";
import "./pagination.scss";
import { Button, Box } from "@material-ui/core";

const Pagination = (props) => {
  const normal = ["page-no"].join(" ");
  const active = ["page-no", "page-no--active"].join(" ");
  const pageContainer = {
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
  };

  const arrowForward = (
    <svg
      width="10"
      height="16"
      viewBox="0 0 10 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.5 1L8.5 8L1.5 15"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );

  const arrowBack = (
    <svg
      width="10"
      height="16"
      viewBox="0 0 10 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.5 15L1.5 8L8.5 1"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );

  const button = (onClickFunc, disabled, label, iconLeft, iconRight) => {
    return (
      <Button
        disabled={disabled}
        onClick={onClickFunc}
        variant="outlined"
        style={{ width: "auto", alignItems: "center" }}
      >
        {iconLeft && (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "10px",
            }}
          >
            {iconLeft}
          </span>
        )}
        <p style={{ margin: 0, fontSize: 18 }}>{label}</p>
        {iconRight && (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "10px",
            }}
          >
            {iconRight}
          </span>
        )}
      </Button>
    );
  };

  const btnPrevious = button(
    () => props.setCurrentPage(props.currentPage - 1),
    props.currentPage === 1,
    "Previous",
    arrowBack,
    null
  );

  const btnNext = button(
    () => props.setCurrentPage(props.currentPage + 1),
    props.pages < 20,
    "Next",
    null,
    arrowForward
  );

  return (
    <Box style={{ display: "flex", margin: 40 }}>
      {btnPrevious}
      <Box style={pageContainer}>
        <span
          // onClick={() => props.setCurrentPage(index)}
          className="normal"
        >
          {props.currentPage}
        </span>
      </Box>
      {btnNext}
    </Box>
  );
};

export default Pagination;
