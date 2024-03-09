import styles from "./index.module.css";
import more_icon from "../../assets/icons/more_icon.svg"
import { Link } from "react-router-dom";

const ProfileHeader = ({profileBanner, profileImg, userName, profileName, bio, topics}) =>{
    return(
        <div className={styles["user-profile-container"]}>
            <img className={styles["profile-banner"]} src={profileBanner} alt="background" />
            <div className={styles["profile-top"]}>
                <p className={styles["user-name"]}>@{userName}</p>
                <img className={styles["profile-img"]} src={profileImg} alt="profile" />
                <Link to="/profile/profile-edit">
                    <img className={styles["edit-icon"]} src={more_icon} alt="edit" />
                </Link>
            </div>
            <h2 className={styles["profile-name"]}>{profileName}</h2>
            <p className={styles["user-bio"]}>{bio}</p>
            <div className={styles["topic-container"]}>
                <p className={styles["topic-title"]}>Topics of Interest</p>
                <p className={styles["user-topic"]}>
                    {topics.join(", ")}
                </p>
            </div>
        </div>
    );
};
export default ProfileHeader;