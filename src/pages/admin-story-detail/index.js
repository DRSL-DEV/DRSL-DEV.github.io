import styles from "./index.module.css";
import { useEffect } from "react";
import { message } from "antd";
import PageHeader from "../../components/PageHeader";
import AdminStoryInfo from "../../components/AdminStoryInfo";
import Button from "../../components/Button";
import { Carousel } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchStoryAuthor } from "../../data/features/storyAuthorSlice";
import { approvePost } from "../../data/features/adminCommentSlice";
import {
  convertTimeFormatMDY,
  convertTimeFormatHMDY,
} from "../../utils/dateFormat";

const AdminStoryDetailPage = () => {
  const siteTitle = "Admin View";
  const navigate = useNavigate();
  const location = useLocation();
  const storyInfo = location.state.storyInfo;
  const authorInfo = useSelector((state) => state.storyAuthor.authorInfo);
  const {
    id,
    userId,
    title,
    content,
    media,
    status,
    submitTime,
    tags,
    latestReviewTime,
    adminComment,
  } = storyInfo;
  const { profileImage, username, anonymousSubmissionCheck } = authorInfo;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStoryAuthor(userId));
  }, [dispatch, userId]);

  return (
    <div className="page-container">
      <PageHeader title={siteTitle} />

      <Carousel className={styles.carousel} autoplay autoplaySpeed={5000}>
        {media.map((mediaUrl, index) => (
          <div key={index} className={styles.media}>
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
              <img src={mediaUrl} alt="post media" />
            )}
          </div>
        ))}
      </Carousel>

      <AdminStoryInfo
        className={styles["story-info-resize"]}
        title={title}
        content={content}
        username={username}
        profileImage={profileImage}
        submitTime={convertTimeFormatMDY(submitTime)}
        tags={tags}
        status={status}
        profileImg={profileImage}
        anonymous={anonymousSubmissionCheck}
      />

      <div className={styles["button-container"]}>
        {status === "rejected" && (
          <div className={styles["rejection-comment-container"]}>
            <div
              className={styles["rejection-comment-container-outer-border"]}
            />
            <div
              className={styles["rejection-comment-container-top-divider"]}
            />
            <div className={styles["rejection-comment-title-text"]}>
              {`Admin Comment on ${convertTimeFormatHMDY(latestReviewTime)}`}
            </div>
            <div className={styles["rejection-comment-content-text"]}>
              {adminComment.at(-1).comment}
            </div>
          </div>
        )}
      </div>

      {latestReviewTime && (
        <div className={styles["admin-update-time-container"]}>
          <h5>
            {"Last admin update: " + convertTimeFormatMDY(latestReviewTime)}
          </h5>
        </div>
      )}

      <div className={styles["button-container"]}>
        {/* conditional rendering of buttons - display reject and approve if pending;
        display reject if Approved
        display approve if Rejected */}

        {status === "pending" && (
          <>
            <Button
              text="Reject"
              handleOnClick={() =>
                navigate(
                  `/admin-page/admin-reject-form/${title
                    .toLowerCase()
                    .replace(/ /g, "-")
                    .replace(/[^\w-]+/g, "")}`,
                  { state: { postId: id } }
                )
              }
              customStyles={{
                backgroundColor: "var(--secondary-color-red-accent)",
              }}
            />
            <Button
              text="Approve"
              handleOnClick={() => {
                dispatch(
                  approvePost({
                    postId: id,
                    approveTime: new Date().toISOString(),
                  })
                ).unwrap();
                message.success({
                  content:
                    "Story approved successfully! You will be redirected back to the story page shortly.",
                  duration: 2,
                });
                setTimeout(() => {
                  navigate("/admin-page");
                }, 2000);
              }}
              customStyles={{
                backgroundColor: "var(--secondary-color-light-green)",
              }}
            />
          </>
        )}

        {status === "approved" && (
          <Button
            text="Reject"
            handleOnClick={() =>
              navigate(
                `/admin-page/admin-reject-form/${title
                  .toLowerCase()
                  .replace(/ /g, "-")
                  .replace(/[^\w-]+/g, "")}`,
                { state: { postId: id } }
              )
            }
            customStyles={{
              backgroundColor: "var(--secondary-color-red-accent)",
            }}
          />
        )}

        {status === "rejected" && (
          <>
            <Button
              text="Edit Comment"
              handleOnClick={() =>
                navigate(
                  `/admin-page/admin-reject-form/${title
                    .toLowerCase()
                    .replace(/ /g, "-")
                    .replace(/[^\w-]+/g, "")}`,
                  {
                    state: { postId: id, comment: adminComment.at(-1).comment },
                  }
                )
              }
            />
            <Button
              text="Approve"
              handleOnClick={() => {
                dispatch(
                  approvePost({
                    postId: id,
                    approveTime: new Date().toISOString(),
                  })
                ).unwrap();
                message.success({
                  content:
                    "Story approved successfully! You will be redirected back to the story page shortly.",
                  duration: 2,
                });
                setTimeout(() => {
                  navigate("/admin-page");
                }, 2000);
              }}
              customStyles={{
                backgroundColor: "var(--secondary-color-light-green)",
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AdminStoryDetailPage;
