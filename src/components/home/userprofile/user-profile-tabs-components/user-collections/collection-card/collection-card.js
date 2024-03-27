import React from "react";
import "./collection-card.scss";

const CollectionCard = (props) => {
  const {
    headerImg,
    otherImg,
    collectionName,
    designs,
    artists,
    onClick,
    id,
  } = props;

  const index = [0, 1, 2];

  return (
    <div className="collection-card" onClick={() => onClick(id)}>
      <div className="collection-card--grid">
        {headerImg ? (
          <img
            className="collection-card--header-img"
            src={`${process.env.REACT_APP_ROOT_URL}${headerImg}`}
            alt="header-img"
          />
        ) : (
          <div style={{width: "100%", height: "100%", backgroundColor: "#efefef"}} />
        )}
        {index.map((i) => {
          return otherImg[i] ? (
            <img className="collection-card--other-img" src={`${process.env.REACT_APP_ROOT_URL}${otherImg[i].image}`} alt="other" />
          ) : (
            <div style={{width: "100%", height: "100%", backgroundColor: "#efefef"}} />
          );
        })}
      </div>
      <h3 className="collection-card--name">{collectionName}</h3>
      <p className="collection-card--general">{`${designs} Designs . ${artists} Artists`}</p>
    </div>
  );
};

export default CollectionCard;
