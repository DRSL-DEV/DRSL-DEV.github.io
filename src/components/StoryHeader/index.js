import styles from "./index.module.css";
import link_icon from "../../assets/icons/link_icon.svg";
import LikeButton from "../LikeButton";
import back_arrow from "../../assets/icons/back_arrow.svg";
import { Link } from "react-router-dom";

const StoryHeader = () => {
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

  return (
    <div className={styles["story-header-container"]}>
      <div className={styles["icon-container"]}>
        <img onClick={handleShare} src={link_icon} alt="share" />
        <LikeButton />
      </div>

      <div className={styles["heading-container"]}>
        <Link to="/story">
          <img src={back_arrow} alt="back" />
        </Link>
        <h1>Personal Stories</h1>
      </div>
    </div>
  );
};

export default StoryHeader;
