import styles from "./index.module.css";
import React, { useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import StoryInfo from "../../components/StoryInfo";
import link_icon from "../../assets/icons/link_icon.svg";
import LikeButton from "../../components/LikeButton";
import "firebase/firestore";
import { Carousel, message } from "antd";
import {
  fetchStoryById,
  deletePostById,
} from "../../data/features/storyListSlice";
import { fetchStoryAuthor } from "../../data/features/storyAuthorSlice";
import { deleteFile } from "../../data/features/fileUploadSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { convertTimeFormatMDY } from "../../utils/dateFormat";
import Button from "../../components/Button";

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

  const handleDeleteStory = async () => {
    const deleteMediaPromises = selectedPost?.media.map((mediaUrl) =>
      dispatch(deleteFile(mediaUrl)).unwrap()
    );

    try {
      await Promise.all(deleteMediaPromises);
      dispatch(deletePostById(postId));
      message.success({
        content:
          "Story deleted successfully! You will be redirected back to the previous page shortly",
        duration: 2,
      });
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } catch (error) {
      message.error({
        content: "Failed to delete the story.",
        duration: 2,
      });
    }
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
              handleOnClick={() => {
                navigate("/create-story", { state: { selectedPost } });
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
      {currentUser?.uid === selectedPost.userId && (
        <>
          {" "}
          {!selectedPost ||
            (selectedPost.status !== "rejected" && (
              <div className={styles["edit-section"]}>
                <Button
                  text="EDIT"
                  customStyles={{
                    width: "310px",
                    height: "45px",
                    borderRadius: "30px",
                    fontSize: "16px",
                  }}
                  handleOnClick={() => {
                    navigate("/create-story", { state: { selectedPost } });
                  }}
                />
              </div>
            ))}
          <div className={styles["delete-action"]}>
            <Button
              text="DELETE"
              customStyles={{
                width: "310px",
                height: "45px",
                borderRadius: "30px",
                fontSize: "16px",
                backgroundColor: "var( --secondary-color-red-accent)",
              }}
              handleOnClick={() => handleDeleteStory()}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default StoryDetailPage;
