import "./order-management.scss";
import { useState, useEffect } from "react";
import {
  Button,
  CircularProgress,
  Tabs,
  Tab,
  Box,
  Typography,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ProductCard from "../product-card/product-card";
import MyCart from "../home/cart/mycart/mycart";
import ClientCart from "../home/cart/client-cart/client-cart";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Fade from "@material-ui/core/Fade";

const OrderManagement = (props) => {
  const [index, setIndex] = useState(0);
  const [loader, setloader] = useState(true);
  const [designContents, setdesignContents] = useState([]);
  const [value, setValue] = useState(0);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [state, setState] = React.useState({
    open: false,
    Transition: Fade,
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const StyledTabs = withStyles({
    indicator: {
      display: "flex",
      justifyContent: "start",
      backgroundColor: "transparent",
      "& > span": {
        maxWidth: 0,

        width: "0%",
        borderBottom: "1px solid #1B1918",
      },
    },
    root: {
      maxWidth: "100% !important",
    },
  })((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

  const changeTab = (e, n) => {
    setIndex(n);
    document.querySelector(".selected").classList.remove("selected");
    document
      .querySelector(`.order-container .tabs button:nth-child(${n + 1})`)
      .classList.add("selected");
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_ROOT_URL}/api/decorator-favourites`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("Access_Key")}`,
        },
      })
      .then((res) => {
        res = res.data;
        let list = [
          {
            name: "Sanjay ",
            image:
              "/media/products/gray-and-black-hive-printed-textile-691710_oquyXav.jpg",
            artist_image: "/media/profile_pictures/IMG_20201219_162656.jpg",
            sku: 4,
            slug: "curtainTest",
          },
          {
            name: "Isanur Sardar",
            image: "/media/products/flowers.jpg",
            artist_image:
              "/media/profile_pictures/Screenshot_from_2021-12-10_20-53-00.png",
            sku: 3,
            slug: "flower",
          },
          {
            name: "Sanjay ",
            image:
              "/media/products/abstract-arrangement-with-paper-boats-yellow-background_23-2148476802.jpg",
            artist_image: "/media/profile_pictures/IMG_20201219_162656.jpg",
            sku: 1,
            slug: "boats-wallpaper",
          },
        ];
        res.forEach((value) => {
          const design = {
            name: value.artist,
            image: value.image,
            artist_image: value.artist_image,
            sku: value.sku,
            slug: value.slug,
          };
          list.push(design);
        });
        setloader(false);
        setdesignContents(list);
      })
      .catch((err) => {
        // alert("Couldn't fetch your favorite designs")
        setState({ ...state, open: true });
        setMessage("Couldn't fetch your favorite designs");
        setErrorMessage("error");
      });
  }, []);

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setState({
      ...state,
      open: false,
    });
  };

  return (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        TransitionComponent={state.Transition}
        open={state.open}
        autoHideDuration={2000}
        onClose={handleClose}
        key={state.Transition.name}
      >
        <Alert
          onClose={handleClose}
          severity={errorMessage}
          // sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      <div className="order-container">
        <div className="tabs">
          <Button className="selected" onClick={(e) => changeTab(e, 0)}>
            My Favourites
          </Button>
          <Button onClick={(e) => changeTab(e, 1)}>My Projects</Button>
          <Button onClick={(e) => changeTab(e, 2)}>My Cart</Button>
        </div>
        {index === 0 ? (
          loader ? (
            <div
              style={{
                display: "flex",
                padding: "20vw 0",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <CircularProgress
                size={50}
                style={{ color: "#000", margin: "40px 0 60px" }}
              />
            </div>
          ) : designContents && designContents.length === 0 ? (
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                padding: "10vw 0",
              }}
            >
              No data to show
            </div>
          ) : (
            <div className="fav-design-grid">
              {designContents.map((item, index) => (
                <ProductCard
                  key={item.sku}
                  id={item.slug}
                  sku={item.sku}
                  artist={item.artist_unique_id}
                  designImage={`${process.env.REACT_APP_ROOT_URL}${item.image}`}
                  designerImage={`${process.env.REACT_APP_ROOT_URL}${item.artist_image}`}
                  designerName={item.name}
                  isFavourite={true}
                  shouldRemoveFavourite
                  // removeFavourite={() => removeFavourite(item.sku)}
                  // onClick={() => handleClick(item.slug)}
                  general
                />
              ))}
            </div>
          )
        ) : (
          ""
        )}

        {index === 1 ? (
          loader ? (
            <div
              style={{
                display: "flex",
                padding: "20vw 0",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <CircularProgress
                size={50}
                style={{ color: "#000", margin: "40px 0 60px" }}
              />
            </div>
          ) : designContents && designContents.length === 0 ? (
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                padding: "10vw 0",
              }}
            >
              No data to show
            </div>
          ) : (
            <div className="fav-design-grid">
              {designContents.map((item, index) => (
                <ProductCard
                  key={item.sku}
                  id={item.slug}
                  sku={item.sku}
                  artist={item.artist_unique_id}
                  designImage={`${process.env.REACT_APP_ROOT_URL}${item.image}`}
                  designerImage={`${process.env.REACT_APP_ROOT_URL}${item.artist_image}`}
                  designerName={item.name}
                  isFavourite={true}
                  shouldRemoveFavourite
                  // removeFavourite={() => removeFavourite(item.sku)}
                  // onClick={() => handleClick(item.slug)}
                  general
                />
              ))}
            </div>
          )
        ) : (
          ""
        )}

        {index === 2 && (
          <div className="cart-container">
            <StyledTabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
            >
              <Tab className="tab" label="My Cart (1)" {...a11yProps(0)} />
              <Tab className="tab" label="Client Cart" {...a11yProps(1)} />
            </StyledTabs>
            <TabPanel value={value} index={0}>
              <MyCart />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <ClientCart />
            </TabPanel>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default OrderManagement;
