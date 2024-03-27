import { Divider, Grid } from "@material-ui/core";
import "./client-cart.scss";
import add from "../../../../images/add.svg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import MyCart from "../mycart/mycart";
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

const ClientCart = (props) => {
  const [clientCart, setClientCart] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
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
  const [share, setShare] = useState({});
  const [addressFill, setAddressFill] = useState(false);
  const [open2, setOpen2] = useState(false);
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
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_ROOT_URL}/api/share-cart/`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("Access_Key")}`,
        },
      })
      .then((res) => {
        setClientCart(res.data);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.log(err);
        setIsLoaded(true);
      });
  }, []);

  const showClientCart = (item) => {
    setShare({ client: item.client.id, cart: item.id });
    console.log(item);
    axios
      .get(
        `${process.env.REACT_APP_ROOT_URL}/api/client-view/?client=${item.client.id}&cart=${item.id}`
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
  };
  return (
    <div>
      <div className="client-cart-wrap">
        <Grid
          className="mycart-container"
          spacing={2}
          style={{
            maxWidth: "400px",
            width: "100%",
          }}
        >
          {isLoaded &&
            clientCart?.map((item, i) => (
              <Grid item xs={12} onClick={() => showClientCart(item)}>
                {/* <Grid className="my-cart-left-container-address">
            <div className="address-header">
              <p>Deliver to:</p>
              <span
                onClick={() => {
                  // setShowAddAddress(true);
                  handleOpen2();
                }}
              >
                <img src={add} /> Add new address
              </span>
            </div>
            <div>
              <p></p>
            </div>
          </Grid> */}
                <div
                  style={{
                    border: "1px solid #dcdcdc",
                    borderRadius: "8px",
                    margin: "5px",
                    padding: "14px",
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <small>Client contact {item.client.contact}</small>
                  <small>
                    Description:
                    <br />
                    {item.description}
                  </small>
                  <small>
                    Shareable Link:
                    <br />
                    <Link
                      to={`shared/${item.client.id}/${item.id}`}
                      target="_blank"
                    >
                      https://wallruscompany.com/shared/{item.client.id}/
                      {item.id}
                    </Link>
                  </small>
                </div>
              </Grid>
            ))}
        </Grid>
        <Grid>
          {share.client && (
            <MyCart
              allCart={data ? data.items : []}
              setUpdate={setUpdate}
              totalPrice={totalPrice}
              totalPrice2={totalPrice2}
              setTotalPrice2={setTotalPrice2}
              cartId={share.cart}
              clientId={share.client}
              userAddress={address}
              setUserAddress={setAddress}
              refresh={refresh}
              setRefresh={setRefresh}
              setOpen2={setOpen2}
              open2={open2}
              setAddressFill={setAddressFill}
              addressFill={addressFill}
              hideMore
            />
          )}
        </Grid>
      </div>
    </div>
  );
};

export default ClientCart;
