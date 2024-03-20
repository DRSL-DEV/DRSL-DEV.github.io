import PageHeader from "../../components/PageHeader";
import StoryInfo from "../../components/StoryInfo";
import link_icon from "../../assets/icons/link_icon.svg";
import profile from "../../assets/images/profile.png";
import { Carousel } from "antd";
import styles from "./index.module.css";

import "firebase/firestore";
import { fetchStoryById } from "../../data/features/storyListSlice";
import { fetchStoryAuthor } from "../../data/features/storyAuthorSlice";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const StoryDetailPage = () => {
  const siteTitle = "Story Page";
  const dispatch = useDispatch();
  const location = useLocation();
  const postId = location.state?.postId;
  const { selectedPost } = useSelector((state) => state.storyList);
  const { authorInfo } = useSelector((state) => state.storyAuthor);

  useEffect(() => {
    dispatch(fetchStoryById(postId)).then((result) => {
      dispatch(fetchStoryAuthor(result.payload.userId));
    });
  }, [dispatch]);

  const handleShare = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        alert("Link copied to clipboard");
      })
      .catch((error) => {
        console.error("Error copying link to clipboard: ", error);
      });
  };

  return (
    <div className={`page-container ${styles["story-detail-page-container"]}`}>
      <div>
        <img
          className={styles["share-icon"]}
          onClick={handleShare}
          src={link_icon}
          alt="share"
        />
      </div>
      <div className={styles["story-title"]}>
        <PageHeader title={siteTitle} />
      </div>
      <div>
        {selectedPost && (
          <Carousel className={styles.carousel} autoplay>
            {/* TODO: Modify function to distinguish between video and image */}
            {selectedPost.media.map((mediaUrl, index) => (
              <div key={index}>
                {mediaUrl.includes("video") ? (
                  <video controls>
                    <source src={mediaUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    className={styles["story-image-gallery"]}
                    src={mediaUrl}
                    alt="post media"
                  />
                )}
              </div>
            ))}
          </Carousel>
        )}
      </div>
      <div className={styles["main-content"]}>
        {selectedPost && (
          <StoryInfo
            title={selectedPost.title}
            author={authorInfo.username}
            profileImg={authorInfo.profileImage || profile}
            anonymous={authorInfo.anonymousSubmissionCheck}
            date={selectedPost.submitTime}
            content={selectedPost.content}
            tags={selectedPost.tags}
          />
        )}
      </div>
    </div>
  );
};

export default StoryDetailPage;
