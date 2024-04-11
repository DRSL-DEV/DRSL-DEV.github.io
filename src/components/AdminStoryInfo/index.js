import styles from "./index.module.css";
import profile from "../../assets/images/profile.png";

const AdminStoryInfo = ({
  title,
  username,
  profileImage,
  submitTime,
  content,
  tags,
  anonymous,
}) => {
  return (
    <div className={styles["story-info-container"]}>
      <div className={styles["post-info-top"]}>
        <div className={styles["user-info"]}>
          <img
            src={anonymous || !profileImage ? profile : profileImage}
            alt="profile"
          />
          <div className={styles["user-info-text"]}>
            <h3>{anonymous ? "Anonymous" : username}</h3>
            <h5>{submitTime}</h5>
          </div>
        </div>
        {/* Conditional display for if there is an admin update */}

        <div className={styles["tag-container"]}>
          {tags.map((tag, index) => (
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

export default AdminStoryInfo;
