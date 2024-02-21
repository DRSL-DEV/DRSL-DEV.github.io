import styles from "./index.module.css";
import arrow_right from "../../assets/icons/arrow_right.svg";

const TextCard = ({ title, previewContent, author, pfpSource, date }) => {
  return (
    <div className={styles["storypost-card"]}>
      <div className={styles["textpost-content"]}>
        <h2>{title}</h2>
        <p>{previewContent}</p>
      </div>

      <div className={styles["user-info"]}>
        <img
          className={styles["profile-pic"]}
          alt="Profile pic"
          src={pfpSource}
        />
        <div className={styles["post-info"]}>
          <div className={styles.username}>{author}</div>
          <div className={styles["post-date"]}>{date}</div>
        </div>
      </div>

      <div className={styles["card-footer"]}>
        <button>
          <img src={arrow_right} alt="right arrow" />
        </button>
      </div>
    </div>
  );
};

export default TextCard;
