import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
import Footer from "../../home/footer/footer";
import MainNav from "../main-nav/main-nav";
import { useLocation } from "react-router-dom";
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

const SharedCart = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [allCart, setAllCart] = useState([]);
  const [update, setUpdate] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPrice2, setTotalPrice2] = useState(0);
  const [coins, setCoins] = useState(0);
  const [address, setAddress] = useState({});
  const [data, setData] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [addressFill, setAddressFill] = useState(false);
  const [open2, setOpen2] = useState(false);
  const { client, cart } = useParams();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_ROOT_URL}/api/client-address?client_id=${client}`
      )
      .then((res) => {
        if (Object.keys(res.data).length != 0 && res.data?.user != null) {
          setAddress(res.data);
          setAddressFill(true);
        } else {
          setOpen2(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_ROOT_URL}/api/client-view/?client=${client}&cart=${cart}`
      )
      .then((res) => {
        setData(res.data);
        var result = res.data.items.reduce(function (tot, arr) {
          return tot + arr.price;
        }, 0);
        setTotalPrice(result);
        setTotalPrice2(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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

  return (
    <div>
      <MainNav />
      <div className="main-cart-container">
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab
            className="tab"
            label={`My Cart ${data ? data.items?.length : 0} `}
            {...a11yProps(0)}
          />
        </StyledTabs>
        <TabPanel value={value} index={0}>
          <MyCart
            allCart={data ? data.items : []}
            setUpdate={setUpdate}
            totalPrice={totalPrice}
            totalPrice2={totalPrice2}
            setTotalPrice2={setTotalPrice2}
            cartId={cart}
            clientId={client}
            userAddress={address}
            setUserAddress={setAddress}
            refresh={refresh}
            setRefresh={setRefresh}
            setOpen2={setOpen2}
            open2={open2}
            setAddressFill={setAddressFill}
            addressFill={addressFill}
          />
        </TabPanel>
      </div>
      <Footer />
    </div>
  );
};

export default SharedCart;
