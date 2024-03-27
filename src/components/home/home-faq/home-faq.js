import DesignFAQ from "../../design-faq/design-faq";
import Footer from "../footer/footer";
import MainNav from "../main-nav/main-nav";
import "./home-faq.scss";

const HomeFAQ = (props) => {
  return (
    <div>
      <MainNav />
      <DesignFAQ />
      <Footer />
    </div>
  );
};

export default HomeFAQ;
