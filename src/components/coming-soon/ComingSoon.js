import comingSoonImage from "../../images/coming-soon.jpg";
import { Button } from "@material-ui/core";
import MainNav from "../home/main-nav/main-nav";

const ComingSoon = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <>
      <MainNav />
      <Button
        onClick={goBack}
        className="back-button-custom-design"
        variant="outlined"
      >
        Back
      </Button>
      <div
        style={{
          display: "grid",
          placeItems: "center",
          marginTop: "180px",
          textAlign: "center",
        }}
      >
        <div>
          <img
            src={comingSoonImage}
            style={{ width: "80px", height: "80px" }}
          />
          <p style={{ fontWeight: "600", fontSize: "40px", margin: 0 }}>
            Coming Soon
          </p>
        </div>
      </div>
    </>
  );
};

export default ComingSoon;
