import { Avatar, Box } from "@material-ui/core";
import "./card.css";
import folderSvg from "../../../assets/images/Folder.svg";
import favouritesSvg from "../../../assets/images/favourites.svg";
const Card = (props) => {
  return (
    <div className="card">
      <div className="cardHeader">
        <div className="cardProfile">
          <Avatar src={props.img} style={{ width: "40px", height: "40px" }} />
          <div className="cardProfileBox">
            <span className="name">{props.username}</span>
            <span className="uploadtime">
              {props.uploadTime ? props.uploadTime : "A few seconds ago"}
            </span>
          </div>
        </div>
        <div>
          <span className="headerText">{props.designName}</span>
        </div>
      </div>
      <div className="image">
        <img
          src={props.designImage}
          alt=""
          className="image"
          style={{ width: "664px", height: "318px", objectFit: "cover" }}
        />
      </div>
      {/* <div>
        <img src={folderSvg} alt="" style={{ padding: "0px 15px" }} />
        <img src={favouritesSvg} alt="" />
      </div> */}
    </div>
  );
};
export default Card;
