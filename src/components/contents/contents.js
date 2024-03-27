import Footer from "../home/footer/footer";
import MainNav from "../home/main-nav/main-nav";
import "../home/home-faq/home-faq.scss";
import "../design-faq/design-faq.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Contents = (props) => {
  const { id } = useParams();
  const category = [
    "seller_agreement",
    "return_exchange",
    "privacy_policy",
    "terms_of_use",
    "data_deletion",
  ];
  const [content, setContent] = useState({});

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_ROOT_URL}/api/content/${category[id]}`)
      .then((res) => {
        setContent(res.data);
        console.log(res.data);
      });
  }, [id]);
  return (
    <div>
      <MainNav />
      <div className="faqs-container">
        {category[id] == "data_deletion" && (
          <div className="faqs-div">
            <p className="faqs-subtitle">{content.header}</p>
          </div>
        )}
        {content.items?.map((item) => (
          <>
            <div className="faqs-div">
              <h2 className="faqs-title">{item.heading} </h2>
              <p className="faqs-subtitle">{item.text}</p>
            </div>
            <hr className="horizontal-line" noshade />
          </>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Contents;
