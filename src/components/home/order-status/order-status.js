import "./order-status.scss";
import HomeHeader from "../main-nav/main-nav";
import Footer from "../footer/footer";
import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import Design1 from "../../../images/design1.svg";
import Design2 from "../../../images/design2.svg";
import Tick from "../../../images/shipped-green-tick.svg";
import ArrowRight from "../../../images/arrow-right-grey.svg";
import ProductCard from "../product-cards";
import Model from "../../../images/model.svg";
import { Button } from "@material-ui/core";

import clsx from "clsx";
import StepConnector from "@material-ui/core/StepConnector";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Check from "@material-ui/icons/Check";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: "calc(-50% + 15px)",
    right: "calc(50% + 15px)",
  },
  active: {
    "& $line": {
      borderColor: "#00B879",
    },
  },
  completed: {
    "& $line": {
      borderColor: "#00B879",
    },
  },
  line: {
    borderColor: "#dcdcdc",
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: "#dcdcdc",
    display: "flex",
    alignItems: "center",
  },
  inactive: {
    color: "#dcdcdc",
    backgroundColor: "#dcdcdc",
    display: "flex",
    padding: "7px",
    borderRadius: "50%",
    alignItems: "center",
  },
  active: {
    color: "#00B879",
    borderRadius: "50%",
    backgroundColor: "#E8F7EE",
    padding: "7px",
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
  completed: {
    color: "#fff",
    zIndex: 1,
    fontSize: 24,
    borderRadius: "50%",
    backgroundColor: "#00B879",
    padding: "2px",
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.inactive]: !active && !completed,
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,

  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
};

const OrderStatus = (props) => {
  const orderInformations = {
    orderStatus: "confirmed",
    orderID: "#120CB",
    orderDate: "23 Jun 21",
    orderPayment: "Visa-4669",
    orderAddress:
      "Flat 304, Om Pragan, Bada Bazzar, Kolkata, West Bengal - 733201",
    orderMRP: "2,700",
    orderWallrusCoins: "256",
  };

  const exploreDesigns = [
    {
      image: Design1,
      name: "Leslie Alexander",
      profilePic: Model,
    },
    {
      image: Design2,
      name: "Devon Lane",
      profilePic: Model,
    },
    {
      image: Design1,
      name: "Karthryn Murphy",
      profilePic: Model,
    },
    {
      image: Design2,
      name: "Leslie Alexander",
      profilePic: Model,
    },
    {
      image: Design1,
      name: "Karthryn Murphy",
      profilePic: Model,
    },
    {
      image: Design2,
      name: "Devon Lane",
      profilePic: Model,
    },
    {
      image: Design1,
      name: "Karthryn Murphy",
      profilePic: Model,
    },
    {
      image: Design2,
      name: "Devon Lane",
      profilePic: Model,
    },
  ];

  const orders = [
    {
      productName: "Art Decon . Green . Wallpaper",
      artistName: "Devon Lane",
      materialType: "Canvas Wallcovering",
      dimensions: "100 x 120 CM",
      Quantity: 2,
      price: 1800,
      deliveryDate: "20 Aug 2021",
      design: Design1,
    },
    {
      productName: "Art Decon . Green . Wallpaper",
      artistName: "Leslie Alexander",
      materialType: "Paper Backed",
      dimensions: "200 x 150 CM",
      Quantity: 1,
      price: 500,
      deliveryDate: "20 Aug 2021",
      design: Design2,
    },
    {
      productName: "Art Decon . Green . Wallpaper",
      artistName: "Kathryn Murphy",
      materialType: "Canvas Wallcovering",
      dimensions: "1 x 1 FT",
      Quantity: 3,
      price: 3000,
      deliveryDate: "20 Aug 2021",
      design: Design1,
    },
  ];

  let step;
  let totalPrice = 0;
  let wallrusCoins = 256;

  orders.forEach((current) => {
    totalPrice += current.price;
  });

  if (orderInformations.orderStatus === "not-confirmed") {
    step = 0;
  } else if (orderInformations.orderStatus === "confirmed") {
    step = 1;
  } else if (orderInformations.orderStatus === "shipped") {
    step = 2;
  } else if (orderInformations.orderStatus === "delivered") {
    step = 3;
  }

  function getSteps() {
    return ["Confirmed", "Shipped", "Delivered"];
  }
  const mainRef = React.useRef(null);

  const steps = getSteps();

  useEffect(() => {
    mainRef.current.scrollIntoView();
  }, []);

  const orderAddress = orderInformations.orderAddress.split(",");

  const [activeStep, setActiveStep] = React.useState(step);
  return (
    <React.Fragment>
      <div ref={mainRef}>
        <HomeHeader />
      </div>
      <div className="order-status-container">
        <div className="order-status">
          <h3>Your order {orderInformations.orderStatus}!</h3>
        </div>
        <div className="order-informations">
          <div className="order-id">
            <h4>ORDER ID</h4>
            <span>{orderInformations.orderID}</span>
          </div>
          <div className="order-date">
            <h4>ORDER DATE</h4>
            <span>{orderInformations.orderDate}</span>
          </div>
          <div className="order-payment">
            <h4>PAYMENT</h4>
            <span>{orderInformations.orderPayment}</span>
          </div>
          <div className="order-address">
            <h4>ADDRESS</h4>
            <span>
              {orderAddress[0]},{orderAddress[1]},{orderAddress[2]},
            </span>
            <span>
              {orderAddress[3]},{orderAddress[4]}
            </span>
          </div>
        </div>
        <div className="mobile-order-informations">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div className="order-id">
              <h4>ORDER ID</h4>
              <span>{orderInformations.orderID}</span>
            </div>
            <div className="order-date">
              <h4>ORDER DATE</h4>
              <span>{orderInformations.orderDate}</span>
            </div>
          </div>
          <div className="order-payment">
            <h4>PAYMENT</h4>
            <span>{orderInformations.orderPayment}</span>
          </div>
          <div className="order-address">
            <h4>ADDRESS</h4>
            <span>
              {orderAddress[0]},{orderAddress[1]},{orderAddress[2]},
            </span>
            <span>
              {orderAddress[3]},{orderAddress[4]}
            </span>
          </div>
        </div>
        <div className="order-status-stepper">
          <Stepper
            alternativeLabel
            activeStep={activeStep}
            connector={<QontoConnector />}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
        <Grid container spacing={1}>
          <Grid item xs={12} md={9}>
            <div className="ordered-items-container">
              {orders.map((current) => (
                <div className="ordered-item-main-container">
                  <div className="ordered-item-container">
                    <div className="ordered-item-image">
                      <img src={current.design} alt="product-image" />
                    </div>
                    <div className="ordered-item-details">
                      <div className="ordered-item-product-name">
                        <span>{current.productName}</span>
                      </div>
                      <div className="ordered-item-artist-name">
                        by {current.artistName}
                      </div>
                      <div className="ordered-item-specifications">
                        <div className="ordered-item-specifications-title">
                          <h4>MATERIAL TYPE</h4>
                          <span>{current.materialType}</span>
                        </div>
                        <div className="ordered-item-specifications-title">
                          <h4>DIMENSIONS</h4>
                          <span>{current.dimensions}</span>
                        </div>
                        <div className="ordered-item-specifications-title">
                          <h4>QUANTITY</h4>
                          <span>{current.Quantity}</span>
                        </div>
                        <div className="ordered-item-specifications-title">
                          <h4>PRICE</h4>
                          <span>{current.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mobile-ordered-item-specifications">
                    <div>
                      <div className="ordered-item-specifications-title">
                        <h4>MATERIAL TYPE</h4>
                        <span>{current.materialType}</span>
                      </div>
                      <div className="ordered-item-specifications-title">
                        <h4>QUANTITY</h4>
                        <span>{current.Quantity}</span>
                      </div>
                    </div>
                    <div>
                      <div className="ordered-item-specifications-title">
                        <h4>DIMENSIONS</h4>
                        <span>{current.dimensions}</span>
                      </div>
                      <div className="ordered-item-specifications-title">
                        <h4>PRICE</h4>
                        <span>{current.price}</span>
                      </div>
                    </div>
                  </div>
                  <div className="ordered-item-delivery-date-container">
                    <img src={Tick} alt="tick" className="green-tick" />
                    <span className="ordered-item-delivery-date-1">
                      Delivery by{" "}
                      <span className="ordered-item-delivery-date-2">
                        {current.deliveryDate}
                      </span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Grid>
          <Grid item xs={12} md={3}>
            <div className="order-summary-container">
              <h4>Order Summary</h4>
              <div className="order-mrp-coins-container">
                <div className="order-mrp-container">
                  <span>Total MRP</span>
                  <span>&#8377; {totalPrice}</span>
                </div>
                <div className="order-coins-container">
                  <span>Wallrus coins</span>
                  <span>-&#8377; {wallrusCoins}</span>
                </div>
              </div>
              <div className="order-total-container">
                <span>Total amount</span>
                <span>{totalPrice - wallrusCoins}</span>
              </div>
            </div>
            <div className="wallrus-coins-earned-main-container">
              <div className="wallrus-coins-earned-container">
                <span>Your reward in this order</span>
                <h4>{wallrusCoins} wallrus coins earned</h4>
                <span>
                  View wallrus coins{" "}
                  <img src={ArrowRight} className="view-wallrus-coins-icon" />
                </span>
              </div>
            </div>
          </Grid>
        </Grid>
        <div className="explore-designs-container">
          <h4>Explore designs</h4>
          <Grid container spacing={1}>
            {exploreDesigns.map((current, index) => (
              <ProductCard
                key={index}
                id={index}
                image={current.image}
                userimg={current.profilePic}
                artist={current.artist_unique_id}
                artistname={current.name}
                generaldata
              />
            ))}
          </Grid>
          <div className="exploreDesignsViewMoreContainer">
            <Button className="exploreDesignsViewMoreBtn">View more</Button>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default OrderStatus;
