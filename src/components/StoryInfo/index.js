import styles from "./index.module.css";
import { convertTimeFormatMDY } from "../../utils/dateFormat";

const StoryInfo = ({
  title,
  author,
  profileImg,
  date,
  content,
  tags,
  anonymous,
}) => {
  return (
    <div className={styles["story-info-container"]}>
      <div className={styles["post-info-top"]}>
        <div className={styles["user-info"]}>
          <img src={profileImg} alt="profile image" />
          <div className={styles["user-info-text"]}>
            <h6>{anonymous ? "anonymous" : author}</h6>
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
