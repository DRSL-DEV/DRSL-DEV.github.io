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
import { useSelector, useDispatch } from "react-redux";
import { subscribeToStoryList } from "../../data/features/storyListSlice";
import { fetchSiteLocation } from "../../data/features/siteLocationSlice";
import { useEffect } from "react";
import { siteLocationList } from "../../constants/constants";

const SitePage = () => {
  const numberOfStories = 10;
  const contentTitle = "Support + Industry";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storyList = useSelector((state) => state.storyList.storyList);
  const siteLocation = useSelector((state) => state.siteLocation.siteLocation);

  useEffect(() => {
    const unsubscribeStory = dispatch(subscribeToStoryList());
    return () => {
      unsubscribeStory();
    };
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(fetchSiteLocation("sitelocationid")); // Pass your site location ID here
  // }, [dispatch]);

  useEffect(() => {
    siteLocationList.forEach((site) => {
      dispatch(fetchSiteLocation(site.id));
    });
    console.log("Site Location List: ", siteLocation);
  }, [dispatch, siteLocation]);

  const [isGridView, setIsGridView] = useState(true);

  const handleViewChange = () => {
    setIsGridView(!isGridView);
  };

  const siteTitle = siteLocation.siteName;

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
            storyList.map((story) => (
              <Card
                key={story.id}
                postId={story.id}
                title={story.title}
                content={story.content}
                author={story.userId}
                type="user-story"
                imgSrc={story.media[0]}
              />
            ))
          ) : (
            <div className={styles["grid-view"]}>
              {storyList.map((story) => (
                <GridCard
                  key={story.id}
                  title={story.title}
                  imgSrc={story.imgSrc}
                />
              ))}
            </div>
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
