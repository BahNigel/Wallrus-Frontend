import "./applications.scss";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Grid, Button, Box } from "@material-ui/core";
import filterArrow from "../../../images/arrow-down.svg";
import filter from "../../../images/filter-shop.svg";
import design1 from "../../../images/design1.svg";
import design2 from "../../../images/design2.svg";
import sort from "../../../images/sort.svg";
import ProductCard from "../../product-card/product-card";
import Filters from "./filters/filters";
import Dropdown from "react-dropdown";
import { productList, filterList } from "../../../apis/apiCalls";
import CircularProgress from "@material-ui/core/CircularProgress";
import Pagination from "../../pagination/pagination";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const Applications = (props) => {
  const [application, setApplication] = useState([]);
  const [clear, setClear] = useState(false);
  const [apiStatus, setApiStatus] = useState({
    productList: false,
    filters: false,
  });
  const [listLoader, setListLoader] = useState(false);
  const [filtersList, setFiltersList] = useState([]);
  const [productFilter, setProductFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [type, setType] = useState("normal");
  const [filterCurrentPage, setFilterCurrentPage] = useState(1);
  const [sortCurrentPage, setSortCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [filterType, setFilterType] = useState("normal");
  const [filterType2, setFilterType2] = useState("mobile");

  //   useEffect(async() => {
  //     if (props.application === "wallpaper" && props.tabvalue === 0) {
  //       const application = await productList("wallpaper");
  //       setApplication(application.data);
  //       setApiStatus({ ...apiStatus, productList: true });
  //       console.log(application);
  //     }
  //   }, [props.tabvalue]);

  const dummyData = [
    {
      productimages_set: [
        {
          image: design1,
        },
      ],
      artist: "Sant Johns",
      userImage: design1,
    },
    {
      productimages_set: [
        {
          image: design1,
        },
      ],
      artist: "Sant Johns",
      userImage: design1,
    },
    {
      productimages_set: [
        {
          image: design1,
        },
      ],
      artist: "Sant Johns",
      userImage: design1,
    },
    {
      productimages_set: [
        {
          image: design1,
        },
      ],
      artist: "Sant Johns",
      userImage: design1,
    },
  ];
  useEffect(() => {
    setApiStatus({ ...apiStatus, productList: false, filters: false });
    setListLoader(true);
    (async () => {
      const products = await productList(props.application, currentPage);
      if (products) {
        // console.log("lolololo", typeof products?.results, products?.results);
        setApplication(products?.results);
        setApiStatus({ ...apiStatus, productList: true });
        setListLoader(false);
      } else {
        setApplication([]);
        setListLoader(false);
      }
    })();

    filterList(props.application).then((filtersList) => {
      setFiltersList(filtersList);
      setApiStatus({ ...apiStatus, filters: true });
    });
  }, [props.tabvalues, currentPage]);

  const arrowClosed = (
    <img
      src={filterArrow}
      alt="arrow-closed"
      className="shop-filter-arrow-closed"
    />
  );
  const arrowOpen = (
    <img
      src={filterArrow}
      alt="arrow-open"
      className="shop-filter-arrow-open"
    />
  );

  const ArrowLeft = () => (
    <svg
      className="previous"
      width="8"
      height="14"
      viewBox="0 0 8 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.9165 12.8337L1.08317 7.00033L6.9165 1.16699"
        stroke="#200E32"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );

  const ArrowRight = () => (
    <svg
      className="next"
      width="8"
      height="14"
      viewBox="0 0 8 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.08325 1.16732L6.91659 7.00065L1.08325 12.834"
        stroke="#200E32"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );

  const designContents = [
    {
      designName: "Art Decon1",
      applications: "Wallpaper",
      name: "Jassie Mario",
      image: design1,
    },
  ];

  const sortOptions = [
    "Best selling",
    "Recommended",
    "Customer ratings",
    "What's new",
  ];

  const history = useHistory();

  const [selectedFilter, setFilter] = useState(null);

  const [gridItem, setGridItem] = useState(false);

  const [filterCount, setFilterCount] = useState(0);

  const [filters, setFilters] = useState([]);

  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_ROOT_URL}/api/filter-tag/?page-size=20&page=${filterCurrentPage}`,
        { tags: filters, application_slug: props.application },
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(
              "Access_Key"
            )}`,
          },
        }
      )
      .then((res) => {
        if (res?.data?.results?.length > 0) {
          setApplication(res?.data?.results);
          // console.log("filter :",res?.data?.results);
        } else {
          productList(props.application, filterCurrentPage).then(
            (productsList) => {
              if (productsList?.results) {
                setApplication(productsList?.results);
                setApiStatus({ ...apiStatus, productList: true });
                setListLoader(false);
              }
            }
          );
        }
      })
      .catch((e) => console.log(e));
  }, [filters, filterCurrentPage]);

  // useEffect(() => {
  //   if(filterCurrentPage !== undefined){

  //     axios
  //       .get(
  //         `${process.env.REACT_APP_ROOT_URL}/api/product-list/${props.application}?sort-by=${filters}&page-size=20&page=${filterCurrentPage}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${window.localStorage.getItem(
  //               "Access_Key"
  //             )}`,
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         // console.log(res.data);
  //         console.log(filters);
  //         if (res?.data?.results?.length > 0) {
  //           setApplication(res?.data?.results);
  //         } else {
  //           productList(props.application,filterCurrentPage).then((productsList) => {
  //             if (productsList) {
  //               setApplication(productsList?.results);
  //               setApiStatus({ ...apiStatus, productList: true });
  //               setListLoader(false);
  //             }
  //           });
  //         }
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //         console.log(filters);
  //       });
  //   }else{
  //     alert(filterCurrentPage);
  //   }
  // }, [productFilter,filters,filterCurrentPage]);

  useEffect(() => {
    if (filters.length === 0) {
      setType("normal");
    }
  }, [filters]);

  const onClick = (e) => {
    setGridItem(!gridItem);
  };

  const handleFilters = (filter) => {
    const temp = ["selling", "recommended", "ratings", "new"];
    setFilter(temp[sortOptions.indexOf(filter)]);
    setProductFilter(!productFilter);
    setType("sort");
  };

  const handleFilterCount = (check) => {
    setFilterCount(check ? filterCount + 1 : filterCount - 1);
  };

  const viewProduct = (e) => {
    history.push(`/shop/${e.target.id}`);
  };

  const PER_PAGE = 12;

  // function handlePageClick({ selected: selectedPage }) {
  //   props.refer.current.scrollIntoView();
  //   setCurrentPage(selectedPage);
  // }

  const offset = currentPage * PER_PAGE;

  let pages = [];
  const length = application.length || 0;
  for (let i = 1; i <= Math.ceil(length / PER_PAGE); i++) {
    pages.push(i);
  }

  useEffect(() => {
    (async () => {
      if (selectedFilter?.value) {
        try {
          const res = await axios.get(
            `${process.env.REACT_APP_ROOT_URL}/api/product-list/wallpaper?sort-by=${selectedFilter?.value}&page-size=20&page=${sortCurrentPage}`,
            {
              headers: {
                Authorization: `Bearer ${window.localStorage.getItem(
                  "Access_Key"
                )}`,
              },
            }
          );
          setApplication(res?.data.results);
          // console.log("demn",res?.data.results);
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [selectedFilter, sortCurrentPage]);

  return (
    <div>
      {apiStatus.productList === true && (
        <div className="filter-nav">
          <Grid item lg={3}>
            <div
              className="filters-header"
              style={gridItem ? { borderRight: "1px solid #DCDCDC" } : null}
            >
              <div className="filter-count">
                <div className="arrows" onClick={onClick}>
                  {gridItem ? <ArrowLeft /> : <ArrowRight />}
                </div>

                <p onClick={onClick}>
                  <span>
                    <i>{filterCount}</i>
                  </span>
                  Filters
                </p>
              </div>
              {gridItem ? (
                <p
                  onClick={() => {
                    setFilterCount(0);
                    setClear(!clear);
                    setFilters([]);
                    setType("normal");
                  }}
                  className="clear-all"
                >
                  Clear all
                </p>
              ) : null}
            </div>
          </Grid>
          <div className="filter-container">
            <div>
              <Dropdown
                arrowClosed={arrowClosed}
                arrowOpen={arrowOpen}
                options={sortOptions}
                onChange={handleFilters}
                placeholder="Sort by"
                value={selectedFilter}
                className="filter-holder"
              />
            </div>
          </div>
        </div>
      )}
      <Grid container style={{ paddingRight: "10px" }}>
        {gridItem ? (
          <Grid item lg={3}>
            <div>
              <Filters
                filtersList={filtersList}
                handleFilterCount={handleFilterCount}
                filters={filters}
                setFilters={setFilters}
                clear={clear}
                setType={setType}
                filterType={filterType}
              />
            </div>
          </Grid>
        ) : null}

        <Grid item xs>
          {listLoader ? (
            <div className="application-loader-container">
              <div>
                <CircularProgress size={80} className="application-loader" />
              </div>
            </div>
          ) : (
            <>
              <Grid
                container
                spacing={4}
                justifyContent="flex-end"
                direction="row"
                style={{ marginTop: "2.6%", paddingLeft: "40px" }}
                className="product-grid"
              >
                {application.map((item, index) => (
                  <Grid
                    item
                    xs={6}
                    md={4}
                    lg={3}
                    xl={3}
                    className="product-wrap"
                  >
                    <ProductCard
                      general={true}
                      key={item.slug}
                      id={item.slug}
                      sku={item.sku}
                      onClick={viewProduct}
                      isFavourite={item.is_favourite}
                      artist={item.artist_unique_id}
                      designImage={`${process.env.REACT_APP_ROOT_URL}${item.productimage}`}
                      designerImage={`${process.env.REACT_APP_ROOT_URL}${item.artist_image}`}
                      designerName={item.artist}
                    />
                  </Grid>
                ))}
              </Grid>
              {length === 0 && (
                <p style={{ textAlign: "center" }}>No data found</p>
              )}
              <Pagination
                pages={application.length}
                currentPage={
                  type === "normal"
                    ? currentPage
                    : type === "sort"
                    ? sortCurrentPage
                    : filterCurrentPage
                }
                setCurrentPage={
                  type === "normal"
                    ? setCurrentPage
                    : type === "sort"
                    ? setSortCurrentPage
                    : setFilterCurrentPage
                }
              />
            </>
          )}
        </Grid>
      </Grid>
      <div className="sorting-div">
        <div className="sorting">
          {/* <div className="sort">
            <p>
              <img src={sort} alt="sort" />
              Sort
            </p>
          </div> */}
          <div className="filter" onClick={handleOpen}>
            <p>
              <img src={filter} alt="filter" />
              Filters
            </p>
          </div>
        </div>
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box>
          <div>
            <Filters
              filtersList={filtersList}
              handleFilterCount={handleFilterCount}
              filters={filters}
              setFilters={setFilters}
              clear={clear}
              setType={setType}
              filterType={filterType2}
              closeModal={handleClose}
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Applications;
