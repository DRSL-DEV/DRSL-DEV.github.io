import PageHeader from "../../components/PageHeader";
import StoryInfo from "../../components/StoryInfo";
import link_icon from "../../assets/icons/link_icon.svg";
import admin_comments_icon from "../../assets/icons/admin-comments.svg";

import { Carousel } from "antd";
import styles from "./index.module.css";
import "firebase/firestore";
import { fetchStoryById } from "../../data/features/storyListSlice";
import { fetchStoryAuthor } from "../../data/features/storyAuthorSlice";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import LikeButton from "../../components/LikeButton";
import { useNavigate } from "react-router-dom";

const StoryDetailPage = () => {
  const siteTitle = "Story Page";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const postId = location.state?.postId;
  const { selectedPost } = useSelector((state) => state.storyList);
  const { authorInfo } = useSelector((state) => state.storyAuthor);
  const currentUser = useSelector((state) => state.userInfo.user);

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

  const handleAdminCommentsDisplay = () => {
      if (!currentUser) {
        navigate("/login");
      } else {
        console.log(selectedPost);
        //TODO: Go to Admin Comments Page
        //TODO: Print the admin comment and latest review time in console
        //TODO: Figure out how to pass the admin comment and latest review time to the Admin Comments Page  
      }
    }

  return (
    <div className={`page-container ${styles["story-detail-page-container"]}`}>
      <div className={styles["story-icons"]}>
        <LikeButton postId={postId} />
        <img
          className={styles["share-icon"]}
          onClick={handleShare}
          src={link_icon}
          alt="share"
        />
        {selectedPost && selectedPost.status === "rejected"?(
        <img
          className={styles["admin-comments-icon"]}
          onClick={handleAdminCommentsDisplay}
          src={admin_comments_icon}
          alt="admin-comments"
        />):null}
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
    </div>
  );
};

export default StoryDetailPage;
