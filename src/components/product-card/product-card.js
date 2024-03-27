import React from "react";
import { Box, Avatar } from "@material-ui/core";
import "./product-card.scss";
import { addToFavourite, removeFavourite } from "../../apis/apiCalls";
import { useEffect } from "react";
import CollectionModel from "../collection-model/collection-model";
import { useHistory } from "react-router-dom";

const ProductCard = (props) => {
  const [like, setLike] = React.useState(false);
  const [showCollectionModel, setShowCollectionMode] = React.useState(false);
  const history = useHistory();

  const onFavClick = like ? removeFavourite : addToFavourite;

  useEffect(() => {
    if (props.isFavourite) {
      setLike(true);
    }
  }, []);

  const likeHandler = () => {
    onFavClick(props.sku)
      .then(() => {
        if (like) {
          if (props.shouldRemoveFavourite) {
            props.removeFavourite();
          }
        }
        setLike(!like);
      })
      .catch((err) => console.log(err));
  };

  // Toggle model handler
  const toggleModel = (boolean) => {
    setShowCollectionMode(boolean);
  };

  const heartOutlineColor = like ? "#FA0707" : "#000";
  const heartFillColor = like ? "#FA0707" : "none";
  const heartMarkColor = like ? "#fff" : "#000";

  const collectionIcon = (
    <svg
      onClick={() => toggleModel(true)}
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

  const heartIcon = (
    <svg
      onClick={likeHandler}
      width="22"
      height="20"
      viewBox="0 0 22 20"
      fill={heartFillColor}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.87187 9.59832C0.798865 6.24832 2.05287 2.41932 5.56987 1.28632C7.41987 0.689322 9.46187 1.04132 10.9999 2.19832C12.4549 1.07332 14.5719 0.693322 16.4199 1.28632C19.9369 2.41932 21.1989 6.24832 20.1269 9.59832C18.4569 14.9083 10.9999 18.9983 10.9999 18.9983C10.9999 18.9983 3.59787 14.9703 1.87187 9.59832Z"
        stroke={heartOutlineColor}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15 4.69995C16.07 5.04595 16.826 6.00095 16.917 7.12195"
        stroke={heartMarkColor}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );

  let artistPage = () => {
    history.push("/artist/" + props.artist);
  };

  return (
    <>
      {showCollectionModel && (
        <CollectionModel
          product_pk={props.sku}
          show={showCollectionModel}
          toggleModel={(bool) => toggleModel(bool)}
        />
      )}
      <Box gap={1} className="prod-card">
        <img
          onClick={props.onClick}
          className="prod-card--image"
          src={props.designImage}
          alt="img"
          id={props.id}
        />
        <Box style={{ display: "flex", alignItems: "center" }} gridGap={10}>
          {props.general && (
            <>
              {!props.designerImage ? (
                <Avatar onClick={artistPage} />
              ) : (
                <img
                  className="prod-card--avatar"
                  src={props.designerImage}
                  alt="img"
                  onClick={artistPage}
                />
              )}
              <p
                className="x-bold prod-card--designer-name"
                style={{ marginRight: "auto" }}
                onClick={artistPage}
              >
                {props.designerName}
              </p>
            </>
          )}
          <Box
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, auto)",
              gap: 10,
              marginLeft: "auto",
            }}
          >
            {props.hideCollection}
            {collectionIcon}
            {heartIcon}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProductCard;
