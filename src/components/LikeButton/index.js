import { useEffect, useState, useCallback } from "react";
import like_unfilled from "../../assets/icons/like_unfilled.svg";
import like_filled from "../../assets/icons/like_filled.svg";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";
import { toggleBookmark } from "../../data/features/bookmarkSlice";
import { useDispatch } from "react-redux";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const LikeButton = ({postId}) => {
  const [isFilled, setIsFilled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchUserBookmarks = async () => {
      if (currentUser) {
        try {
          const userDocRef = doc(db, "user", currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            const userBookmarks = userData.bookmarks || [];

            if (userBookmarks.includes(postId)) {
              setIsFilled(true);
            }
          }
        } catch (error) {
          console.error("Error fetching user bookmarks:", error);
        }
      }
    };
    fetchUserBookmarks();
  }, [currentUser, postId]);

  const handleBookmark = useCallback(() => {
    if (!currentUser) {
      navigate("/login");
    } else {
      setIsFilled(!isFilled);
      dispatch(toggleBookmark(postId));
    }
  }, [currentUser, navigate, isFilled, dispatch, postId]);

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
