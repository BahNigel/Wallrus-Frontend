import "./designs.scss";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import design1 from "../../images/design1.svg";
import design2 from "../../images/design2.svg";
import design3 from "../../images/design3.svg";
import design4 from "../../images/design4.svg";
import { Link } from "react-router-dom";
import HeartRed from "../../images/Heart-red.svg";
import List from "../../images/list.svg";
import dots from "../../images/3dots.svg";
import dotsdark from "../../images/3dotsdark.svg";
import CardView from "../../images/card-view.svg";
import Delete from "../../images/Delete.svg";
import DotMenu from "../../images/dot-menu.svg";
import MultiSelect from "react-multi-select-component";
import { getArtistDesignList } from "../../apis/apiCalls";
import { useEffect } from "react";
import Pagination from "../pagination/pagination";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Paper } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    maxWidth: 322,
    maxHeight: 322,
    backgroundColor: "inherit",
    border: "2px dashed #CDCBC9",
    borderRadius: "12px",
    boxShadow: "none",
    transition: "all 250ms ease-in-out",
    "&:hover": {
      backgroundColor: "#fff",
      border: "2px solid transparent",
      boxShadow: "0px 8px 12px 0px #939CA31F",
    },
  },
  designRoot: {
    maxWidth: 322,
    maxHeight: 322,
    borderRadius: "12px",
    boxShadow: "none",
    backgroundColor: "rgba(0,0,0,1) !important",
    position: "relative",
  },
  mobileDesignContainer: {
    display: "flex",
    justifyContent: "center",
  },
  mobileDesignRoot: {
    position: "relative",
    height: 320,
    width: 320,
    backgroundColor: "rgba(0,0,0,1) !important",
    color: "#fff",
    boxShadow: "none",
    borderRadius: "12px",
  },
  mobileUserDesignContainer: {
    display: "flex",
    position: "relative",
  },
  mobileUserDesign: {
    position: "absolute",
    left: "0%",
    height: 322,
    width: "auto",
  },
  DesignDescriptionContainer: {
    position: "relative",
    marginTop: "-24%",
    color: "#fff",
    padding: "0.1px",
  },
  MobileDesignDescriptionContainer: {
    position: "absolute",
    bottom: 0,
    left: "0",
    color: "#fff",
    width: "100%",
    paddingLeft: "10px",
  },
  DesignTitle: {
    marginLeft: "6%",
    fontSize: "14px",
  },
  MobileDesignTitle: {
    fontSize: "14px !important",
  },

  DesignDescription: {
    marginLeft: "6%",
    marginTop: "-4%",
    fontWeight: "500 !important",
    fontSize: "13px !important",
  },
  MobileDesignDescription: {
    fontWeight: "600 !important",
    fontSize: "13px !important",
    marginTop: "-4%",
  },

  Grid: {
    flexGrow: 1,
  },
  mobileDesignLikes: {
    position: "absolute",
    display: "flex",
    backgroundColor: "#fff",
    opacity: "0.9",
    borderRadius: "4px",
    padding: "4px 12px",
    right: "18px",
    top: "18px",
    zIndex: "1",
    alignItems: "center",
  },
  designLikes: {
    position: "absolute",
    display: "flex",
    backgroundColor: "#fff",
    opacity: "0.9",
    borderRadius: "4px",
    padding: "4px 6px",
    right: "18px",
    top: "18px",
    zIndex: "1",
    alignItems: "center",
  },
  mobileHeart: {
    height: "15px",
    width: "15px",
    marginRight: "5px",
  },
  Heart: {
    height: "17px",
    width: "17px",
  },
  mobileLikesCount: {
    margin: "0",
    fontWeight: "bold",
    color: "#000",
  },
  likesCount: {
    margin: "0 0 0 8px",
    fontWeight: "bold",
    color: "#000",
  },
});

const Designs = (props) => {
  const { mobile, designs, currentPage, setCurrentPage } = props;
  const classes = useStyles();
  const [design, setDesign] = useState(true);

  // const Dummy_designs = [
  //   {
  //     designName: "Art Decon1",
  //     applications: "Wallpaper",
  //     tagColor: "Green",
  //     revenue: "900",
  //     sales: "24",
  //     views: "424",
  //     likes: "16",
  //     image: design1,
  //   },
  //   {
  //     designName: "Art Decon2",
  //     applications: "Curtains",
  //     tagColor: "White",
  //     revenue: "1550",
  //     sales: "45",
  //     views: "1233",
  //     likes: "32",
  //     image: design2,
  //   },
  //   {
  //     designName: "Art Decon3",
  //     applications: "Table cloth",
  //     tagColor: "Black",
  //     revenue: "9000",
  //     sales: "70",
  //     views: "4240",
  //     likes: "90",
  //     image: design3,
  //   },
  //   {
  //     designName: "Art Decon4",
  //     applications: "Curtain blinds",
  //     tagColor: "Green",
  //     revenue: "5000",
  //     sales: "240",
  //     views: "3453",
  //     likes: "200",
  //     image: design4,
  //   },
  // ];

  const design_name_options = [
    { label: "Art Decor", value: "art decor" },
    { label: "Sunflower", value: "sunflower" },
    { label: "Happy Vibes", value: "happy vibes" },
    { label: "Ting Tang", value: "ting tang" },
    { label: "Rainbow", value: "rainbow" },
  ];

  const color_options = [
    { label: "Red", value: "Red" },
    { label: "Blue", value: "Blue" },
    { label: "Green", value: "Green" },
    { label: "Orange", value: "Orange" },
    { label: "White", value: "White" },
  ];
  const options = [{ label: "Dummy", value: "dummy" }];

  const [selectedDesign, setSelectedDesign] = useState([]);
  const [selectedColour, setSelectedColour] = useState([]);
  const [selected, setSelected] = useState([]);
  const [listView, setListView] = useState(false);
  const [isShown, setIsShown] = useState(-1);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => setOpenModal(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    handleOpen();
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 660,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  const PER_PAGE = 12;

  let pages = [];
  const length = designs?.length || 0;
  for (let i = 1; i <= Math.ceil(length / PER_PAGE); i++) {
    pages.push(i);
  }

  const deleteDesign = (sku) => {
    try {
      var formData = new FormData();
      formData.append("sku", sku);
      axios.delete(`${process.env.REACT_APP_ROOT_URL}/api/delete-design`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Access_Key")}`,
        },
        data: formData,
      });
      alert("Design deleted successfully");
      window.location.reload();
    } catch (err) {
      alert("Couldn't delete");
    }
  };

  return (
    <div>
      {/* {
            mobile? <div>Render</div> 
            
            : 
            
            <div className= "multi-select-container"> 
                    <MultiSelect
                        options={design_name_options}
                        value={selectedDesign}
                        onChange={setSelectedDesign}
                        placeholder="Design Names"
                        overrideStrings={
                            {"selectSomeItems" : "Design Name"}}
                        labelledBy="Design Name"
                        className = "multi-select multi-select-design"
                        hideSelectedOptions={true}
                    />  
                    <MultiSelect
                        options={color_options}
                        value={selectedColour}
                        onChange={setSelectedColour}
                        overrideStrings={
                            {"selectSomeItems" : "Colour"}}
                        labelledBy="Color"
                        className = "multi-select multi-select-colour"
                    />  
                    <MultiSelect
                        options={options}
                        value={selected}
                        onChange={setSelected}
                        overrideStrings={
                            {"selectSomeItems" : "Theme"}}
                        labelledBy="Theme"
                        className = "multi-select multi-select-theme"
                    />  
                    <MultiSelect
                        options={options}
                        value={selected}
                        onChange={setSelected}
                        overrideStrings={
                            {"selectSomeItems" : "Rooms"}}
                        labelledBy="Rooms"
                        className = "multi-select multi-select-rooms"
                    />  
                    <MultiSelect
                        options={options}
                        value={selected}
                        onChange={setSelected}
                        overrideStrings={
                            {"selectSomeItems" : "Products"}}
                        labelledBy="Products"
                        className = "multi-select multi-select-products"
                    />  
            </div>
        } */}

      {!mobile &&
        (!listView ? (
          <div className="design-view">
            <div
              className="view-elements"
              onClick={() => {
                setListView(true);
              }}
            >
              <img src={List} alt="list" className="view-icon" />
              <span className="view-title">List view</span>
            </div>
          </div>
        ) : (
          <div className="design-view">
            <div
              className="view-elements"
              onClick={() => {
                setListView(false);
              }}
            >
              <img src={CardView} alt="cards" className="view-icon" />
              <span className="view-title">Card view</span>
            </div>
          </div>
        ))}
      <Grid container spacing={3} className={classes.Grid} direction="row">
        {!design ? (
          <Card className={classes.root}>
            <CardContent className="designs-content">
              <div>
                <Fab color="primary" className="fab" aria-label="add">
                  <AddIcon className="add-icon" />
                </Fab>
                <h3>Upload your first design</h3>
              </div>
            </CardContent>
          </Card>
        ) : !listView ? (
          designs?.length !== undefined ? (
            designs?.map((current) => (
              <React.Fragment>
                <Modal
                  open={openModal}
                  onClose={handleCloseModal}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography
                      id="modal-modal-title"
                      className="boxtitle"
                      variant="h6"
                      component="h2"
                    >
                      Delete this design?
                    </Typography>
                    <Typography
                      id="modal-modal-description"
                      className="boxdesc"
                      sx={{ mt: 2 }}
                    >
                      This can’t be undone and it will be removed from your
                      profile. It will take 30 days incase anyone has selected a
                      product for production.
                    </Typography>
                    <div className="modal-btns">
                      <div onClick={handleCloseModal} className="btn1">
                        <span className="cancel">Cancel</span>
                      </div>
                      <div
                        className="btn2"
                        onClick={() => {
                          console.log(current);
                          // deleteDesign(current.sku);
                        }}
                      >
                        <span className="delete">Delete</span>
                      </div>
                    </div>
                  </Box>
                </Modal>
                <Grid
                  item
                  xs
                  className={mobile ? classes.mobileDesignContainer : ""}
                >
                  <Card
                    className={`card-design ${
                      mobile ? classes.mobileDesignRoot : classes.designRoot
                    }`}
                  >
                    <CardMedia>
                      <div
                        className={
                          mobile
                            ? classes.mobileDesignLikes
                            : classes.designLikes
                        }
                      >
                        <img
                          src={HeartRed}
                          alt="heart"
                          className={
                            mobile ? classes.mobileHeart : classes.Heart
                          }
                        />
                        <p
                          className={
                            mobile
                              ? classes.mobileLikesCount
                              : classes.likesCount
                          }
                        >
                          {current.favourite_count}
                        </p>
                      </div>
                      <div
                        className={`card-image ${
                          mobile ? classes.mobileUserDesignContainer : ""
                        }`}
                      >
                        <div>
                          <img
                            src={
                              process.env.REACT_APP_ROOT_URL +
                              current.product_image
                            }
                            alt="user-design"
                            className={mobile ? classes.mobileUserDesign : ""}
                          />
                        </div>
                      </div>
                      <div
                        className={`card-shadow ${
                          mobile
                            ? classes.MobileDesignDescriptionContainer
                            : classes.DesignDescriptionContainer
                        }`}
                      >
                        <div className="card-bottom">
                          <div>
                            <div
                              className={
                                mobile
                                  ? classes.MobileDesignTitle
                                  : classes.DesignTitle
                              }
                            >
                              <h3 className="designTitle">
                                {current.design_name} . {current.colorway}
                                <br />
                                {current.application}
                              </h3>
                            </div>
                            <p
                              className={
                                mobile
                                  ? classes.MobileDesignDescription
                                  : classes.DesignDescription
                              }
                            >
                              &#8377; {current.revenue} revenue .{" "}
                              {current.sales} sales . {current.views} views
                            </p>
                          </div>
                          <div className="dots-div">
                            <img src={dots} alt="..." onClick={handleClick} />
                            <Menu
                              id="basic-menu"
                              anchorEl={anchorEl}
                              open={open}
                              onClose={() => setAnchorEl(null)}
                              MenuListProps={{
                                "aria-labelledby": "basic-button",
                              }}
                            >
                              {/* <MenuItem onClick={handleClose} sx={{width:220}}>
                                <ListItemIcon>
                                  <AddIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Add Colourway</ListItemText>
                              </MenuItem> */}
                              <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                  <img src={Delete} />
                                </ListItemIcon>
                                <ListItemText>Delete design</ListItemText>
                              </MenuItem>
                            </Menu>
                          </div>
                        </div>
                      </div>
                    </CardMedia>
                  </Card>
                </Grid>
              </React.Fragment>
            ))
          ) : (
            <div>
              <h2>No data to show</h2>
            </div>
          )
        ) : designs?.length !== undefined ? (
          <React.Fragment>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Grid container className="list-titles">
                  <Grid item xs={5} className="list-title">
                    Name
                  </Grid>
                  <Grid item xs={5} className="list-title">
                    Report
                  </Grid>
                  <Grid item xs={2} className="list-title">
                    Favourites
                  </Grid>
                </Grid>
              </Grid>
              {designs.map((current, index) => (
                <Grid item xs={12} className="list" key={index}>
                  <Modal
                    open={openModal}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography
                        id="modal-modal-title"
                        className="boxtitle"
                        variant="h6"
                        component="h2"
                      >
                        Delete this design?
                      </Typography>
                      <Typography
                        id="modal-modal-description"
                        className="boxdesc"
                        sx={{ mt: 2 }}
                      >
                        This can’t be undone and it will be removed from your
                        profile. It will take 30 days incase anyone has selected
                        a product for production.
                      </Typography>
                      <div className="modal-btns">
                        <div onClick={handleCloseModal} className="btn1">
                          <span className="cancel">Cancel</span>
                        </div>
                        <div
                          className="btn2"
                          onClick={() => {
                            console.log(current);
                            // deleteDesign(current.sku);
                          }}
                        >
                          <span className="delete">Delete</span>
                        </div>
                      </div>
                    </Box>
                  </Modal>
                  <Grid
                    container
                    className="list-items"
                    onMouseEnter={() => {
                      setIsShown(index);
                    }}
                    onMouseLeave={() => setIsShown(-1)}
                  >
                    {/* {console.log(isShown[index])} */}
                    <Grid item xs={5} className="list-item-name">
                      {current.design_name} . {current.colorway} .{" "}
                      {current.application}
                    </Grid>
                    <Grid item xs={5} className="list-item">
                      &#8377; {current.revenue} revenue . {current.sales} sales
                      . {current.views} views
                    </Grid>
                    <Grid item xs={1} className="list-item list-item-fav">
                      <span>{current.favourite_count}</span>
                    </Grid>
                    <Grid item xs={1}>
                      <div>
                        <img src={dotsdark} alt="..." onClick={handleClick} />
                        <Paper>
                          <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={() => setAnchorEl(null)}
                            MenuListProps={{
                              "aria-labelledby": "basic-button",
                            }}
                          >
                            {/* <MenuItem onClick={handleClose} sx={{ width: 220 }}>
                              <ListItemIcon>
                                <AddIcon fontSize="small" />
                              </ListItemIcon>
                              <ListItemText>Add Colourway</ListItemText>
                            </MenuItem> */}
                            <MenuItem onClick={handleClose}>
                              <ListItemIcon>
                                <img src={Delete} />
                              </ListItemIcon>
                              <ListItemText>Delete design</ListItemText>
                            </MenuItem>
                          </Menu>
                        </Paper>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </React.Fragment>
        ) : (
          <div>
            <h2>No data to show</h2>
          </div>
        )}
      </Grid>
      <Pagination
        pages={pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Designs;
