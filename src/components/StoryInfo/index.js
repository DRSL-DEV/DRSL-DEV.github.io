import profile from "../../assets/images/profile.png";
import styles from "./index.module.css";

const StoryInfo = () => {
  return (
    <div className={styles["story-info-container"]}>
      <div className={styles["profile-cropper"]}>
        <img src={profile} alt="profile image" />
      </div>
      <div className={styles["info-text"]}>
        <h6>username</h6>
        <h6>02/13/2023</h6>
      </div>
    </div>
  );
};

export default StoryInfo;
