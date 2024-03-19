import image_placeholder from "../../assets/images/image_placeholder.png";
import PageHeader from "../../components/PageHeader";
import StoryInfo from "../../components/StoryInfo";
import LikeButton from "../../components/LikeButton";
import link_icon from "../../assets/icons/link_icon.svg";
import profile from "../../assets/images/profile.png";
import { Carousel } from "antd";
import styles from "./index.module.css";
import "firebase/firestore";
import { fetchStoryById } from "../../data/features/storyListSlice";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';

const StoryDetailPage = () => {
  const siteTitle = "Story Page";
  
  const dispatch = useDispatch();
  const { postId } = useParams();
  const { status, selectedPost, error } = useSelector((state) => state.storyList);
  console.log('postId',postId)

  useEffect(() => {
    if (!selectedPost || selectedPost.id !== postId) {
      dispatch(fetchStoryById(postId));
    }
  }, [dispatch, postId, selectedPost]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  console.log("selectedPost", selectedPost);
  console.log("status", status);

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
          {selectedPost.media.map((mediaUrl, index) => (
            <div key={index}>
              <img
                className={styles["story-image-gallery"]}
                src={mediaUrl}
                alt="post media"
              />
            </div>
          ))}
        </Carousel>
        )}
      </div>
      <div className={styles["main-content"]}>
        {selectedPost && (
          <StoryInfo
            title={selectedPost.title}
            author={selectedPost.author}
            profileImg={selectedPost.profileImg}
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
