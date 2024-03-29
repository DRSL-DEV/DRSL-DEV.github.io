import { useState } from "react";
import like_unfilled from "../../assets/icons/like_unfilled.svg";
import like_filled from "../../assets/icons/like_filled.svg";
import styles from "./index.module.css";

const LikeButton = () => {
  const [isFilled, setIsFilled] = useState(false);
  const handleClick = () => {
    setIsFilled(!isFilled);
  };

  return (
    <button onClick={handleClick} className={styles.button}>
      {isFilled ? (
        <img src={like_filled} alt="liked" />
      ) : (
        <img src={like_unfilled} alt="like button" />
      )}
    </button>
  );
};

export default LikeButton;
