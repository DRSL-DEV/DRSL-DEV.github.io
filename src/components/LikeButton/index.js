import { useState, useCallback } from "react";
import like_unfilled from "../../assets/icons/like_unfilled.svg";
import like_filled from "../../assets/icons/like_filled.svg";
import styles from "./index.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LikeButton = () => {
  const [isFilled, setIsFilled] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.userInfo.user);

  const handleClick = useCallback(() => {
    // Check if user is logged in
    if (!user) {
      navigate("/login");
    } else {
      // Toggle like status
      setIsFilled(!isFilled);
    }
  }, [user, navigate, isFilled]);

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
