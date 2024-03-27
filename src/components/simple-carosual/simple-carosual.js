import "./simple-carosual.scss";
import Carousel from "react-elastic-carousel";
import Prev from "../../images/carousel-left-arrow.svg";
import Next from "../../images/carousel-right-arrow.svg";
import { CircularProgress } from "@material-ui/core";

const SimpleCarosual = (props) => {
  let carousel;

  const next = () => {
    carousel.slideNext();
  };
  const prev = () => {
    carousel.slidePrev();
  };

  const breakpoints = [
    { width: 500, itemsToShow: 1, itemsToScroll: 1 },
    { width: 600, itemsToShow: 2, itemsToScroll: 2 },
    { width: 900, itemsToShow: 3, itemsToScroll: 3 },
    { width: 1200, itemsToShow: 4, itemsToScroll: 4 },
  ];

  let carosoul = (
    <Carousel
      breakPoints={breakpoints}
      showArrows={false}
      enableSwipe={true}
      pagination={false}
      itemPadding={[0, 15]}
      outerSpacing={0}
      ref={(ref) => (carousel = ref)}
    >
      {props.gridItems}
    </Carousel>
  );
  if (props.loading) {
    carosoul = (
      <div className="flex center">
        <CircularProgress size={50} className="circular-progress" />
      </div>
    );
  }

  return (
    <div className="margin-20">
      <div className="flex">
        <h2 className="margin-right-auto padding-x-25">{props.heading}</h2>
        <div className="flex padding-x-25">
          <img className="margin-x-10 pointer" src={Prev} onClick={prev} alt='' />
          <img className="pointer" src={Next} onClick={next} alt='' />
        </div>
      </div>
      {carosoul}
    </div>
  );
};

export default SimpleCarosual;
