import React from "react";
import DropdownItem from "./dropdown-item";
import "./dropdowns.scss";

const Dropdowns = () => {
  const dropdowns = [
    {
      title: "How do I sell on Wallrus?",
      content:
        "The Wallrus Company is a startup marketplace platform for on-demand decor applications, bringing together creative artists, interior designers and customers for collaboration and commerce. Interior Designers across the country can now access artworks and designs created by Graphic Designers and Artists, translated into conventional products such as Wallpapers, Curtains, Fabrics, and many more.",
    },
    {
      title: "Indemnity",
      content:
        "The Wallrus Company is a startup marketplace platform for on-demand decor applications, bringing together creative artists, interior designers and customers for collaboration and commerce. Interior Designers across the country can now access artworks and designs created by Graphic Designers and Artists, translated into conventional products such as Wallpapers, Curtains, Fabrics, and many more.",
    },
    {
      title: "Content Use",
      content:
        "The Wallrus Company is a startup marketplace platform for on-demand decor applications, bringing together creative artists, interior designers and customers for collaboration and commerce. Interior Designers across the country can now access artworks and designs created by Graphic Designers and Artists, translated into conventional products such as Wallpapers, Curtains, Fabrics, and many more.",
    },
    {
      title: "Proprietary Rights",
      content:
        "The Wallrus Company is a startup marketplace platform for on-demand decor applications, bringing together creative artists, interior designers and customers for collaboration and commerce. Interior Designers across the country can now access artworks and designs created by Graphic Designers and Artists, translated into conventional products such as Wallpapers, Curtains, Fabrics, and many more.",
    },
  ];
  return (
    <div className="dropdown margin-40">
      <h2>Learn more about selling on Wallrus</h2>
      <div className="dropdown-items">
        {dropdowns.map((dropdown) => {
          return (
            <DropdownItem title={dropdown.title} content={dropdown.content} />
          );
        })}
      </div>
    </div>
  );
};

export default Dropdowns;
