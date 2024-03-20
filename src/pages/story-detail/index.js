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
import { fetchStoryAuthor } from "../../data/features/storyAuthorSlice";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { useParams, useLocation } from 'react-router-dom';

const StoryDetailPage = () => {
  const siteTitle = "Story Page";
  const dispatch = useDispatch();
  const location = useLocation();
  const postId = location.state?.postId;
  const { selectedPost } = useSelector((state) => state.storyList);
  const { authorInfo } = useSelector((state) => state.storyAuthor);

  useEffect(() => {
      dispatch(fetchStoryById(postId));
  }, [dispatch]);
  
  useEffect(() => {
    if (selectedPost && selectedPost.userId !== null){
      dispatch(fetchStoryAuthor(selectedPost.userId));}
    else {
      dispatch({
        type: "storyAuthor/fetchStoryAuthor/fulfilled",
        payload: { uid: null, username: "anonymous", profileImage: "https://firebasestorage.googleapis.com/v0/b/detroit-river-story.appspot.com/o/user%2Fprofile%2Fprofile.png?alt=media&token=9014aaaf-8bd4-4d71-99bf-383c74961057" }
      });
    }
  }, [dispatch]);

  console.log('postId',postId)
  console.log("selectedPost", selectedPost);
  //console.log("userId", selectedPost.userId)
  console.log("username", authorInfo.username)

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
            author={authorInfo.username}
            profileImg={authorInfo.profileImage}
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
