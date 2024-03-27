import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid } from "@material-ui/core";
import Footer from "../../../../footer/footer";
import MainNav from "../../../../main-nav/main-nav";
import "./collection.scss";
import userimg from "../../../../../../images/model.svg";
import design1 from "../../../../../../images/design1.svg";
import design2 from "../../../../../../images/design2.svg";
import design3 from "../../../../../../images/design3.svg";
import design4 from "../../../../../../images/design4.svg";
import Popper from "@material-ui/core/Popper";
import DotMenu from "../../../../../../images/dot-menu.svg";
import ProductCard from "../../../../product-cards";
import CollectionModel from "../../../../../collection-model/collection-model";
import {
  deleteCollection,
  getDecoratorCollection,
} from "../../../../../../apis/apiCalls";

import { useHistory, useParams } from "react-router";

const useStyles = makeStyles((theme) => ({
  paper: {
    borderRadius: "12px",
    marginRight: "50px",
    marginTop: "10px",
    backgroundColor: theme.palette.background.paper,
    boxShadow:
      " 0px 0px 2px rgba(147, 156, 163, 0.36), 0px 8px 12px rgba(147, 156, 163, 0.12)",
  },
}));

const Collection = (props) => {
  const [showCollectionModel, setShowCollectionMode] = useState(false);
  const [modelState, setModelState] = useState(true); // True means edit & false means delete
  const { id } = useParams();
  const [collection, setcollections] = useState([]);
  const [mobile, setMobile] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();
  const classes = useStyles();
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  useEffect(() => {
    if (window.innerWidth < 768) {
      setMobile(true);
    } else {
      setMobile(false);
    }

    window.addEventListener("resize", () => {
      if (window.innerWidth < 768) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    });

    return () => {
      window.removeEventListener("resize", () => {
        if (window.innerWidth < 768) {
          setMobile(true);
        } else {
          setMobile(false);
        }
      });
    };
  }, [mobile]);

  const deleteCollectionHandler = (e) => {
    toggleModel(true);
    setModelState(false);
    if (mobile) setAnchorEl(anchorEl ? null : e.currentTarget);
  };

  const editCollectionHandler = (e) => {
    toggleModel(true);
    setModelState(true);
    if (mobile) setAnchorEl(anchorEl ? null : e.currentTarget);
  };

  // const collection = [
  //   {
  //     title: "Flower Print",
  //     designs: "23 Designs",
  //     artist: "5 Artists",
  //     description: "This is my fav collection",
  //     cards: [
  //       {
  //         designName: "Art Decon1",
  //         applications: "Wallpaper",
  //         name: "Jassie Mario",
  //         image: design1,
  //         tags: "Bedroom",
  //       },
  //       {
  //         designName: "Art Decon2",
  //         applications: "Curtains",
  //         name: "Ronald Richards",
  //         image: design2,
  //         tags: "Kitchen",
  //       },
  //       {
  //         designName: "Art Decon3",
  //         applications: "Table cloth",
  //         name: "Leslie Alexander",
  //         image: design3,
  //         tags: "Dining Hall",
  //       },
  //       {
  //         designName: "Art Decon4",
  //         applications: "Curtain blinds",
  //         name: "Savannah Nguyen",
  //         image: design4,
  //         tags: "Room 1",
  //       },
  //       {
  //         designName: "Art Decon2",
  //         applications: "Curtains",
  //         name: "Ronald Richards",
  //         image: design2,
  //         tags: "Room 2",
  //       },
  //       {
  //         designName: "Art Decon3",
  //         applications: "Table cloth",
  //         name: "Leslie Alexander",
  //         image: design3,
  //         tags: "Room 3",
  //       },

  //       {
  //         designName: "Art Decon1",
  //         applications: "Wallpaper",
  //         name: "Jassie Mario",
  //         image: design1,
  //         tags: "Kids Room",
  //       },
  //       {
  //         designName: "Art Decon4",
  //         applications: "Curtain blinds",
  //         name: "Savannah Nguyen",
  //         image: design4,
  //         tags: "",
  //       },
  //     ],
  //   },
  // ];

  useEffect(() => {
    getDecoratorCollection().then((res) => {
      setcollections(res.filter((e) => e.pk === Number(id)));
      console.log(res.filter((e) => e.pk === Number(id)));
    });
  }, []);

  // Toggle model handler
  const toggleModel = (boolean) => {
    setShowCollectionMode(boolean);
  };

  const viewProduct = (e) => {
    history.push(`/shop/${e}`);
  };

  return (
    <div>
      {showCollectionModel && (
        <CollectionModel
          setEdit={modelState}
          setDelete={!modelState}
          show={showCollectionModel}
          collection_pk={id}
          toggleModel={(bool) => toggleModel(bool)}
        />
      )}
      <MainNav />
      {collection.map((item, id) => {
        return (
          <div className="collection-container">
            <div className="collection-header">
              <div className="collection-left-content">
                <p className="collection-title">{item.name}</p>
                <p className="collection-subtitle">
                  {item.number_of_designs} Designs . {item.number_of_artists}{" "}
                  Artists
                </p>
                <p className="collection-description">{item.description}</p>
              </div>
              <div className="collection-right-content">
                {mobile ? (
                  <>
                    <img
                      className="dot-menu-icon"
                      style={{
                        cursor: "pointer",
                      }}
                      aria-describedby={id}
                      src={DotMenu}
                      alt="dot-menu"
                      onClick={handleMenu}
                    />
                    <Popper
                      id={id}
                      open={open}
                      anchorEl={anchorEl}
                      style={{ zIndex: "4" }}
                    >
                      <div className={classes.paper}>
                        <div
                          style={{
                            cursor: "pointer",
                            padding: "14px 30px",
                            borderBottom: "1px solid #eee",
                          }}
                          onClick={editCollectionHandler}
                        >
                          Edit collection
                        </div>
                        <div
                          style={{ cursor: "pointer", padding: "14px 30px" }}
                          onClick={deleteCollectionHandler}
                        >
                          Delete collection
                        </div>
                      </div>
                    </Popper>
                  </>
                ) : (
                  <>
                    <Button
                      className=""
                      variant="outlined"
                      onClick={editCollectionHandler}
                    >
                      Edit collection
                    </Button>
                    <Button
                      className=""
                      variant="outlined"
                      onClick={deleteCollectionHandler}
                    >
                      Delete collection
                    </Button>
                  </>
                )}
              </div>
            </div>
            <Grid
              container
              className="collection-card-container"
              direction="row"
              spacing={5}
            >
              {item.products.map((curr, index) => {
                return (
                  <ProductCard
                    image={curr.image}
                    sku={curr.sku}
                    id={curr.slug}
                    key={index}
                    tags={item?.tag[0]}
                    width="422px"
                    onClick={() => viewProduct(curr.slug)}
                    artist={curr.artist_unique_id}
                    userimg={curr.artist_picture}
                    generaldata
                    artistname={curr.artist_name}
                    fileIcon={false}
                    favIcon={false}
                  />
                );
              })}
            </Grid>
          </div>
        );
      })}
      <Footer />
    </div>
  );
};

export default Collection;
