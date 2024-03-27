import React from "react";
import { Typography } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: "16px",
    fontWeight: "bold",
    marginLeft: "25px",
    fontFamily: "AvenirNextRegular !important",
  },
  accordionSummary: {
    flexDirection: "row-reverse",
    padding: 0,
    "& .MuiAccordionSummary-expandIcon": {
      padding: 0,
    },
    fontFamily: "AvenirNextRegular !important",
  },
  accordion: {
    marginBottom: "10px",
    boxShadow: "none",
    "&:before": {
      height: 0,
    },
    fontFamily: "AvenirNextRegular",
  },
}));

const DropdownItem = (props) => {
  const classes = useStyles();
  return (
    <Accordion className={classes.accordion}>
      <AccordionSummary
        className={classes.accordionSummary}
        expandIcon={<ExpandMoreIcon className="expand-more-icon" />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        IconButtonProps={{
          disableRipple: true,
        }}
      >
        <Typography variant="h4" className={classes.heading}>
          {props.title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.accordionSummary}>
        <Typography style={{ textAlign: "left" }}>{props.content}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default DropdownItem;
