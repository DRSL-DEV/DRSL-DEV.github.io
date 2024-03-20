import styles from "./index.module.css";
import arrow_right from "../../assets/icons/arrow_right.svg";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const Card = ({ title, content, userId, type, imgSrc, postId }) => {
  const navigate = useNavigate();

  // Fetch the user's name from another collection using userId
  // This is just a placeholder. Replace it with actual code.
  // const author = fetchUserName(userId);

  // Use the first item in the media array as the image source
  // const imgSrc = media[0];

  return (
    <Link to={`/story/${title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "")}`}
      state = {{postId:postId}}>
      <div className={`${styles["customized-card"]} ${styles[type]}`}>
        <div className={styles["customized-card-image"]}>
          <img src={imgSrc} alt="" />
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
    </Link>
  );
};


export default Card;
