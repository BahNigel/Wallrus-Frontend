import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import MainNav from "../main-nav/main-nav";
import Footer from "../footer/footer";
import { Button } from "@material-ui/core";
import filterArrow from "../../../images/arrow-down.svg";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "./artistList.scss";
import { ArtistListStatus } from "../../../apis/apiCalls";
import CircularProgress from "@material-ui/core/CircularProgress";
import Artistitem from "./artistItem";
import axios from "axios";

const ArtistList = (props) => {
  const [count, setCount] = useState(4);
  const [sortCount, setSortCount] = useState(4);
  const [selectedFilter, setFilter] = useState("");
  const [artist, setArtist] = useState([]);
  const history = useHistory();
  const [loader, setLoader] = useState(false);
  const accessToken = localStorage.getItem("Access_Key");
  const refreshToken = localStorage.getItem("Refresh_Key");
  // const [slice, setSlice] = useState(count);
  const [type, setType] = useState("normal");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    count >= 4 ? setLoader(true) : setLoader(false);

    if (accessToken && refreshToken) {
      ArtistListStatus(accessToken, refreshToken, count)
        .then((artist_data_status) => {
          // const newArtistList = artist_data_status.filter(
          //   (value) => !value.status
          // );
          const newArtistList = artist_data_status;
          setArtist(newArtistList);
          setLoader(true);
          // console.log("list: ",newArtistList);
        })
        .catch((refreshed_data_status) => {
          setArtist(refreshed_data_status);
          setLoader(true);
        });
    }
  }, [count]);

  // console.log("slice: ", slice, " artistLength: ", artist.length);

  const arrowClosed = (
    <img
      src={filterArrow}
      alt="arrow-closed"
      className="shop-filter-arrow-closed"
    />
  );

  const arrowOpen = (
    <img
      src={filterArrow}
      alt="arrow-open"
      className="shop-filter-arrow-open"
    />
  );

  const sortOptions = ["Most followed", "Recommended", "New artists"];

  const handleFilters = (filter) => {
    const temp = ["most-followed", "recommended", "new"];
    setFilter(temp[sortOptions.indexOf(filter)]);
  };

  const handleArtistClick = (artist) => {
    history.push(`/artist/${artist}`);
  };

  // const sliceHandler = () => {
  //   setSlice((prev) => prev + count);
  // };

  const removeArtist = (id) => {
    console.log("clicked");
    const list = [...artist];
    const newList = list.filter((artist) => artist.Unique_id !== id);
    setArtist(newList);
  };

  useEffect(() => {
    (async () => {
      if (selectedFilter?.value) {
        try {
          const res = await axios.get(
            `${process.env.REACT_APP_ROOT_URL}/api/artist-list-status/?sort-by=${selectedFilter?.value}&page-size=${sortCount}&page=1`,
            {
              headers: {
                Authorization: `Bearer ${window.localStorage.getItem(
                  "Access_Key"
                )}`,
              },
            }
          );
          // console.log(res?.data)
          setArtist(res?.data);
          setType("sort");
          setCount(4);
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [selectedFilter, sortCount]);

  useEffect(() => {
    if (type === "normal") {
      if (count === 4) {
        return setVisible(true);
      }
      console.log("artist : ", artist.length);
      if (count >= artist.length) {
        return setVisible(false);
      }
    }
    if (type === "sort") {
      if (sortCount === 4) {
        return setVisible(true);
      }
      if (sortCount >= artist.length) {
        return setVisible(false);
      }
    }
  }, [count, sortCount]);

  return (
    <div className="artist">
      <MainNav />
      {!loader ? (
        <div
          style={{ display: "flex", width: "100%", justifyContent: "center" }}
        >
          <CircularProgress size={80} className="application-loader" />
        </div>
      ) : (
        <div>
          <div className="artist-list-head">
            <div>
              <h2 style={{ fontSize: "28px", fontWeight: "600" }}>Artist</h2>
            </div>
            <div className="filter-container-artistList">
              <Dropdown
                arrowClosed={arrowClosed}
                arrowOpen={arrowOpen}
                options={sortOptions}
                onChange={handleFilters}
                placeholder="Sort by"
                value={selectedFilter}
                className="filter-holder"
              />
            </div>
          </div>

          <div className="artist-list-wrap">
            {artist.map((item, index) => (
              <Artistitem item={item} handleArtistClick={handleArtistClick} />
            ))}
          </div>
          {visible && (
            <div className="load-more-artists-container">
              <Button
                variant="outlined"
                className="load-more-artists-btn"
                onClick={() => {
                  type === "normal"
                    ? setCount(count + 4)
                    : type === "sort" && setSortCount(sortCount + 4);
                }}
              >
                Load more artists
              </Button>
            </div>
          )}
          <Footer />
        </div>
      )}
    </div>
  );
};

export default ArtistList;
