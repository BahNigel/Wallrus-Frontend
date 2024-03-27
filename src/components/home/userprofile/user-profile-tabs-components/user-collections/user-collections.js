import { useEffect, useState } from "react";
import "./user-collection.scss";
import { useHistory } from "react-router";
import { Grid } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Collection1 from "../../../../../images/design1.svg";
import Collection2 from "../../../../../images/design2.svg";
import Collection3 from "../../../../../images/design3.svg";
import { getDecoratorCollection } from "../../../../../apis/apiCalls";
import CollectionCard from "./collection-card/collection-card";
import Pagination from "../../../../pagination/pagination";


const UserCollections = (props) => {
  const [loader, setloader] = useState(true);
  const [collections, setcollections] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);


  const history = useHistory();

  const handleClick = (id) => {
    history.push(`/collection/${id}`);
  };

  useEffect(() => {
    getDecoratorCollection(currentPage).then((res) => {
      let Templist = [];
      let productImages = [];
      res.forEach((res, index) => {
        // get Product Images
        res.products.forEach((img) => {
          productImages.push(img.image);
        });
        const collectionList = {
          id: res.pk,
          img: productImages
            ? productImages
            : [Collection1, Collection2, Collection3],
          otherImg: res.products.slice(1, 4),
          title: res.name,
          design: res.number_of_designs,
          artist: res.number_of_artists,
        };
        Templist.push(collectionList);
      });
      setloader(false);
      setcollections(Templist);
    });
  }, [currentPage]);

  const PER_PAGE = 12;
  let pages = [];
  const length = collections.length || 0;
  for (let i = 1; i <= Math.ceil(length / PER_PAGE); i++) {
    pages.push(i);
  }

  return (
    <div className="user-collections">
      <Grid spacing={4} container>
        {loader ? (
          <div
            style={{ display: "flex", width: "100%", justifyContent: "center" }}
          >
            <CircularProgress
              size={50}
              style={{ color: "#000", margin: "40px 0 60px" }}
            />
          </div>
        ) : collections && collections.length === 0 ? (
          <div
            style={{ display: "flex", width: "100%", justifyContent: "center" }}
          >
            No data to show
          </div>
        ) : (
          collections.map((item, index) => {
            return (
              <Grid item xs={12} md={6} lg={3} xl={3}>
                <CollectionCard
                  key={item.id}
                  id={item.id}
                  onClick={(id) => handleClick(id)}
                  headerImg={item.img[0]}
                  otherImg={item.otherImg}
                  collectionName={item.title}
                  artists={item.design}
                  designs={item.artist}
                />
              </Grid>
            );
          })
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

export default UserCollections;
