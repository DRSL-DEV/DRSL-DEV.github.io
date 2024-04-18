import styles from "./index.module.css";
import { useState } from "react";
import arrow_right from "../../assets/icons/arrow_right.svg";
import defaultImg from "../../assets/images/default_media.png";
import { Link } from "react-router-dom";

const Card = ({ title, content, userId, type, imgSrc, postId, status }) => {
  const [hasError, setHasError] = useState(false);
  return (
    <>
      {type === "partner" ? (
        <Link
          to={`/story/${postId}/${title
            ?.toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "")}`}
        >
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
            </div>
            <div className={styles["customized-card-footer"]}>
              <button>
                <img src={arrow_right} alt="right arrow" />
              </button>
            </div>
          </div>
        </Link>
      ) : (
        <Link
          to={`/story/${postId}/${title
            ?.toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "")}`}
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
            </div>
            <div className={styles["customized-card-footer"]}>
              {status ? (
                <span className={`${styles["story-status"]} ${styles[status]}`}>
                  {status.toUpperCase()}
                </span>
              ) : null}
              <button>
                <img src={arrow_right} alt="right arrow" />
              </button>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default Card;
