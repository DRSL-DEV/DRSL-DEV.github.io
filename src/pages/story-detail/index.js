import styles from "./index.module.css";
import React, { useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import StoryInfo from "../../components/StoryInfo";
import link_icon from "../../assets/icons/link_icon.svg";
import LikeButton from "../../components/LikeButton";
import "firebase/firestore";
import { Carousel } from "antd";
import { fetchStoryById } from "../../data/features/storyListSlice";
import { fetchStoryAuthor } from "../../data/features/storyAuthorSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { convertTimeFormatMDY } from "../../utils/dateFormat";
import Button from "../../components/Button";

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
  }, [dispatch, postId]);

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
      <div className={styles["story-icons"]}>
        <LikeButton postId={postId} />
        {selectedPost && selectedPost.status === "approved" && (
          <img
            className={styles["share-icon"]}
            onClick={handleShare}
            src={link_icon}
            alt="share"
          />
        )}
      </div>
      <div className={styles["story-title"]}>
        <PageHeader title={siteTitle} />
      </div>
      {selectedPost && selectedPost.status === "rejected" && (
        <div className={styles["rejection-info-container"]}>
          <h2 className={styles["rejection-comment-title"]}>
            {`Admin Comment on ${convertTimeFormatMDY(
              selectedPost.latestReviewTime
            )}:`}
          </h2>
          <p className={styles["rejection-comment-content"]}>
            {selectedPost.adminComment.at(-1).comment}
          </p>
          <div className={styles["rejection-action-section"]}>
            <h5>Please edit your story and re-submit</h5>
            <Button
              text="EDIT"
              customStyles={{
                width: "310px",
                height: "45px",
                borderRadius: "30px",
                fontSize: "16px",
              }}
            />
          </div>
        </div>
      )}
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
                ) : mediaUrl.includes("audio") ? (
                  <audio controls>
                    <source src={mediaUrl} type="audio/mpeg" />
                    Your browser does not support the audio tag.
                  </audio>
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
          <StoryInfo selectedPost={selectedPost} authorInfo={authorInfo} />
        )}
      </div>
      <div className={styles["delete-action"]}>
        <Button
          text="DELETE"
          customStyles={{
            width: "310px",
            height: "45px",
            borderRadius: "30px",
            fontSize: "16px",
          }}
        />
      </div>
    </div>
  );
};

export default StoryDetailPage;
