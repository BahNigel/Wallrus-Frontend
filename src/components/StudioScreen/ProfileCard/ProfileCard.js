import progressbar from "../../../assets/images/progressbar.png";
import bronze from "../../../assets/images/bronze.svg";
import design from "../../../assets/images/image.png";
import silver from "../../../assets/images/silver.svg";
import gold from "../../../assets/images/gold.svg";
import platinum from "../../../assets/images/platinum.svg";
import rewardpoints from "../../../assets/images/rewardpoints.svg";
import "./profilecard.css";
import { Avatar, Box, LinearProgress } from "@material-ui/core";

const ProfileCard = (props) => {
  return (
    <div className="profileBox" style={{ position: "sticky", top: 30 }}>
      <div className="profileImg">
        <Avatar
          alt="p"
          src={props.img}
          style={{ width: "140px", height: "140px" }}
        />
        <span className="profileText">{props.username}</span>
        <span className="profileLevel">{props.level}</span>
        <div
          style={{
            height: "10px",
            width: "calc(100% - 3rem)",
            position: "relative",
            background: "rgb(255, 217, 147)",
            borderRadius: "5px",
            margin: "0.5rem 1.5rem",
            overflow: "hidden",
          }}
        >
          <span
            style={{
              width:
                (props.rewardPoints
                  ? props.rewardPoints > 1000000
                    ? 100
                    : props.rewardPoints > 500000
                    ? ((props.rewardPoints - 500000) * 33) / 500000 + 66
                    : props.rewardPoints > 200000
                    ? ((props.rewardPoints - 200000) * 33) / 300000 + 33
                    : (props.rewardPoints * 33) / 200000
                  : 2) + "%",
              display: "block",
              height: "100%",
              borderRadius: "5px",
              background: "rgb(255, 180, 41)",
              position: "relative",
              overflow: "hidden",
            }}
          ></span>
        </div>
        <div className="profileLevelSvg">
          <img src={bronze} alt="bz" />
          <img src={silver} alt="sl" />
          <img src={gold} alt="gd" />
          <img src={platinum} alt="pt" />
        </div>
        <div className="rewardPoints">
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={rewardpoints} alt="" />{" "}
            <span className="rewardPointText">Reward Points</span>
          </div>

          <div>
            <span className="rewardPointsValue">{props.rewardPoints}</span>
          </div>
        </div>

        <div>
          <span className="textt">MEMBER SINCE: APRIL 26, 2021</span>
        </div>
      </div>
    </div>
  );
};
export default ProfileCard;
