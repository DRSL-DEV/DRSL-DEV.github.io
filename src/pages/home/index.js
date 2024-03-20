import styles from "./index.module.css";
import Card from "../../components/Card";
import Button from "../../components/Button";
// import imgSrc from "../../assets/images/card_img.png";
import gallery_placeholder from "../../assets/images/home_gallery.png";
import { useNavigate } from "react-router-dom";
import { Carousel } from "antd";
import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { fetchStoryList } from "../../data/features/storyListSlice";

const HomePage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const storyList = useSelector((state) => state.storyList.storyList);
  const status = useSelector((state) => state.storyList.status);

  // console.log("status", status);
  const approvedUserStoryList = storyList.filter((story) => story.status === "approved");
  const filteredUserStoryList = approvedUserStoryList.filter((story) => story.postType === "user");
  const filteredLabStoryList = storyList.filter((story) => story.postType === "partner");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchStoryList());
    }
  }, [status, dispatch]);

  const mediaUrls = [
    gallery_placeholder,
    gallery_placeholder,
    gallery_placeholder,
  ];

  return (
    <div className={`page-container ${styles["homepage-container"]}`}>
      <main>
        <Carousel className={styles.carousel} autoplay>
          {mediaUrls.map((mediaUrl, index) => (
            <div key={index} className={styles["carousel-item"]}>
              <img
                className={styles["story-image-gallery"]}
                src={mediaUrl}
                alt="home gallery"
              />
              <div className={styles.overlay}>
                <p className={styles["carousel-title"]}>
                  Historical Collective
                </p>
                <p className={styles["carousel-sub-title"]}>
                  Reflective Perspectives from Detroit Natives
                </p>
                <a
                  href="/story"
                  onClick={() => navigate("/story")}
                  className={styles["carousel-link"]}
                >
                  Learn More
                </a>
              </div>
            </div>
          ))}
        </Carousel>
        <section className={styles["user-stories-section"]}>
          <h2 className={styles["story-h2"]}> User Stories</h2>
          <div className={styles["cards-container"]}>
            {filteredUserStoryList.map((story) => (
              <Card
                key={story.id}
                title={story.title}
                content={story.content}
                author={story.userId}
                type="user-story"
                imgSrc={story.media[0]}
              />
            ))} 
            <div className={styles["button-container"]}>
              <Button
                text="Share Your Story"
                handleOnClick={() => navigate("/create-story")}
              />
              <Button text="View More" handleOnClick={() => {}} />
            </div>
          </div>
        </section>
        <section className={styles["partnered-stories-section"]}>
          <h2 className={styles["story-h2"]}>Partnered Stories</h2>
          <div className={styles["cards-container"]}>
            {filteredLabStoryList.map((story) => (
              <Card
                key={story.id}
                title={story.title}
                content={story.content}
                author={story.userId}
                type="lab-story"
                // imgSrc={imgSrc}
                imgSrc={story.media[0]}
              />
            ))} 
          </div>
          <div className={styles["button-container"]}>
            <Button text="View More" handleOnClick={() => {}} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
