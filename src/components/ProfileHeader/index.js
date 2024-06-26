import styles from "./index.module.css";
import edit_profile from "../../assets/icons/edit_icon.svg";
import { Link } from "react-router-dom";
import defaultProfile from "../../assets/images/profile.png"
import defaultBanner from "../../assets/images/default_banner.png"

const ProfileHeader = ({
  profileBanner,
  profileImg,
  userName,
  profileName,
  bio,
  topics,
  editable,
}) => {
  return (
    <div className={styles["user-profile-container"]}>
      <img
        className={styles["profile-banner"]}
        src={profileBanner || defaultBanner}
        alt="background"
      />
      <div className={styles["profile-top"]}>
        <img className={styles["profile-img"]} src={profileImg || defaultProfile} alt="profile" />
      </div>
      <div className={styles["profile-edit"]}>
        <h2 className={styles["profile-name"]}>{profileName}</h2>
        {editable && (
          <Link to="/profile/profile-edit">
            <img
              className={styles["edit-profile-button"]}
              src={edit_profile}
              alt="edit profile"
            />
          </Link>
        )}
      </div>
      <p className={styles["user-name"]}>@{userName}</p>
      <p className={styles["user-bio"]}>{bio}</p>
      <div className={styles["topic-container"]}>
        <p className={styles["topic-title"]}>Topics of Interest</p>
        <p className={styles["user-topic"]}>{topics.join(", ")}</p>
      </div>
    </div>
  );
};
export default ProfileHeader;
