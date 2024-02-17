import React, { useState } from "react";
import "./index.css";
import Card from "../../components/Card";
import grid_view from "../../assets/icons/grid_view.svg";
import list_view from "../../assets/icons/list_view.svg";
import arrow_left from "../../assets/icons/arrow_left.svg";
import imgSrc from "../../assets/images/card_img.png";
import Title from "../../components/PageHeader";

const SitePage = () => {
  // You can replace 'Site Title' and 'Number of Stories' with your actual data.
  const siteTitle = "Site Title";
  const numberOfStories = 10;

  const [isGridView, setIsGridView] = useState(true);

  const handleViewChange = () => {
    setIsGridView(!isGridView);
  };

  return (
    <div className="wrapper">
      <div className="content">
        {/* <header className="site-header"> */}
        <Title title={siteTitle} />
        {/* </header> */}
        <section className="site-section">
          <div className="stories-count">{numberOfStories} stories</div>
          {/* <button className="view-change-button">Change View</button> */}
          <button className="view-change-button" onClick={handleViewChange}>
            <span>Change View</span>
            <img src={isGridView ? grid_view : list_view} alt="Change View" />
          </button>
        </section>
        <section className="user-content">
          <h2>Posts and Photos</h2>
          <Card
            title="Support + Industry"
            content="A guide on how I created a growing and supportive community among Detroit’s busy automotive industry."
            author="Steven Henry"
            type="user-story"
            imgSrc={imgSrc}
          />
          {/* Add more <Card /> components as needed */}
        </section>
        <hr />
        <section className="user-content">
          <h2>Posts</h2>
          <Card />
          {/* Add more <Card /> components as needed */}
        </section>
      </div>
    </div>
  );
};

export default SitePage;
