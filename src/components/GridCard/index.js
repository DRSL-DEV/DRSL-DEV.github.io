import styles from "./index.module.css";
import { Link } from "react-router-dom";
import defaultImg from "../../assets/images/default_media.png";
import { useState } from "react";

const GridCard = ({ title, imgSrc, type, postId }) => {
  const [hasError, setHasError] = useState(false);


  return (
    <Link
      to={`/story/${title
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "")}`}
      state={{ postId: postId }}
    >
      <div className={styles["grid-card"]}>
        <div className={styles["grid-card-image"]}>
          <img 
            src={hasError ? defaultImg : imgSrc}
            alt=""
            onError={() => setHasError(true)}
          />
          <div className={styles["grid-card-content"]}>
            <h2>{title}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GridCard;
