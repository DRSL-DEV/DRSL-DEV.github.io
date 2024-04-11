import styles from "./index.module.css";
import { useEffect, useState } from "react";
import ProfileHeader from "../../components/ProfileHeader";
import profile_bg from "../../assets/images/profile_bg.png";
import profile from "../../assets/images/profile.png";
import add_post from "../../assets/icons/add_post_card.svg";
import { Tabs } from "antd";
import Card from "../../components/Card";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  fetchBookmarkedStorysByIds,
  fetchStorysByAuthorId,
} from "../../data/features/storyListSlice";

export const ProfilePage = () => {
  const { TabPane } = Tabs;
  const location = useLocation();
  const dispatch = useDispatch();
  const authorInfo = location.state?.authorInfo;
  const currentUser = useSelector((state) => state.userInfo.user);
  const bookMarkedPostList = useSelector(
    (state) => state.storyList.bookmarkedStoryList
  );
  const postedStoryList = useSelector(
    (state) => state.storyList.authorStoryList
  );
  const [activeTab, setActiveTab] = useState(
    sessionStorage.getItem("profileTab") || "1"
  );

  const profileInfo = authorInfo || {
    ...currentUser,
    profileName: currentUser.profileName || "Set a display name?",
    biography:
      currentUser.biography || "When you add a bio, it'll show up here",
  };

  const {
    username: userName,
    profileName,
    profileImage = profile,
    biography: userBio,
    tagsOfInterest: interestedTopics = [],
    bookmarks = [],
    uid: userId,
  } = profileInfo;

  useEffect(() => {
    dispatch(fetchBookmarkedStorysByIds(bookmarks));
    dispatch(fetchStorysByAuthorId(userId));
  }, [dispatch, userId]);

  return (
    <div className="profile-page-container">
      <ProfileHeader
        profileBanner={profile_bg}
        profileImg={profileImage}
        userName={userName}
        profileName={profileName}
        bio={userBio}
        topics={interestedTopics}
        editable={currentUser.uid === userId}
      />

      <div className={styles["profile-tab-container"]}>
        <Tabs
          defaultActiveKey={activeTab}
          onChange={(key) => {
            setActiveTab(key);
            sessionStorage.setItem("profileTab", key);
          }}
          centered
        >
          <TabPane
            tab={
              <span className={styles["tab-title"]}>
                {authorInfo ? "Stories" : "My Stories"}
              </span>
            }
            key="1"
          >
            <Link to="/create-story">
              <img
                className={styles["add-post-card"]}
                src={add_post}
                alt="add post"
              />
            </Link>
            <div className={styles["card-container"]}>
              {!!postedStoryList.length &&
                postedStoryList.map((post, index) => (
                  <Card
                    key={index}
                    title={post.title}
                    content={post.content}
                    postId={post.id}
                    author={post.userId}
                    type={post.postType}
                    imgSrc={post.media}
                  />
                ))}
            </div>
          </TabPane>
          <TabPane
            tab={<span className={styles["tab-title"]}>Bookmarked</span>}
            key="2"
          >
            <div className={styles["card-container"]}>
              {!!bookMarkedPostList.length &&
                bookMarkedPostList.map((post, index) => (
                  <Card
                    key={index}
                    title={post.title}
                    content={post.content}
                    postId={post.id}
                    author={post.userId}
                    type={post.postType}
                    imgSrc={post.media}
                  />
                ))}
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
