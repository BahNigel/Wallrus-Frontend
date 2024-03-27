import "./user-analytics.scss";
import { Grid, CircularProgress } from "@material-ui/core";
import Bag from "../../../../../images/Bag.svg";
import Uptrend from "../../../../../images/uptrend.svg";
import Downtrend from "../../../../../images/downtrend.svg";
import Earning from "../../../../../images/Earning.svg";
import Following from "../../../../../images/Folowing.svg";
import Collection from "../../../../../images/Collections.svg";
import Heart from "../../../../../images/Heart.svg";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";
import { getAnalytics } from "../../../../../apis/apiCalls";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Fade from "@material-ui/core/Fade";

const formatYAxis = (num) => {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
    : Math.sign(num) * Math.abs(num);
};

const UserAnalytics = ({ coins, mobile }) => {
  const [loader, setLoader] = useState(true);
  const [analytics, setAnalytics] = useState();
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [state, setState] = useState({
    open: false,
    Transition: Fade,
  });

  useEffect(() => {
    const init = async () => {
      try {
        const response = await getAnalytics();
        transformAnalytics(response);
        setLoader(false);
      } catch (err) {
        console.log(err);
        // alert("Something went wrong");
        setState({ ...state, open: true });
        setMessage("Something went wrong");
        setErrorMessage("error");
      }
    };
    init();
  }, []);

  const transformAnalytics = (analytics) => {
    const mobileCoord = ["M", "T", "W", "T", "F", "S", "S"];
    const coord = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const data = [];
    for (let i = 0; i < coord.length; i++) {
      data.push({
        name: mobile ? mobileCoord[i] : coord[i],
        sold: analytics["Graph Coordinates"][coord[i]],
      });
    }
    setAnalytics({
      purchased: analytics["Purchased"],
      following: analytics["Following"],
      favourites: analytics["Favourites"],
      collection: analytics["Collection"],
      wallrusCoins: analytics["Wallrus Coins"],
      coordinates: data,
    });
  };

  let overview_data = [];

  if (analytics) {
    overview_data = [
      {
        icon: Bag,
        title: "Purchased",
        value: analytics.purchased,
        percent: "12% vs last 7 days",
        trend: Downtrend,
      },
      {
        icon: Following,
        title: "Following",
        value: analytics.following,
        percent: "25% vs last 7 days",
        trend: Uptrend,
      },
      {
        icon: Heart,
        title: "Favourites",
        value: analytics.favourites,
        percent: "25% vs last 7 days",
        trend: Uptrend,
      },
      {
        icon: Collection,
        title: "Collection",
        value: analytics.collection,
        percent: "25% vs last 7 days",
        trend: Uptrend,
      },
      {
        icon: Earning,
        title: "Wallrus Coins",
        value: `${coins} Coins`,
        percent: "12% vs last 7 days",
        trend: Downtrend,
      },
    ];
  }

  let day = [];
  day = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const data = [
    {
      name: day[0],
      sold: 1000,
    },
    {
      name: day[1],
      sold: 2500,
    },
    {
      name: day[2],
      sold: 1800,
    },
    {
      name: day[3],
      sold: 8500,
    },
    {
      name: day[4],
      sold: 1000,
    },
    {
      name: day[5],
      sold: 6000,
    },
    {
      name: day[6],
      sold: 13000,
    },
  ];

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
    <>
      <Snackbar
        anchorOrigin={{
          horizontal: "center",
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
      <div className="user-analytics">
        {loader ? (
          <div style={{ margin: "30vh auto", textAlign: "center" }}>
            <CircularProgress size={80} style={{ color: "#000" }} />
          </div>
        ) : (
          <Grid container direction="column" spacing={1}>
            <h3 className="user-overview-header">OVERVIEW</h3>
            <div className="user-overview">
              {overview_data.map((item, index) => {
                return (
                  <div className="overview-div">
                    <div className="user-overview-header">
                      <img src={item.icon} alt="icon" />
                      <p>{item.title}</p>
                    </div>
                    <div className="user-overview-trend">
                      <h1>{item.value}</h1>
                      <img src={item.trend} alt="trend" />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="analytics-graph">
              <h3>STATS</h3>

              <ResponsiveContainer width="95%" height="80%">
                <LineChart
                  data={analytics.coordinates}
                  margin={
                    mobile
                      ? { top: 0, right: 5, left: 0, bottom: 5 }
                      : {
                          top: 5,
                          right: 30,
                          left: 60,
                          bottom: 5,
                        }
                  }
                >
                  <CartesianGrid stroke="#F5F5F5" vertical={false} />
                  <XAxis axisLine={false} dy={30} dataKey="name" />
                  <YAxis
                    tickCount={7}
                    axisLine={false}
                    label={
                      mobile
                        ? ""
                        : {
                            value: "number of orders",
                            fill: "#6F6F6F",
                            dx: -70,
                            angle: -90,
                            position: "center",
                          }
                    }
                    tickFormatter={formatYAxis}
                    dx={-20}
                  />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="sold"
                    strokeWidth="1"
                    stroke="#6F6F6F"
                    activeDot={{ r: 8 }}
                    dot={{ stroke: "#FADD4B", fill: "#FADD4B", strokeWidth: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Grid>
        )}
      </div>
    </>
  );
};

export default UserAnalytics;
