import Footer from "../../footer/footer";
import MainNav from "../../main-nav/main-nav";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import "./product.scss";
import { Avatar, Grid, IconButton, makeStyles } from "@material-ui/core";
import Product1 from "../../../../images/product1.jpg";
import Product2 from "../../../../images/product2.jpg";
import Product3 from "../../../../images/product3.jpg";
import { useState, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import Close from "../../../../images/close.png";
import React, { useEffect } from "react";
import Fade from "@material-ui/core/Fade";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import collectionImg from "../../../../images/Addfile.svg";
import Rating from "../../../../images/rating.svg";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Arrow from "../../../../images/arrow-down.svg";
import BackArrow from "../../../../images/back-left-arrow.svg";
import Plus from "../../../../images/plus-btn.svg";
import Minus from "../../../../images/minus-btn.svg";
import Button from "@material-ui/core/Button";
import Pencil from "../../../../images/edit-profile-icon.svg";
import Model from "../../../../images/model.svg";
import PlusWhite from "../../../../images/plus-white.svg";
import ProductCard from "../../product-cards";
import Design from "../../../../images/design1.svg";
import { useContext } from "react";
import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import NativeSelect from "@mui/material/NativeSelect";
import InputBase from "@mui/material/InputBase";
import { AuthContext } from "../../../../apis/AuthContext";
import {
  otherColorways,
  similarDesigns,
  productDetails,
  addToFavourite,
  removeFavourite,
  followArtist,
  unfollowArtist,
  materialList,
  getDecoratorSnippet,
} from "../../../../apis/apiCalls";
import { otherApplications } from "../../../../apis/apiCalls";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import CollectionModel from "../../../collection-model/collection-model";
import axios from "axios";
import { getTouchRippleUtilityClass } from "@mui/material";
const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));

const useStyles = makeStyles((theme) => ({
  label: {
    color: "rgb(0, 0, 0)",
  },
  skeleton: {
    borderRadius: "12px 12px 0 0",
  },
}));

const InputTextField = withStyles({
  root: {
    "& input + fieldset": {
      borderWidth: 1,
      borderRadius: `2px`,
    },
    "& input:focus + fieldset": {
      borderColor: "black !important",
    },
    "& label.Mui-focused": {
      color: "black",
    },
  },
})(TextField);

const Product = (props) => {
  const classes = useStyles();
  const mainRef = useRef(null);
  const heightRef = useRef(null);
  const widthRef = useRef(null);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [state, setState] = useState({
    open: false,
    Transition: Fade,
  });
  const [productStatus, setProductStatus] = useState({
    simDesign: false,
    otherApp: false,
    otherColor: false,
    productDet: false,
  });
  // const [loader , setLoader] = useState(true);
  const [simDesign, setSimDesign] = useState([]);
  const [otherApp, setOtherApp] = useState([]);
  const [otherColor, setOtherColor] = useState([]);
  const [productDet, setProductDet] = useState({
    application: "",
    artist: "",
    colorway: "",
    design_name: "",
    number_of_ratings: 0,
    productimages_set: [],
    ratings: 0,
    reviews_set: [],
  });
  const [loader, setLoader] = useState(true);
  const history = useHistory();
  const { id } = useParams();

  const [selectedImage, setSelectedImage] = useState("");
  const [materialTypes, setMaterialTypes] = useState([]);
  const [like, setLike] = useState(false);
  const [artistDetail, setArtistDetail] = useState({});
  const [isFollowed, setIsFollowed] = useState(false);
  const [review, setReview] = useState("");
  const [input, setInput] = useState(false);
  const [viewMore, setViewMore] = useState(false);
  const [rupdate, setRUpdate] = useState(false);
  const [cost, setCost] = useState(0);
  const [viewCount, setViewCount] = useState(2);
  const [isFirm, setIsFirm] = useState(false);
  const [commissionPercent, setCommissionPercent] = useState(0);

  const { setCart } = useContext(AuthContext);
  const onFavClick = like ? removeFavourite : addToFavourite;

  const likeHandler = () => {
    onFavClick(productDet.sku)
      .then(() => {
        setLike((like) => !like);
      })
      .catch((err) => {
        // alert("Couldn't add to favourite");
        setState({ ...state, open: true });
        setMessage("Couldn't add to favourite");
        setErrorMessage("warning");
      });
  };

  const heartOutlineColor = like ? "#FA0707" : "#000";
  const heartFillColor = like ? "#FA0707" : "none";
  const heartMarkColor = like ? "#fff" : "#000";
  const iconRating = () => {
    return (
      <svg
        width="18"
        height="16"
        viewBox="0 0 18 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M9.92021 1.48092L11.4431 4.52321C11.5923 4.82188 11.8804 5.02898 12.2145 5.0769L15.6211 5.56726C16.4628 5.68878 16.7977 6.70887 16.1886 7.29337L13.7252 9.66045C13.4831 9.89322 13.3729 10.2278 13.4301 10.5564L14.0115 13.8983C14.1547 14.7249 13.2748 15.3557 12.5225 14.9646L9.47768 13.3857C9.17918 13.2308 8.82168 13.2308 8.52232 13.3857L5.4775 14.9646C4.72519 15.3557 3.84533 14.7249 3.98937 13.8983L4.56987 10.5564C4.62714 10.2278 4.51694 9.89322 4.27485 9.66045L1.8114 7.29337C1.20226 6.70887 1.5372 5.68878 2.37889 5.56726L5.78554 5.0769C6.11961 5.02898 6.40856 4.82188 6.55781 4.52321L8.07979 1.48092C8.45638 0.728691 9.54362 0.728691 9.92021 1.48092Z"
          fill="#F4B740"
          stroke="#F4B740"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    );
  };
  const handleClick = (Transition) => {
    setState({
      open: true,
      Transition,
    });
  };

  const handleClickn = (slug) => {
    // alert(slug);
    history.push(`/shop/${slug}`);
    location.reload();
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setState({
      ...state,
      open: false,
    });
  };
  function SlideTransition(props) {
    return <Slide {...props} direction="down" />;
  }

  useEffect(() => {
    getDecoratorSnippet().then((res) => {
      setCommissionPercent(res?.comission_percent);
    });
    setIsFirm(
      window.localStorage.getItem("is_firm_user") == "true" ? true : false
    );
    mainRef.current.scrollIntoView();
    // setProductStatus({
    //   ...productStatus,
    //   simDesign: false,
    //   otherApp: false,
    //   otherColor: false,
    //   productDet: false,
    // });

    similarDesigns(id).then((similarDesignList) => {
      setSimDesign(similarDesignList.data);
      setProductStatus({ ...productStatus, simDesign: true });
    });

    otherApplications(id).then((otherApplicationsList) => {
      setOtherApp(otherApplicationsList.data);
      setProductStatus({ ...productStatus, otherApp: true });
    });

    otherColorways(id).then((otherColorwaysList) => {
      setOtherColor(otherColorwaysList.data);
      setProductStatus({ ...productStatus, otherColor: true });
    });

    productDetails(id).then((productDetailsList) => {
      setProductDet(productDetailsList);
      materialList(productDetailsList?.application_slug).then((list) => {
        setMaterialTypes(list);
        setMaterialType(list[0]?.name);
      });
      setSelectedImage(
        productDetailsList?.productimages_set?.length !== 0
          ? productDetailsList?.productimages_set[0]?.images
          : ""
      );
      setProductStatus({ ...productStatus, productDet: true });
      setLoader(false);
      // Like handling functionality
      if (productDetailsList?.is_favourite) {
        setLike(true);
      }

      axios
        .get(
          `${process.env.REACT_APP_ROOT_URL}/api/artist-details/${productDetailsList.artist_unique_id}`,
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem(
                "Access_Key"
              )}`,
            },
          }
        )
        .then((res) => {
          axios
            .get(
              `${process.env.REACT_APP_ROOT_URL}/api/artist-design-list/${productDetailsList.artist_unique_id}`,
              {
                headers: {
                  Authorization: `Bearer ${window.localStorage.getItem(
                    "Access_Key"
                  )}`,
                },
              }
            )
            .then((resd) => {
              setArtistDetail({
                ...res.data,
                design_images: resd.data,
                artist_unique_id: productDetailsList.artist_unique_id,
              });
              setIsFollowed(res.data.is_followed);
            })
            .catch((err) => {
              // alert("Couldn't fetch Artist Design List");
              setState({ ...state, open: true });
              setMessage("Couldn't fetch Artist Design List");
              setErrorMessage("warning");
            });
        })
        .catch((err) => console.log("Could not upload your design", err));
    });
  }, [review]);
  // useEffect(() => {
  //   axios
  //     .get(
  //       `${process.env.REACT_APP_ROOT_URL}/api/other-applications/wallpaper`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${window.localStorage.getItem(
  //             "Access_Key"
  //           )}`,
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       setOtherApp(res.data);
  //       console.log("sffsdfsdfsdfsdf");  console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);
  // useEffect(() => {
  //   axios
  //     .get(`${process.env.REACT_APP_ROOT_URL}/product-detail/${slug}`, {
  //       headers: {
  //         Authorization: `Bearer ${window.localStorage.getItem("Access_Key")}`,
  //       },
  //     })
  //     .then((res) => {
  //       setClientCart(res.data);
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  const viewProduct = (e) => {
    // console.log(e.target.slug);
    history.push(`/shop/${e}`);
  };
  const sendReview = () => {
    if (review !== "" && rating !== 0) {
      var formdata = new FormData();
      formdata.append("sku", productDet.sku);
      formdata.append("rating", rating);
      formdata.append("review", review);

      axios
        .post(
          `${process.env.REACT_APP_ROOT_URL}/api/product-review/`,
          formdata,
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem(
                "Access_Key"
              )}`,
            },
          }
        )
        .then((res) => {
          // setUserAddress(res.data);
          setRUpdate(!rupdate);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const arrowClosed = (
    <img src={Arrow} alt="arrow-closed" className="arrow-closed" />
  );
  const arrowOpen = <img src={Arrow} alt="arrow-open" className="arrow-open" />;

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const [loadedMsg, setLoadedMsg] = useState(false);
  const unit = ["in.", "mm"];
  const [rating, setRating] = useState(0);
  const moreByArtist = [
    {
      image: Design,
    },
    {
      image: Design,
    },
    {
      image: Design,
    },
    {
      image: Design,
    },
    {
      image: Design,
    },
    {
      image: Design,
    },
    {
      image: Design,
    },
    {
      image: Design,
    },
  ];

  const defaultUnit = unit[0];
  const [currentUnit, setCurrentUnit] = useState(defaultUnit);

  const HeartIcon = (
    <svg
      onClick={likeHandler}
      width="22"
      height="20"
      viewBox="0 0 22 20"
      fill={heartFillColor}
      xmlns="http://www.w3.org/2000/svg"
      style={{
        display: "flex",
        alignItems: "center",
        marginLeft: 10,
        cursor: "pointer",
      }}
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

  const [checked, setChecked] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [materialType, setMaterialType] = useState("");
  const [showCollectionModel, setShowCollectionMode] = useState(false);
  const [clientName, setClientName] = useState("");

  const toggleModel = (boolean) => {
    setShowCollectionMode(boolean);
  };

  const handleRequestForm = () => {
    history.push("/requestForm");
  };

  const changeImage = (e) => {
    setSelectedImage(
      productDet.productimages_set.length !== 0
        ? productDet.productimages_set[Number(e.target.id)].images
        : ""
    );
  };

  const viewProductImage = () => {
    setChecked((prev) => !prev);
  };

  const handleMaterialType = (materialType) => {
    setMaterialType(materialType.value);
    let h = heightRef.current.firstElementChild.firstElementChild.value;
    let w = widthRef.current.firstElementChild.firstElementChild.value;
    if (h !== 0 && w !== 0) {
      let width;
      let height;
      if (unit.value === "mm") {
        width = w * 0.03937;
        height = h * 0.03937;
      } else {
        width = w;
        height = h;
      }

      changePrice(width, height, materialType.value);
    }
  };

  function currencyFormat(num) {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  const changePrice = (width, height, materialtype = materialType) => {
    if (productDet?.pricing_category === "category-1") {
      const sqft = (width * height) / 144;
      let cost =
        materialTypes.filter((e) => e.name == materialtype)[0].unit_price *
        sqft;
      cost =
        cost +
        cost * (productDet?.royalty_percent / 100) +
        cost * (commissionPercent / 100);
      setCost(cost);
    }
    if (productDet?.pricing_category === "category-2") {
      const panel = width / 22;
      const panelHeight = (height + 12) / 39;
      const materialReq = panelHeight * panel;
      let cost =
        materialReq *
        materialTypes.filter((e) => e.name == materialtype)[0].unit_price;
      cost =
        cost +
        cost * (productDet?.royalty_percent / 100) +
        cost * (commissionPercent / 100);
      setCost(cost);
    }
    if (productDet?.pricing_category === "category-3") {
      let cost =
        width *
          materialTypes.filter((e) => e.name == materialtype)[0].unit_price_2 +
        height *
          materialTypes.filter((e) => e.name == materialtype)[0].unit_price_2 +
        [(width * height) / 144] *
          materialTypes.filter((e) => e.name == materialtype)[0].unit_price;
      cost =
        cost +
        cost * (productDet?.royalty_percent / 100) +
        cost * (commissionPercent / 100);
      setCost(cost);
    }
  };

  const handleWidth = (e) => {
    setWidth(e.target.value);

    let h = heightRef.current.firstElementChild.firstElementChild.value;
    if (h !== 0 && e.target.value !== 0) {
      let width;
      let height;
      if (currentUnit === "mm") {
        width = e.target.value * 0.03937;
        height = h * 0.03937;
      } else {
        width = e.target.value;
        height = h;
      }

      changePrice(width, height);
    }
  };
  const handleHeight = (e) => {
    setHeight(e.target.value);
    let w = widthRef.current.firstElementChild.firstElementChild.value;
    if (w !== 0 && e.target.value !== 0) {
      let width;
      let height;
      if (currentUnit === "mm") {
        width = w * 0.03937;
        height = e.target.value * 0.03937;
      } else {
        width = w;
        height = e.target.value;
      }
      changePrice(width, height);
    }
  };
  const handleUnit = (unit) => {
    setCurrentUnit(unit.value);
    heightRef.current.firstElementChild.firstElementChild.value = 0;
    widthRef.current.firstElementChild.firstElementChild.value = 0;
    setHeight(0);
    setWidth(0);
    let h = heightRef.current.firstElementChild.firstElementChild.value;
    let w = widthRef.current.firstElementChild.firstElementChild.value;
    if (h !== 0 && w !== 0) {
      let width;
      let height;
      if (unit.value === "mm") {
        width = w * 0.03937;
        height = h * 0.03937;
      } else {
        width = w;
        height = h;
      }

      changePrice(width, height);
    }
  };
  const addItem = () => {
    setQuantity(quantity + 1);
  };

  const reduceItem = () => {
    setQuantity(quantity - 1);
  };

  const customizeDesignFormHandler = (input) => {
    history.push(`/shop/${id}/customizedesign`);
  };

  const goBack = () => {
    history.push(`/shop`);
  };
  // const handleApi = (e) =>
  // {
  //     if(productStatus.simDesign && productStatus.otherColor && productStatus.otherApp)
  //     {
  //         return true;
  //     }
  //     else
  //     {
  //         return false;
  //     }
  // }

  const addToCart = () => {
    setLoadedMsg(true);
    if (width === 0 || height === 0) {
      setMessage("Enter Dimensions (Width and Height)");
      setErrorMessage("warning");
      handleClick(SlideTransition);
      setLoadedMsg(false);
      return;
    }
    let finalPrice = cost * quantity;
    let formdata = new FormData();
    formdata.append("product", productDet.sku);
    formdata.append("quantity", quantity.toString());
    formdata.append("width", width.toString());
    formdata.append("height", height.toString());
    formdata.append("unit", currentUnit);
    formdata.append(
      "material",
      materialTypes.filter((e) => e.name == materialType)[0].id
    );
    formdata.append("is_shared", "True");
    formdata.append("price", finalPrice.toString());
    if (isFirm) {
      formdata.append("client_name", clientName);
      axios
        .post(
          `${process.env.REACT_APP_ROOT_URL}/api/purchase-request/`,
          formdata,
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem(
                "Access_Key"
              )}`,
            },
          }
        )
        .then((res) => {
          setMessage("Requested order of the product");
          setErrorMessage("success");
          handleClick(SlideTransition);
          setLoadedMsg(false);
        })
        .catch((error) => {
          // alert("Something went wrong, please try signing up again");
          setMessage("Something went wrong, please try signing up again");
          setErrorMessage("error");
          handleClick(SlideTransition);
          // window.location.reload();
          setLoadedMsg(false);
        });
    } else {
      axios
        .post(`${process.env.REACT_APP_ROOT_URL}/api/add-to-cart`, formdata, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(
              "Access_Key"
            )}`,
          },
        })
        .then((res) => {
          setMessage("Added the Product to Cart");
          setErrorMessage("success");
          handleClick(SlideTransition);
          setLoadedMsg(false);
          localStorage.setItem("cartStatus", "not empty");
        })
        .catch((error) => {
          // alert("Something went wrong, please try signing up again");
          setMessage("Something went wrong, please try signing up again");
          setErrorMessage("error");
          handleClick(SlideTransition);
          // window.location.reload();
          setLoadedMsg(false);
        });
    }
  };

  const handleFollow = () => {
    let formData = new FormData();
    formData.append("user_unique_id", artistDetail.artist_unique_id);
    followArtist(formData)
      .then((data) => {
        setIsFollowed(true);
        setArtistDetail({
          ...artistDetail,
          followers_count: artistDetail.followers_count + 1,
        });
      })
      .catch((messed) => {
        // alert("Couldn't follow that artist!");
        setState({ ...state, open: true });
        setMessage("Couldn't follow that artist!");
        setErrorMessage("warning");
      });
  };

  const handleUnFollow = () => {
    let formData = new FormData();
    formData.append("user_unique_id", artistDetail.artist_unique_id);
    unfollowArtist(formData)
      .then((data) => {
        setIsFollowed(false);
        setArtistDetail({
          ...artistDetail,
          followers_count: artistDetail.followers_count - 1,
        });
      })
      .catch((messed) => {
        // alert("Couldn't unfollow that artist!");
        setState({ ...state, open: true });
        setMessage("Couldn't unfollow that artist!");
        setErrorMessage("warning");
      });
  };

  return (
    <>
      {showCollectionModel && (
        <CollectionModel
          product_pk={productDet.sku}
          show={showCollectionModel}
          toggleModel={(bool) => toggleModel(bool)}
        />
      )}
      <div ref={mainRef}>
        <MainNav />
      </div>
      <Snackbar
        anchorOrigin={{
          horizontal: "center",
          vertical: "top",
        }}
        TransitionComponent={state.Transition}
        open={state.open}
        autoHideDuration={2000}
        onClose={handleClose}
        key={state.Transition.name}
      >
        <Alert
          onClose={handleClose}
          severity={errorMessage}
          // sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>

      {
        // (productStatus.simDesign === false || productStatus.otherColor === false) && (productStatus.otherApp === false ||
        loader ? (
          <div className="product-loader-container">
            <div>
              <CircularProgress size={80} className="product-loader" />
            </div>
          </div>
        ) : (
          <div className="product-main-container">
            <div className="product-container">
              <Grid container xs={12}>
                <Grid item lg={7} xs={12} spacing={0}>
                  <Grid
                    container
                    className="product-image-container"
                    direction="row"
                    spacing={2}
                  >
                    <Grid item xs={2}>
                      <Grid direction="column" container>
                        {productDet?.productimages_set
                          ? productDet?.productimages_set.map(
                              (current, index) => (
                                <Grid item xs={3}>
                                  <img
                                    onClick={changeImage}
                                    id={index}
                                    src={`${process.env.REACT_APP_ROOT_URL}${current.images}`}
                                    alt="product"
                                    className="product-images"
                                    style={{ marginBottom: "10px" }}
                                  />
                                </Grid>
                              )
                            )
                          : null}
                      </Grid>
                    </Grid>
                    <Grid item xs={9} spacing={2}>
                      <FormControlLabel
                        control={
                          <img
                            checked={checked}
                            onClick={viewProductImage}
                            src={`${process.env.REACT_APP_ROOT_URL}${selectedImage}`}
                            alt="product"
                            className="selected-product-image"
                          />
                        }
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    spacing={1}
                    className="mobile-product-image-container"
                  >
                    <Grid item xs={12}>
                      <div className="mobile-back-arrow-container">
                        <img
                          src={BackArrow}
                          alt="back"
                          className="mobile-back-arrow"
                          onClick={goBack}
                        />
                      </div>

                      <section class="carousel" aria-label="Gallery">
                        <ol class="carousel__viewport">
                          {productDet?.productimages_set
                            ? productDet?.productimages_set.map(
                                (current, index) => (
                                  <li
                                    id={`carousel__slide-item${index}`}
                                    tabindex="0"
                                    class="carousel__slide"
                                  >
                                    <img
                                      id={index}
                                      src={`${process.env.REACT_APP_ROOT_URL}${current.images}`}
                                      alt="product"
                                      className="carousel-product-images"
                                    />
                                    <div class="carousel__snapper"></div>
                                  </li>
                                )
                              )
                            : null}
                        </ol>
                      </section>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item lg={5} xs={12}>
                  <div className="product-details-container">
                    <div className="product-name-container">
                      <div className="product-name">
                        <p>
                          {productDet.design_name} &#xb7; {productDet.colorway}{" "}
                          &#xb7; {productDet.application}
                        </p>
                      </div>
                      <div className="product-collection-like">
                        <img
                          src={collectionImg}
                          alt="collection"
                          className="collection"
                          onClick={() => setShowCollectionMode(true)}
                        />
                        <div>{HeartIcon}</div>
                      </div>
                    </div>
                    <div className="artist-name">by {productDet.artist}</div>
                    <div className="product-rating-container">
                      <img src={Rating} alt="rating" />{" "}
                      <span className="product-rating">
                        {productDet.ratings} ({productDet.reviews_set.length})
                      </span>
                    </div>
                    <div className="material-type-container">
                      <p>MATERIAL TYPE</p>
                      <Dropdown
                        arrowClosed={arrowClosed}
                        arrowOpen={arrowOpen}
                        options={materialTypes.map((e) => e.name)}
                        value={materialTypes[0]?.name}
                        onChange={handleMaterialType}
                        placeholder="Select"
                      />
                    </div>
                    <Grid
                      container
                      spacing={1}
                      className="material-dimensions-container"
                    >
                      <Grid item xs={6} md={5} className="material-width">
                        <p>WIDTH</p>
                        <InputTextField
                          ref={widthRef}
                          defaultValue={width}
                          onChange={handleWidth}
                          variant="outlined"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6} md={5} className="material-height">
                        <p>HEIGHT</p>
                        <InputTextField
                          ref={heightRef}
                          defaultValue={height}
                          onChange={handleHeight}
                          variant="outlined"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} md={2} className="material-unit">
                        <p>UNIT</p>
                        <Dropdown
                          arrowClosed={arrowClosed}
                          arrowOpen={arrowOpen}
                          options={unit}
                          onChange={handleUnit}
                          value={defaultUnit}
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      spacing={5}
                      className="product-quantity-price-container"
                    >
                      <Grid
                        item
                        xs={12}
                        md={6}
                        className="material-quantity-container"
                      >
                        <p>QUANTITY</p>
                        <div className="material-quantity">
                          {quantity <= 1 ? (
                            <img src={Minus} alt="minus" className="add-item" />
                          ) : (
                            <img
                              src={Minus}
                              onClick={reduceItem}
                              alt="minus"
                              className="add-item"
                            />
                          )}
                          {quantity}
                          <img
                            src={Plus}
                            onClick={addItem}
                            alt="plus"
                            className="reduce-item"
                          />
                        </div>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={6}
                        className="material-price-container"
                      >
                        <p>PRICE</p>
                        <span className="material-price">
                          &#8377; {currencyFormat(cost * quantity)}
                          <span className="tax"> inclusive all taxes</span>
                        </span>
                      </Grid>
                    </Grid>
                    {isFirm && (
                      <InputTextField
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="about-you-input"
                        label="Client name"
                        variant="outlined"
                        fullWidth
                        InputLabelProps={{
                          classes: { root: classes.label },
                        }}
                      />
                    )}
                    <Button className="addToCartBtn" onClick={addToCart}>
                      {isFirm ? "Request Order" : "Add to cart"}
                    </Button>
                    <Button
                      variant="outlined"
                      className="custBtn"
                      onClick={customizeDesignFormHandler}
                    >
                      Customize this design
                    </Button>
                    <hr className="breakline" />
                    <div className="request-measurement">
                      <h4>Request Measurement</h4>
                      <p>
                        The Wallrus Company will send an agent to do on the
                        ground measurement. You will only able to purchase, once
                        the ground measurement is done.
                      </p>
                      <Button
                        onClick={handleRequestForm}
                        className="requestMeasurementBtn"
                      >
                        Fill form
                      </Button>
                    </div>
                    <hr className="breakline" />
                    <div className="reviews-ratings-container">
                      <div className="reviews-ratings">
                        <h6 className="reviews-ratings-heading">
                          Review & Ratings ({productDet.reviews_set.length})
                        </h6>
                        <Button
                          style={{
                            width: window.innerWidth > 568 ? "50%" : "auto",
                          }}
                          className="writeReviewBtn"
                          onClick={() => {
                            setInput(!input);
                          }}
                        >
                          <div>
                            <img
                              className="write-review-icon"
                              src={Pencil}
                              alt="pencil"
                            />{" "}
                            {window.innerWidth > 568
                              ? "Write a review"
                              : "Review"}
                          </div>
                        </Button>
                      </div>
                      <div className="write-review">
                        {input && (
                          <>
                            <FormControl
                              fullWidth
                              sx={{ m: 1, mb: 2 }}
                              variant="standard"
                            >
                              <InputLabel htmlFor="demo-customized-textbox">
                                Review
                              </InputLabel>
                              <BootstrapInput
                                id="demo-customized-textbox"
                                value={review}
                                onChange={(e) => {
                                  setReview(e.target.value);
                                }}
                              />
                            </FormControl>
                            <InputLabel id="demo-customized-select-label">
                              Rating
                            </InputLabel>
                            <div
                              style={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <FormControl
                                fullWidth
                                sx={{ m: 1 }}
                                variant="standard"
                              >
                                <Select
                                  fullWidth
                                  labelId="demo-customized-select-label"
                                  id="demo-customized-select"
                                  value={rating}
                                  onChange={(e) => {
                                    setRating(e.target.value);
                                  }}
                                  input={<BootstrapInput />}
                                >
                                  <MenuItem value=""></MenuItem>
                                  <MenuItem value={1}>
                                    <div>
                                      <img
                                        src={Rating}
                                        alt="rating"
                                        className="rating-icon"
                                      />{" "}
                                      1
                                    </div>
                                  </MenuItem>
                                  <MenuItem value={2}>
                                    <div>
                                      <img
                                        src={Rating}
                                        alt="rating"
                                        className="rating-icon"
                                      />{" "}
                                      2
                                    </div>
                                  </MenuItem>
                                  <MenuItem value={3}>
                                    <div>
                                      <img
                                        src={Rating}
                                        alt="rating"
                                        className="rating-icon"
                                      />{" "}
                                      3
                                    </div>
                                  </MenuItem>
                                  <MenuItem value={4}>
                                    <div>
                                      <img
                                        src={Rating}
                                        alt="rating"
                                        className="rating-icon"
                                      />{" "}
                                      4
                                    </div>
                                  </MenuItem>
                                  <MenuItem value={5}>
                                    <div>
                                      <img
                                        src={Rating}
                                        alt="rating"
                                        className="rating-icon"
                                      />{" "}
                                      5
                                    </div>
                                  </MenuItem>
                                </Select>
                              </FormControl>
                              {/* <iconRating /> */}

                              <Button
                                style={{ width: "50%", height: "50%" }}
                                onClick={() => {
                                  sendReview();
                                }}
                              >
                                submit
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                      {productDet.reviews_set.length === 0 ? (
                        <div>No reviews and ratings</div>
                      ) : (
                        <>
                          {productDet.reviews_set
                            .slice(0, viewCount)
                            .map((current) => (
                              <>
                                <div className="reviews-ratings-list">
                                  <div className="rating-date">
                                    <div className="rated-user">
                                      <Avatar
                                        src={`${process.env.REACT_APP_ROOT_URL}/${current.profile_picture}`}
                                        alt="Profile Pic"
                                      />
                                      <div className="ratings-name">
                                        <span className="rated-username">
                                          {current.name}
                                        </span>
                                        <span>
                                          <img
                                            src={Rating}
                                            alt="rating"
                                            className="rating-icon"
                                          />{" "}
                                          <span className="rating">
                                            {" "}
                                            {current.rating}
                                          </span>
                                        </span>
                                      </div>
                                    </div>
                                    <div className="rated-date">
                                      {current.date}
                                    </div>
                                  </div>
                                  <div className="review">{current.review}</div>
                                  <hr className="breakline" />
                                </div>
                              </>
                            ))}
                          {productDet.reviews_set.length <= viewCount ? (
                            <span
                              class="view-more-reviews"
                              onClick={() => {
                                setViewCount(2);
                                // productDet.reviews_set.length === viewCount && setViewMore(!viewMore);
                              }}
                            >
                              View less
                            </span>
                          ) : (
                            <span
                              class="view-more-reviews"
                              onClick={() => {
                                setViewCount(viewCount + 4);
                                // productDet.reviews_set.length === viewCount && setViewMore(!viewMore);
                              }}
                            >
                              View more
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>
            <div className="other-colorway-container">
              <h4>Other colorway</h4>
              {otherColor.length === 0 ? (
                <p>No other colorways to show</p>
              ) : (
                <Grid
                  container
                  spacing={2}
                  justifyContent="flex-end"
                  direction="row"
                  style={{ marginTop: "2.6%" }}
                >
                  {/* <> */}
                  {otherColor.map((current, index) => (
                    <ProductCard
                      key={index}
                      id={current.slug}
                      sku={current.sku}
                      image={current.productimage}
                      userimg={current.artist_image}
                      artist={current.artist_unique_id}
                      artistname={current.artist}
                      generaldata
                      onClick={() => handleClickn(current.slug)}
                    />
                  ))}
                  {/* </> */}
                </Grid>
              )}
            </div>
            <div className="other-applications-container">
              <h4>Other applications</h4>
              {otherApp.length === 0 ? (
                <p>No other applications to show</p>
              ) : (
                <Grid
                  container
                  spacing={2}
                  justifyContent="flex-end"
                  direction="row"
                  style={{ marginTop: "2.6%" }}
                >
                  {otherApp.map((current, index) => (
                    <ProductCard
                      key={index}
                      id={current.slug}
                      sku={current.sku}
                      image={current.productimage}
                      userimg={current.artist_image}
                      artistname={current.artist}
                      artist={current.artist_unique_id}
                      generaldata
                      onClick={() => handleClickn(current.slug)}
                    />
                  ))}
                </Grid>
              )}
            </div>
            <div className="more-artist-designs-container">
              <h4>More by {artistDetail.full_name}</h4>
              <Grid
                container
                spacing={2}
                justifyContent="flex-end"
                direction="row"
                style={{ marginTop: "2.6%" }}
              >
                {artistDetail.design_images &&
                  artistDetail.design_images.map((current, index) => (
                    <ProductCard
                      key={index}
                      id={current.slug}
                      sku={current.sku}
                      image={current.product_image}
                      userimg={artistDetail.profile_pic}
                      artist={current.artist_unique_id}
                      artistname={artistDetail.full_name}
                      generaldata
                      onClick={() => {
                        // handleClickn(current.slug)
                      }}
                    />
                  ))}
              </Grid>
            </div>
            <div className="artist-profile-info-container">
              <hr className="breakline breakline2" />
              <div className="artist-profile-pic-container">
                <img
                  className="artist-profile-pic"
                  src={
                    process.env.REACT_APP_ROOT_URL + artistDetail.profile_pic
                  }
                  alt="Artist"
                  style={{ borderRadius: "50%" }}
                />
              </div>
              <div className="artist-profile-name">
                {artistDetail.full_name}
              </div>
              <div className="artist-profile-info">
                {artistDetail.no_of_designs} designs |{" "}
                {artistDetail.followers_count} followers
              </div>
              {isFollowed ? (
                <Button
                  variant="outlined"
                  onClick={handleUnFollow}
                  className="followArtistBtn"
                >
                  Unfollow
                </Button>
              ) : (
                <Button className="followArtistBtn" onClick={handleFollow}>
                  <img
                    className="follow-artist-icon"
                    src={PlusWhite}
                    alt="follow"
                  />{" "}
                  Follow
                </Button>
              )}
            </div>

            {simDesign.length > 0 && (
              <div className="similar-designs-container">
                <h4>Similar designs</h4>
                <Grid
                  container
                  spacing={2}
                  justifyContent="flex-end"
                  direction="row"
                  style={{ marginTop: "2.6%" }}
                >
                  {simDesign.map((current, index) => (
                    <ProductCard
                      key={index}
                      id={current.slug}
                      sku={current.sku}
                      image={current.productimage}
                      userimg=""
                      artist={current.artist_unique_id}
                      artistname={current.artist}
                      generaldata
                      onClick={() => {
                        // console.log(current);
                        handleClickn(current.slug);
                      }}
                    />
                  ))}
                </Grid>
              </div>
            )}
            <Footer />
          </div>
        )
      }
    </>
  );
};

export default Product;
