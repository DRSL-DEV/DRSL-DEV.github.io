import styles from "./index.module.css";
import { useState } from "react";
import arrow_right from "../../assets/icons/arrow_right.svg";
import defaultImg from "../../assets/images/default_media.png";
import { Link } from "react-router-dom";

const Card = ({ title, content, userId, type, imgSrc, postId }) => {
  const [hasError, setHasError] = useState(false);
  return (
    <>
      {type === "lab-story" ? (
        <div className={`${styles["customized-card"]} ${styles[type]}`}>
          <div className={styles["customized-card-image"]}>
            <img
              src={hasError ? defaultImg : imgSrc}
              alt=""
              onError={() => setHasError(true)}
            />
          </div>
          <div className={styles["customized-card-content"]}>
            <h2>{title}</h2>
            <p>{content}</p>
            <div className={styles["customized-card-footer"]}>
              <div>{userId}</div>
              <button>
                <img src={arrow_right} alt="right arrow" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Link
          to={`/story/${title
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "")}`}
          state={{ postId: postId }}
        >
          <div className={`${styles["customized-card"]} ${styles[type]}`}>
            {imgSrc && (
              <div className={styles["customized-card-image"]}>
                <img
                  src={hasError ? defaultImg : imgSrc}
                  alt=""
                  onError={() => setHasError(true)}
                />
              </div>
            )}
            <div className={styles["customized-card-content"]}>
              <h2>{title}</h2>
              <p>{content}</p>
              <div className={styles["customized-card-footer"]}>
                <div>{userId}</div>
                <button>
                  <img src={arrow_right} alt="right arrow" />
                </button>
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default Card;
