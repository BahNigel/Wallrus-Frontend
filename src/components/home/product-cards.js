import React, { useState } from "react";
import "./product-cards.scss";
import { Grid, Card, CardMedia, Avatar } from "@material-ui/core";
import Tag from "../../images/tag.svg";
import design1 from "../../images/design1.svg";
import { useHistory } from "react-router-dom";
import CollectionModel from "../collection-model/collection-model";
const CollectionIcon = (props) => {
  return (
    <svg
      width={props.width}
      height={props.height}
      className={props.className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M21.419 15.732C21.419 19.31 19.31 21.419 15.732 21.419H7.95C4.363 21.419 2.25 19.31 2.25 15.732V7.932C2.25 4.359 3.564 2.25 7.143 2.25H9.143C9.861 2.251 10.537 2.588 10.967 3.163L11.88 4.377C12.312 4.951 12.988 5.289 13.706 5.29H16.536C20.123 5.29 21.447 7.116 21.447 10.767L21.419 15.732Z"
        stroke="#1B1918"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8.48096 13.4629H15.481"
        stroke="#1B1918"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11.8486 10.0952L11.8486 17.0952"
        stroke="#1B1918"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

const HeartIcon = (props) => {
  return (
    <svg
      width={props.width}
      className={props.className}
      height={props.height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Iconly/Light/Heart">
        <g id="Heart">
          <path
            id="Stroke 1"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M2.87187 11.5983C1.79887 8.24832 3.05287 4.41932 6.56987 3.28632C8.41987 2.68932 10.4619 3.04132 11.9999 4.19832C13.4549 3.07332 15.5719 2.69332 17.4199 3.28632C20.9369 4.41932 22.1989 8.24832 21.1269 11.5983C19.4569 16.9083 11.9999 20.9983 11.9999 20.9983C11.9999 20.9983 4.59787 16.9703 2.87187 11.5983Z"
            stroke="#1B1918"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            id="Stroke 3"
            d="M16 6.69995C17.07 7.04595 17.826 8.00095 17.917 9.12195"
            stroke="#1B1918"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
      </g>
    </svg>
  );
};

const ProductCard = (props) => {
  const [liked, setLiked] = useState([null]);
  const [showCollectionModel, setShowCollectionMode] = React.useState(false);

  const toggleModel = (boolean) => {
    setShowCollectionMode(boolean);
  };

  const {
    key,
    id,
    onClick,
    image,
    userimg,
    artistname,
    height,
    width,
    artist,
  } = props;
  let designImg = image ? image : "";
  const history = useHistory();

  let artistPage = () => {
    history.push("/artist/" + artist);
  };

  return (
    <>
      {showCollectionModel && (
        <CollectionModel
          product_pk={props.id}
          show={showCollectionModel}
          toggleModel={(bool) => toggleModel(bool)}
        />
      )}
      <Grid item xs={6} sm={6} md={4} key={key}>
        <Card
          className="designRoot"
          style={
            height && width
              ? { maxHeight: height, maxWidth: width }
              : { maxWidth: "340px", maxHeight: "340px" }
          }
          onClick={props.onClick}
        >
          {props.tags != null && props.tags !== "" ? (
            <div className="tags-design">
              <img src={Tag} alt=""></img>
              {props.tags}
            </div>
          ) : null}
          <CardMedia className="card-media">
            {/* <div className=""> */}
            <div className="design-img-container">
              {designImg ? (
                <img
                  src={`${process.env.REACT_APP_ROOT_URL}${designImg}`}
                  alt="design"
                  className="design-img-shop"
                  id={id}
                  omC
                />
              ) : (
                <img src={design1} alt="alternate Design" />
              )}
            </div>
            {/* </div> */}
          </CardMedia>
        </Card>
        {props.generaldata === true ? (
          <div className="design-artist-details">
            <div className="design-artist-name-profilepic" onClick={artistPage}>
              <div className="design-artist-photo-container">
                {userimg ? (
                  <img
                    src={`${process.env.REACT_APP_ROOT_URL}${userimg}`}
                    alt="design-artist"
                    className="design-artist-photo"
                    style={{ borderRadius: "50%" }}
                  />
                ) : (
                  <span></span>
                )}
              </div>
              <div className="design-artist-name-container">
                <span className="design-artist-name">{artistname}</span>
              </div>
            </div>
            <div className="design-utilities">
              {props.fileIcon === false ? null : (
                <div
                  style={{
                    position: "absolute",
                    right: "28px",
                    cursor: "pointer",
                  }}
                  onClick={() => setShowCollectionMode(true)}
                >
                  <CollectionIcon
                    width={19.2}
                    height={19.2}
                    className="collection-icon"
                  />
                </div>
              )}
              {props.favIcon === false ? null : (
                <div
                  onClick={() =>
                    liked.includes(key)
                      ? setLiked(liked.filter((value) => value !== key))
                      : setLiked([...liked, key])
                  }
                >
                  <HeartIcon
                    width={19.2}
                    height={19.2}
                    className={
                      liked.includes(key) ? "heartImg-active" : "heartImg"
                    }
                  />
                </div>
              )}
            </div>
          </div>
        ) : null}
      </Grid>
    </>
  );
};

export default ProductCard;
