import styles from "./index.module.css";
import { useDispatch } from "react-redux";
import { signOutUser } from "../../data/features/userInfoSlice";
import { useNavigate } from "react-router-dom";
import { message } from "antd";


const ProfileHeader = ({
  profileBanner,
  profileImg,
  userName,
  profileName,
  bio,
  topics,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(signOutUser());
    localStorage.removeItem("userInfo");
    navigate("/");
    message.success({
      content: `Successfully signed out!`,
      duration: 2,
    });
  };

  return (
    <div className={styles["user-profile-container"]}>
      <img
        className={styles["profile-banner"]}
        src={profileBanner}
        alt="background"
      />
      <div className={styles["profile-top"]}>
        <p className={styles["user-name"]}>@{userName}</p>
        <img className={styles["profile-img"]} src={profileImg} alt="profile" />
        <div onClick={handleLogOut} className={styles["log-out"]}>
          Log out
        </div>
      </div>
      <h2 className={styles["profile-name"]}>{profileName}</h2>
      <p className={styles["user-bio"]}>{bio}</p>
      <div className={styles["topic-container"]}>
        <p className={styles["topic-title"]}>Topics of Interest</p>
        <p className={styles["user-topic"]}>{topics.join(", ")}</p>
      </div>
    </div>
  );
};
export default ProfileHeader;
