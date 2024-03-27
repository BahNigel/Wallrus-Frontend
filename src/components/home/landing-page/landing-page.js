import "./landing-page.scss";
import { Button } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import React, {
  useEffect,
  // useState,
  useContext,
} from "react";
import { AuthContext } from "../../../apis/AuthContext";
import Ecosystem from "../../../images/ecosystem.svg";
import Care from "../../../images/care.svg";
import Waste from "../../../images/waste.svg";
import Support from "../../../images/support.svg";
import StateOfArt from "../../../images/state-of-art.svg";
import Arrow from "../../../images/white-arrow2.svg";
import playIcon from "../../../images/landing-page/Play.svg";
import shop1 from "../../../images/landing-page/shop 1.png";
import shop2 from "../../../images/landing-page/shop 2.png";
import shop3 from "../../../images/landing-page/shop 3.png";
import shop4 from "../../../images/landing-page/shop 4.png";
import design1 from "../../../images/landing-page/design 1.png";
import design2 from "../../../images/landing-page/design 2.png";
import design3 from "../../../images/landing-page/design 3.png";
import design4 from "../../../images/landing-page/design 4.png";
import user1 from "../../../images/landing-page/user 1.png";
import user2 from "../../../images/landing-page/user 2.png";
import user3 from "../../../images/landing-page/user 3.png";
import user4 from "../../../images/landing-page/user 4.png";
import video from "../../../images/landing-page/video.png";
import DesignCard from "../../design-card/design-card";
import HomeBanner from "../../home-banner/home-banner";
import Header from "../../header/header";
import Footer from "../footer/footer";
import // featuredArtistsList,
// designList,
// productReview,
"../../../apis/apiCalls";
import { Link, useHistory } from "react-router-dom";

const LandingPage = (props) => {
  // const [artists, setArtists] = useState([]);
  // const [designs, setDesigns] = useState([]);
  // const [reviews, setReviews] = useState([]);
  // const [loading, setLoading] = useState(true);

  const history = useHistory();
  const { isAuth, isArtist } = useContext(AuthContext);

  useEffect(() => {
    isAuth && isArtist
      ? history.push("/dashboard")
      : isAuth && !isArtist
      ? history.push("/home")
      : history.push("/");
  }, [isAuth, isArtist, history]);

  // useEffect(() => {
  //   try {
  //     featuredArtistsList().then((res) => {
  //       setArtists(res);
  //     });

  //     designList().then((res) => {
  //       setDesigns(res);
  //     });

  //     productReview().then((res) => {
  //       setReviews(res);
  //     });

  //     setLoading(false);
  //   } catch (err) {
  //     setLoading(false);
  //     alert("Something went wrong!");
  //   }
  // }, []);

  const CompanyIdeas = [
    {
      image: Ecosystem,
      title: "Win - Win Ecosystem",
    },
    {
      image: Care,
      title: "Curated With Care",
    },
    {
      image: Waste,
      title: "Minimum Waste",
    },
    {
      image: Support,
      title: "Support Indian Design",
    },
    {
      image: StateOfArt,
      title: "State Of Art Manufacturing",
    },
  ];

  const featuredArtists = [
    {
      designImg: design1,
      userImg: user1,
      noOfDesigns: 200,
      userName: "Jacob Jones",
    },
    {
      designImg: design2,
      userImg: user2,
      noOfDesigns: 220,
      userName: "Floyd Miles",
    },
    {
      designImg: design3,
      userImg: user3,
      noOfDesigns: 230,
      userName: "Jane Cooper",
    },
    {
      designImg: design4,
      userImg: user4,
      noOfDesigns: 180,
      userName: "Theresa Webb",
    },
  ];

  const shopImgs = [shop1, shop2, shop3, shop4];

  const featuredArtistCards = featuredArtists.map((card, index) => {
    return (
      <DesignCard
        designImage={card.designImg}
        designerName={card.userName}
        designerImage={card.userImg}
        noOfDesigns={card.noOfDesigns}
      />
    );
  });

  return (
    <div className="landing-page-main-container">
      <Header />
      <HomeBanner />
      <div className="margin-40 landing-section-2">
        <h2>Decor for everyone. Designed by everyone.</h2>
        <p className="para lh-2">
          The Wallrus Company is a startup marketplace platform for on-demand
          decor applications, bringing together creative artists, interior
          designers and customers for collaboration and commerce. Interior
          Designers across the country can now access artworks and designs
          created by Graphic Designers and Artists, translated into conventional
          products such as Wallpapers, Curtains, Fabrics, and many more.
        </p>
        <Link to="/about-us">
          <Button
            variant="contained"
            className="btn-filled"
            style={{ marginTop: 20 }}
          >
            Learn More
            <img src={Arrow} style={{ marginLeft: 10 }} alt="arrow" />
          </Button>
        </Link>
      </div>

      <div className="landing-page-about-company-main-container">
        <div className="landing-page-about-company-container">
          <div className="landing-page-about-company-title">
            What can The Wallrus Company do for you?
          </div>
          <div className="landing-page-about-company-subtitle">
            The Wallrus Co. supports Interior Decorators & Designers in their
            endeavour to access customised applications for their projects
            without worrying about graphic design support or minimum order
            quantity. This digital first production platform opens up unlimited
            options for customised decor. The network of contributing Artists
            fuel new designs and ideas, creating an ecosystem of unending
            possibilities.
          </div>
          <div className="landing-page-about-company-ideas">
            <Grid container spacing={5} justify="center" alignItems="center">
              {CompanyIdeas.map((current) => (
                <Grid item lg={2} className="landing-page-about-company-idea">
                  <img src={current.image} alt="idea" />
                  <p>{current.title}</p>
                </Grid>
              ))}
            </Grid>
          </div>
          <div className="KnowMoreBtn-container">
            <Link to="/about-us">
              <Button variant="contained" className="btn-filled">
                Know More
                <img src={Arrow} alt="arrow" style={{ marginLeft: "10px" }} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="margin-40" style={{ textAlign: "center" }}>
        <h2>Categorise to shop</h2>
        <Grid container spacing={4}>
          {shopImgs.map((shop) => (
            <Grid item xs={6} md={3}>
              <img
                className="round-border-12"
                style={{ maxWidth: "100%" }}
                src={shop}
                alt="img"
              />
            </Grid>
          ))}
        </Grid>
        <Link to="/signup">
          <Button
            variant="contained"
            className="btn-filled"
            style={{ marginTop: 20 }}
          >
            Sign up to explore
            <img src={Arrow} style={{ marginLeft: 10 }} alt="arrow" />
          </Button>
        </Link>
      </div>
      <div className="margin-40 landing-section-5">
        <h2>Don't just believe our word</h2>
        <p className="lh-2">
          “It's one of my favourite platforms! Not only is the team behind
          Wallrus super supportive and talented, but the product itself is great
          to use. I can't imagine Wallrus ever going away, thank you for all you
          do!”
        </p>
        <div style={{ position: "relative", margin: "40px 0", width: "100%" }}>
          <img src={video} className="width-100 round-border-12" alt="img" />
          <img
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 100,
            }}
            src={playIcon}
            alt="icon"
          />
        </div>
      </div>
      {/* <div className="margin-40" style={{ textAlign: "center" }}>
        <h2>Featured Artists</h2>
        <div className="grid-cols-4 margin-y-40">{featuredArtistCards}</div>
      </div> */}
      <div className="margin-40 round-border-12 landing-section-7">
        <h2>Sell your design</h2>
        <p className="para lh-2 x-bold">
          Learn how Wallrus team fulfils your designing and ship them
        </p>
        <Link to="/about-us">
          <Button
            variant="contained"
            className="btn-filled"
            style={{ marginTop: 20 }}
          >
            Learn More
            <img src={Arrow} style={{ marginLeft: 10 }} alt="arrow" />
          </Button>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
