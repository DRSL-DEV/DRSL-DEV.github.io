import { useEffect, useState } from "react";
import styles from "./index.module.css";
import Card from "../../components/Card";
import GridCard from "../../components/GridCard";
import grid_view from "../../assets/icons/grid_view.svg";
import list_view from "../../assets/icons/list_view.svg";
import Title from "../../components/PageHeader";
import Button from "../../components/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPostsBySite,
  subscribeToStoryList,
} from "../../data/features/storyListSlice";
import { siteLocationList } from "../../constants/constants";

const SitePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const siteLocationId = location.state?.siteLocationId;

  const posts = useSelector(
    (state) => state.storyList.postsBySite[siteLocationId] || []
  );
  const siteLocation = siteLocationList.find(
    (site) => site.id === siteLocationId
  );
  const lastVisibleDocId = useSelector(
    (state) => state.storyList.lastVisibleDocIdBySite[siteLocationId]
  );
  const siteTitle = siteLocation ? siteLocation.name : "Default Title";
  const numberOfStories = posts.length;

  useEffect(() => {
    if (siteLocationId) {
      dispatch(
        fetchPostsBySite({ siteId: siteLocationId, lastVisibleDocId: null })
      );
    }
  }, [dispatch, siteLocationId]);

  const handleViewMore = () => {
    if (lastVisibleDocId) {
      dispatch(fetchPostsBySite({ siteId: siteLocationId, lastVisibleDocId }));
    }
  };

  const [isGridView, setIsGridView] = useState(true);

  const handleViewChange = () => {
    setIsGridView(!isGridView);
  };

  if (!siteLocation) {
    navigate("*");
    return null;
  }

  return (
    <div className="page-container">
      <div className={styles["content"]}>
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
          <div
            className={
              isGridView ? styles["card-container"] : styles["grid-view"]
            }
          >
            {posts.map((story) =>
              isGridView ? (
                <Card
                  key={story.id}
                  postId={story.id}
                  title={story.title}
                  content={story.content}
                  author={story.userId}
                  type="user-story"
                  imgSrc={story.media[0]}
                />
              ) : (
                <GridCard
                  key={story.id}
                  title={story.title}
                  imgSrc={story.media[0]}
                  postId={story.id}
                />
              )
            )}
          </div>
          {isGridView &&
            lastVisibleDocId &&
            posts.length > 0 &&
            posts.length % 3 === 0 && (
              <div className={styles["button-container"]}>
                <Button text="View More" handleOnClick={handleViewMore} />
              </div>
            )}
          {/* <div className={styles["button-container"]}>
            <Button
              text="View More"
              handleOnClick={() => navigate("/site-page")}
            />
          </div> */}
        </section>
        {/* <hr />
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
        </section> */}
      </div>
    </div>
  );
};

export default SitePage;
