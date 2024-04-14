import { useState } from "react";
import like_unfilled from "../../assets/icons/like_unfilled.svg";
import like_filled from "../../assets/icons/like_filled.svg";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../data/features/userInfoSlice";

const LikeButton = ({ postId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userInfo.user);
  const [isFilled, setIsFilled] = useState(
    (currentUser && currentUser.bookmarks?.includes(postId)) || false
  );

  const handleBookmark = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    try {
      let newBookmarks = [];
      if (currentUser.bookmarks) {
        if (currentUser.bookmarks.includes(postId)) {
          newBookmarks = currentUser.bookmarks.filter((id) => id !== postId);
        } else {
          newBookmarks = [...currentUser.bookmarks, postId];
        }
      } else {
        newBookmarks = [postId];
      }

      dispatch(
        updateUser({
          userDetails: { bookmarks: newBookmarks },
          uid: currentUser.uid,
        })
      ).then((result) => {
        if (result.meta.requestStatus === "fulfilled") {
          localStorage.setItem(
            "userInfo",
            JSON.stringify({
              ...JSON.parse(localStorage.getItem("userInfo")),
              bookmarks: newBookmarks,
            })
          );
          setIsFilled(!isFilled);
        }
      });
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
  };

  return (
    <button onClick={handleBookmark} className={styles.button}>
      {isFilled ? (
        <img src={like_filled} alt="liked" />
      ) : (
        <img src={like_unfilled} alt="like button" />
      )}
    </button>
  );
};

export default LikeButton;
