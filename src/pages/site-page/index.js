import { useState } from "react";
import styles from "./index.module.css";
import Card from "../../components/Card";
import GridCard from "../../components/GridCard";
import grid_view from "../../assets/icons/grid_view.svg";
import list_view from "../../assets/icons/list_view.svg";
import imgSrc from "../../assets/images/card_img.png";
import TextCard from "../../components/TextCard";
import Button from "../../components/Button";
import Title from "../../components/PageHeader";
import { useNavigate } from "react-router-dom";

const SitePage = () => {
  const siteTitle = "Site Title";
  const numberOfStories = 10;
  const contentTitle = "Support + Industry";
  const navigate = useNavigate();

  const [isGridView, setIsGridView] = useState(true);

  const handleViewChange = () => {
    setIsGridView(!isGridView);
  };

  return (
    <div className="page-container">
      <div className="content">
        <Title title={siteTitle} />
        <section className={styles["site-section"]}>
          <h5>{numberOfStories} Stories</h5>
          <button
            className={styles["view-change-button"]}
            onClick={handleViewChange}
          >
            <span>Change View</span>
            <img src={isGridView ? grid_view : list_view} alt="Change View" />
          </button>
        </section>
        <section className={styles["user-content"]}>
          <h2>Posts and Photos</h2>
          {isGridView ? (
            <>
              <Card
                title={contentTitle}
                content="A guide on how I created a growing and supportive community among Detroit’s busy automotive industry."
                author="Steven Henry"
                type="user-story"
                imgSrc={imgSrc}
              />
              <Card
                title={contentTitle}
                content="A guide on how I created a growing and supportive community among Detroit’s busy automotive industry."
                author="Steven Henry"
                type="user-story"
                imgSrc={imgSrc}
              />
            </>
          ) : (
            <>
              <div className={styles["grid-view"]}>
                <GridCard title={contentTitle} imgSrc={imgSrc} />
                <GridCard title={contentTitle} imgSrc={imgSrc} />
                <GridCard title={contentTitle} imgSrc={imgSrc} />
              </div>
            </>
          )}
          <div className={styles["button-container"]}>
            <Button
              text="View More"
              handleOnClick={() => navigate("/site-page")}
            />
          </div>
        </section>
        <hr />
        <section className={styles["user-content"]}>
          <h2>Posts</h2>
          <TextCard
            title={contentTitle}
            previewContent="A guide on how I created a growing and supportive community among Detroit’s busy automotive industry."
            author="Steven Henry"
            pfpSource={imgSrc}
            date="1/1/2021"
          />
          <div className={styles["button-container"]}>
            <Button
              text="View More"
              handleOnClick={() => navigate("/site-page")}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default SitePage;
