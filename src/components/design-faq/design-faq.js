import "./design-faq.scss";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useEffect, useState } from "react";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: "16px",
    fontWeight: "bold",
    marginLeft: "25px",
  },
  accordionSummary: {
    flexDirection: "row-reverse",
    padding: 0,
    "& .MuiAccordionSummary-expandIcon": {
      padding: 0,
    },
  },
  accordion: {
    marginBottom: "10px",
    boxShadow: "none",
    "&:before": {
      height: 0,
    },
  },
}));

const DesignFAQ = (props) => {
  const classes = useStyles();
  const [content1, setContent1] = useState({});
  const [content2, setContent2] = useState({});
  const [content3, setContent3] = useState({});
  const [content4, setContent4] = useState({});

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_ROOT_URL}/api/content/understand_wallrus_business_ecosystem`
      )
      .then((res) => {
        setContent1(res.data);
      });
    axios
      .get(`${process.env.REACT_APP_ROOT_URL}/api/content/artists_agreements`)
      .then((res) => {
        setContent2(res.data);
      });
    axios
      .get(
        `${process.env.REACT_APP_ROOT_URL}/api/content/uploading_managing_designs`
      )
      .then((res) => {
        setContent3(res.data);
      });
    axios
      .get(
        `${process.env.REACT_APP_ROOT_URL}/api/content/understanding_media_art_working`
      )
      .then((res) => {
        setContent4(res.data);
      });
  }, []);

  return (
    <div className="faqs-container">
      <div className="faqs-div">
        <h2 className="faqs-title">
          Understand The Wallrus Business Ecosystem{" "}
        </h2>
        <p className="faqs-subtitle">{content1.header}</p>
        <ul className="faqs-subtitle">
          {content1.items?.map((item) => (
            <li>{item.text}</li>
          ))}
        </ul>
      </div>
      <hr className="horizontal-line" noshade />
      <div className="artists-agreements-container">
        <h2 className="faqs-title">Artist’s Agreements</h2>
        {content2.items?.map((item) => (
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
                {item.heading}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="accordian-details">
              <Typography>{item.text}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
      <hr className="horizontal-line" noshade />
      <div className="uploading-managing-designs-container">
        <h2 className="faqs-title">Uploading and Managing your Designs</h2>
        {content3.items?.map((item) => (
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
                {item.heading}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="accordian-details">
              <Typography>{item.text}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
      <hr className="horizontal-line" noshade />
      <div className="understanding-media-art-container">
        <h2 className="faqs-title">Understanding the Media & Art working</h2>
        {content4.items?.map((item) => (
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
                {item.heading}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="accordian-details">
              <Typography>{item.text}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default DesignFAQ;
