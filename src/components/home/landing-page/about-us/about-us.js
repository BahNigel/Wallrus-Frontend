import React from "react";
import "./about-us.scss";
import aboutImg from "../../../../images/about-us.png";
import Story from "./story/story";
import Cta from "../../../cta/cta";
import Header from "../../../header/header";
import Footer from "../../footer/footer";

const AboutUs = (props) => {
  return (
    <>
      <Header />
      <section className="about-us">
        <img className="about-img" src={aboutImg} alt="img" />
        <Story />
        <Cta />
      </section>
      <Footer />
    </>
  );
};

export default AboutUs;
