import styles from "./index.module.css";
import arrow_right from "../../assets/icons/arrow_right.svg";
import { useNavigate } from "react-router-dom";

const AdminCard = ({ storyInfo }) => {
  const { user, title, content, media, postType } = storyInfo;
  const navigate = useNavigate();

  return (
    <div className={`${styles["customized-card"]} ${styles[postType]}`}>
      <div className={styles["customized-card-image"]}>
        {!!media.length && media[0] && <img src={media[0]} alt="" />}
      </div>
      <div className={styles["customized-card-content"]}>
        <h2>{title}</h2>
        <p>{content}</p>
        <div className={styles["customized-card-footer"]}>
          <div>{user}</div>
          <button
            onClick={() =>
              navigate(
                `/admin-page/admin-story-detail/${title
                  .toLowerCase()
                  .replace(/ /g, "-")
                  .replace(/[^\w-]+/g, "")}`,
                { state: { storyInfo } }
              )
            }
          >
            <img src={arrow_right} alt="right arrow" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminCard;
