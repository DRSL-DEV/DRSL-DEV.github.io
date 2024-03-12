import styles from "./index.module.css";
import arrow_right from "../../assets/icons/arrow_right.svg";
import { useNavigate } from "react-router-dom";

const AdminCard = ({ title, content, author, imgSrc, type }) => {
  const navigate = useNavigate();

  return (
    <div className={`${styles["customized-card"]} ${styles[type]}`}>
      <div className={styles["customized-card-image"]}>
        <img src={imgSrc} alt="" />
      </div>
      <div className={styles["customized-card-content"]}>
        <h2>{title}</h2>
        <p>{content}</p>
        <div className={styles["customized-card-footer"]}>
          <div>{author}</div>
          <button onClick={() => navigate("/admin-page/admin-story-detail")}>
            <img src={arrow_right} alt="right arrow" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminCard;
