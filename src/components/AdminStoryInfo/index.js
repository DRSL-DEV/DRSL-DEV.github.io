import styles from "./index.module.css";

const AdminStoryInfo = ({ title, author, profileImg, date, content, tags, status, adminUpdateTime }) => {
  return (
    <div className={styles["story-info-container"]}>
      <div className={styles["post-info-top"]}>
        <div className={styles["user-info"]}>
          <img src={profileImg} alt="profile image" />
          <div className={styles["user-info-text"]}>
            <h6>{author}</h6>
            <h6>{date}</h6>
          </div>
        </div>
        {/* Conditional display for if there is an admin update */}
        
        {adminUpdateTime != undefined && (
          <div className={styles["post-admin-update-time-container"]}>
            <h6>{"Last admin update: " + adminUpdateTime}</h6>
          </div>)}
        
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
