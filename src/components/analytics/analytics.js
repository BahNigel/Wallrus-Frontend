import "./analytics.scss";
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
import { CircularProgress, Grid } from "@material-ui/core";
import Earning from "../../images/Earning.svg";
import Show from "../../images/Show.svg";
import Heart from "../../images/Heart.svg";
import Buy from "../../images/Buy.svg";
import Followers from "../../images/3 User.svg";
import DownTrend from "../../images/downtrend.svg";
import UpTrend from "../../images/uptrend.svg";
import Lock from "../../images/Lock.svg";
import EarningMob from "../../images/EarningMobile.svg";
import FollowersMob from "../../images/3 User Mobile.svg";
import HeartMob from "../../images/HeartMobile.svg";
import BuyMob from "../../images/BuyMobile.svg";
import axios from "axios";
import { useEffect, useState } from "react";
import { getAnalytics } from "../../apis/apiCalls";

const formatYAxis = (num) => {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
    : Math.sign(num) * Math.abs(num);
};

const Analytics = (props) => {
  const [analytics, setAnalytics] = useState();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const response = await getAnalytics();
        transformAnalytics(response);
        setLoader(false);
      } catch (err) {
        setLoader(false);
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
      earning: analytics["Earning"],
      sales: analytics["Sales"],
      favourites: analytics["Favourites"],
      views: analytics["Views"],
      followers: analytics["Followers"],
      coordinates: data,
    });
  };

  const { mobile } = props;
  let day = [];
  mobile
    ? (day = ["M", "T", "W", "T", "F", "S", "S"])
    : (day = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);
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
  return (
    <div>
      {loader ? (
        <div style={{ margin: "30vh auto", textAlign: "center" }}>
          <CircularProgress size={80} style={{ color: "#000" }} />
        </div>
      ) : (
        <>
          {mobile ? (
            <div className="mobile-overview">
              <h3>OVERVIEW</h3>
              <div className="mobile-overview-contents-1">
                <div className="analytics-earning-mobile">
                  <div className="overview-sub-headings-mobile">
                    <img className="" src={EarningMob} alt=""></img>
                    <span>
                      <h5>Earning</h5>
                    </span>
                  </div>
                  <div className="price-trend-mobile">
                    <h1>&#8377; {analytics.earning}</h1>
                  </div>
                </div>
                <div className="analytics-earning-mobile">
                  <div className="analytics-earning-mobile">
                    <div className="overview-sub-headings-mobile">
                      <img src={FollowersMob} alt=""></img>
                      <span>
                        <h5>Followers</h5>
                      </span>
                    </div>
                    <div className="price-trend-mobile">
                      <h1>{analytics.followers}</h1>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mobile-overview-contents-2">
                <div className="analytics-earning-mobile">
                  <div className="overview-sub-headings-mobile">
                    <img className="" src={BuyMob} alt=""></img>
                    <span>
                      <h5>Sales</h5>
                    </span>
                  </div>
                  <div className="price-trend-mobile">
                    <h1>&#8377; {analytics.sales} </h1>
                  </div>
                </div>
                <div className="analytics-earning-mobile">
                  <div className="analytics-earning-mobile">
                    <div className="overview-sub-headings-mobile">
                      <img src={HeartMob} alt=""></img>
                      <span>
                        <h5>Favourites</h5>
                      </span>
                    </div>
                    <div className="price-trend-mobile">
                      <h1> {analytics.favourites} </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="overview">
              <h3>OVERVIEW</h3>
              <Grid
                className={
                  mobile ? "mobile-overview-contents" : "overview-contents"
                }
                container
              >
                <Grid className="analytics-earning" item xs>
                  <div className="overview-sub-headings">
                    <img src={Earning} alt=""></img>
                    <h5>Earning</h5>
                  </div>
                  <div className="price-trend">
                    <h1>&#8377; {analytics.earning}</h1>
                    <img src={DownTrend} alt=""></img>
                  </div>
                </Grid>
                <Grid className="analytics-sales" item xs>
                  <div className="overview-sub-headings">
                    <img src={Buy} alt=""></img>
                    <h5>Sales</h5>
                  </div>
                  <div className="price-trend">
                    <h1>{analytics.sales}</h1>
                    <img src={UpTrend} alt=""></img>
                  </div>
                </Grid>
                <Grid className="analytics-followers" item xs>
                  <div className="overview-sub-headings">
                    <img src={Followers} alt=""></img>
                    <h5>Followers</h5>
                  </div>
                  <div className="price-trend">
                    <h1>{analytics.followers}</h1>
                    <img src={UpTrend} alt=""></img>
                  </div>
                </Grid>
                <Grid className="analytics-favourites" item xs>
                  <div className="overview-sub-headings">
                    <img src={Heart} alt=""></img>
                    <h5>Favourites</h5>
                  </div>
                  <div className="price-trend">
                    <h1>{analytics.favourites}</h1>
                    <img src={UpTrend} alt=""></img>
                  </div>
                </Grid>
                <Grid className="analytics-views" item xs>
                  <div className="overview-sub-headings">
                    <img src={Show} alt=""></img>
                    <h5>Views</h5>
                  </div>
                  <div className="price-trend">
                    <h1>{analytics.views}</h1>
                    <img src={UpTrend} alt=""></img>
                  </div>
                </Grid>
              </Grid>
            </div>
          )}

          <Grid
            className={
              mobile ? "mobile-performance-analysis" : "performance-analysis"
            }
            container
          >
            <h3>PERFORMANCE ANALYSIS</h3>
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
          </Grid>

          <Grid
            className={mobile ? "mobile-platinum-only" : "platinum-only"}
            container
          >
            <h3>TRENDS ACROSS PLATFORMS</h3>
            <div
              className={mobile ? "mobile-platinum-hidden" : "platinum-hidden"}
            >
              <ResponsiveContainer width="95%" height="100%">
                <LineChart
                  data={data}
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
                    type="category"
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
            <div
              className={
                mobile ? "mobile-platinum-lock-div" : "platinum-lock-div"
              }
            >
              <img src={Lock} alt=""></img>
              <h3>Only for Platinum Level</h3>
              <p>
                This will unlock once you’re a platinum level member. This will
                give you insight of trends across platform.
              </p>
            </div>
          </Grid>
        </>
      )}
    </div>
  );
};

export default Analytics;
