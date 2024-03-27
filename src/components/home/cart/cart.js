import { useState, useEffect } from "react";
import Footer from "../footer/footer";
import MainNav from "../main-nav/main-nav";
import "./cart.scss";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import MyCart from "./mycart/mycart";
import ClientCart from "./client-cart/client-cart";
import axios from "axios";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Cart = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [allCart, setAllCart] = useState([]);
  const [update, setUpdate] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPrice2, setTotalPrice2] = useState(0);
  const [coins, setCoins] = useState(0);
  const [userAddress, setUserAddress] = useState({});
  const [addressFill, setAddressFill] = useState(false);
  const [open2, setOpen2] = useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [paymentSuccess, setPaymentSuccess] = useState(false);

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
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_ROOT_URL}/api/add-address`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("Access_Key")}`,
        },
      })
      .then((res) => {
        if (Object.keys(res.data).length != 0 && res.data?.user != null) {
          setAddressFill(true);
          setUserAddress(res.data);
        } else {
          setOpen2(true);
        }
      })
      .catch((err) => {
        console.log("hi");
        console.log(err.responce);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_ROOT_URL}/api/add-to-cart`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("Access_Key")}`,
        },
      })
      .then((res) => {
        console.log(res.data.items);

        setAllCart(res.data.items);

        var result = res.data.items.reduce(function (tot, arr) {
          return tot + arr.price;
        }, 0);
        setTotalPrice(result);
        setTotalPrice2(result);
      })
      .catch((err) => console.log(err));
  }, [update]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_ROOT_URL}/api/decorator-snippet`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("Access_Key")}`,
        },
      })
      .then((res) => {
        setCoins(res.data.reward_points);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Stack spacing={2} direction="row">
        <CircularProgress
          style={{
            position: "absolute",
            top: "7%",
            left: "49%",
            zIndex: "1",
            display: paymentSuccess ? "block" : "none",
          }}
          color="success"
        />
      </Stack>
      <MainNav />
      <div className="client-cart-container">
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab
            className="tab"
            label={`My Cart (${allCart.length}) `}
            {...a11yProps(0)}
          />
          <Tab className="tab" label="Client Cart" {...a11yProps(1)} />
        </StyledTabs>
        <TabPanel value={value} index={0}>
          <MyCart
            allCart={allCart}
            setUpdate={setUpdate}
            totalPrice={totalPrice}
            totalPrice2={totalPrice2}
            setTotalPrice2={setTotalPrice2}
            coins={coins}
            userAddress={userAddress}
            setUserAddress={setUserAddress}
            paymentSuccess={paymentSuccess}
            setPaymentSuccess={setPaymentSuccess}
            setOpen2={setOpen2}
            open2={open2}
            setAddressFill={setAddressFill}
            addressFill={addressFill}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ClientCart />
        </TabPanel>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
