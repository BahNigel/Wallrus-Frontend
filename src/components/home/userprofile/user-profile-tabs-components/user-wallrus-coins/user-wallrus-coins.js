import { Grid } from "@material-ui/core";
import "./user-wallrus-coins.scss";
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

const UserWallrusCoins = ({ coins }) => {
  const [coinTransaction, setCoinTransaction] = useState([]);
  const wallrus_coins_data = [
    {
      description: "ArtDecon . Green . Wallpaper",
      date: "19 June 2021",
      amount: "1900",
      coins_credit: "250",
      coins_debt: "-",
    },
    {
      description: "Referral",
      date: "19 June 2021",
      amount: "-",
      coins_credit: "250",
      coins_debt: "-",
    },
    {
      description: "ArtDecon . Green . Wallpaper",
      date: "19 June 2021",
      amount: "1900",
      coins_credit: "250",
      coins_debt: "-",
    },
    {
      description: "ArtDecon . Green . Wallpaper",
      date: "19 June 2021",
      amount: "1900",
      coins_credit: "250",
      coins_debt: "-",
    },
  ];

  const classes = useStyles();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_ROOT_URL}/api/coin-transaction`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("Access_Key")}`,
        },
      })
      .then((res) => {
        setCoinTransaction(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="wallrus-coins">
      <Grid container direction="row" spacing={1}>
        <div className="wallrus-coins-header">
          <h4>Total available coins</h4>
          <h1>{coins}</h1>
          <p>1 coin is worth &#8377; 1</p>
        </div>
        <div className="coins-history">
          <h3 className="heading">Coins History</h3>
          <Grid container className="coins-history-header">
            <Grid className="description" item xs={3}>
              Description
            </Grid>
            <Grid item xs={3}>
              Amount
            </Grid>
            <Grid item xs={3}>
              Coins credit
            </Grid>
            <Grid item xs={3}>
              Coins debt
            </Grid>
          </Grid>
          <div className="coins-history-list">
            {coinTransaction.map((current, index) => (
              <Grid item xs={12} className="wallrus-coins-list" key={index}>
                <Grid container className="wallrus-coins-list-items">
                  <Grid item xs={3} className="wallrus-coins-list-item-name">
                    {current.description}
                    <p>{current.created_at}</p>
                  </Grid>
                  <Grid item xs={3} className="wallrus-list-item-amount">
                    &#8377; {current.amount}
                  </Grid>
                  <Grid item xs={3} className="wallrus-list-item-coins-credit">
                    <span>{current.credit}</span>
                  </Grid>
                  <Grid item xs={3} className="wallrus-list-item-coins-debt">
                    <span>{current.debit ? current.debit : "0"}</span>
                  </Grid>
                </Grid>
              </Grid>
            ))}
            {/* <h3 className="toggle-view-more">View More</h3> */}
          </div>
        </div>
        <div className="membership-container">
          <h2 className="membership-title">Membership</h2>
          <Accordion className={classes.accordion}>
            <AccordionSummary
              className={classes.accordionSummary}
              expandIcon={
                <ExpandMoreIcon className="expand-more-icon-membership" />
              }
              aria-controls="panel1a-content"
              id="panel1a-header-membership"
              IconButtonProps={{
                disableRipple: true,
              }}
            >
              <Typography variant="h4" className={classes.heading}>
                Eligibility
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="membership-accordian-details">
              <Typography>
                By Agreeing to the Artist’s Agreement, you represent and warrant
                that you own or otherwise are authorized to use the design being
                offered. You further agree that the sale of a product with this
                design will not violate the copyright, trademark or other
                proprietary rights of any third-party. Further, you will not use
                any third-party trademark, trade names, or publicity rights in
                connection with the name, description or tags associated with
                your design that may result in confusion as to the source of the
                design. The Wallrus Company reserves the right to modify, block,
                edit or delete any design, term or terms used to promote a
                design if it believes, in its exclusive discretion, that the use
                may violate a third-party right or is otherwise objectionable.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion className={classes.accordion}>
            <AccordionSummary
              className={classes.accordionSummary}
              expandIcon={
                <ExpandMoreIcon className="expand-more-icon-membership" />
              }
              aria-controls="panel1a-content"
              id="panel1a-header-memberhsip"
              IconButtonProps={{
                disableRipple: true,
              }}
            >
              <Typography variant="h4" className={classes.heading}>
                Terms & Conditions
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="membership-accordian-details">
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion className={classes.accordion}>
            <AccordionSummary
              className={classes.accordionSummary}
              expandIcon={
                <ExpandMoreIcon className="expand-more-icon-membership" />
              }
              aria-controls="panel1a-content"
              id="panel1a-header-membership"
              IconButtonProps={{
                disableRipple: true,
              }}
            >
              <Typography variant="h4" className={classes.heading}>
                Membership levels criteria
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="accordian-details-membership">
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </Grid>
    </div>
  );
};

export default UserWallrusCoins;
