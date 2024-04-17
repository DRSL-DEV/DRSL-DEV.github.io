import styles from "./index.module.css";
import profile from "../../assets/images/profile.png";
import { convertTimeFormatMDY } from "../../utils/dateFormat";
import { useNavigate } from "react-router-dom";

const StoryInfo = ({
  selectedPost: { title, submitTime: date, content, tags },
  authorInfo,
  authorInfo: {
    username: author,
    profileImage: profileImg,
    anonymousSubmissionCheck: anonymous,
  },
}) => {
  const navigate = useNavigate();
  return (
    <div className={styles["story-info-container"]}>
      <div className={styles["post-info-top"]}>
        <div
          className={styles["user-info"]}
          onClick={() =>
            !anonymous &&
            navigate(
              `/profile/${author
                .toLowerCase()
                .replace(/ /g, "-")
                .replace(/[^\w-]+/g, "")}`,
              { state: { authorInfo } }
            )
          }
        >
          <img
            src={anonymous || !profileImg ? profile : profileImg}
            alt="profile"
          />
          <div className={styles["user-info-text"]}>
            <h6>{anonymous ? "Anonymous" : author}</h6>
            <h6>{convertTimeFormatMDY(date)}</h6>
          </div>
        </div>
        <div className={styles["tag-container"]}>
          {tags &&
            tags.map((tag, index) => (
              <p className={styles["story-tag"]} key={index}>
                {tag}
              </p>
            ))}
        </div>
      </div>
      <h1 className={styles["story-title"]}>{title}</h1>
      <p className={styles["story-text"]}>{content}</p>
    </div>
  );
};

export default StoryInfo;
