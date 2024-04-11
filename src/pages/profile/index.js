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
import { fetchStoryListByIdList } from "../../data/features/storyListSlice";

export const ProfilePage = () => {
  const { TabPane } = Tabs;
  const location = useLocation();
  const dispatch = useDispatch();
  const authorInfo = location.state?.authorInfo;
  const currentUser = useSelector((state) => state.userInfo.user);
  const bookMarkedPostList = useSelector(
    (state) => state.storyList.bookmarkedStoryList
  );
  const [activeTab, setActiveTab] = useState(
    sessionStorage.getItem("profileTab") || "2"
  );

  const profileInfo = authorInfo || currentUser;

  const {
    username: userName,
    profileName = "Set a display name?",
    biography: userBio = "When you add a bio, it'll show up here",
    tagsOfInterest: interestedTopics = [],
    bookmarks = [],
    postedStoriesID: postedStories = [],
  } = profileInfo;

  useEffect(() => {
    dispatch(fetchStoryListByIdList(bookmarks));
  }, [dispatch, profileInfo.uid]);

  return (
    <div className="profile-page-container">
      <ProfileHeader
        profileBanner={profile_bg}
        profileImg={profile}
        userName={userName}
        profileName={profileName}
        bio={userBio}
        topics={interestedTopics}
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
            tab={<span className={styles["tab-title"]}>Bookmarked</span>}
            key="1"
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
          <TabPane
            tab={<span className={styles["tab-title"]}>My Stories</span>}
            key="2"
          >
            <Link to="/create-story">
              <img
                className={styles["add-post-card"]}
                src={add_post}
                alt="add post"
              />
            </Link>
            <div className={styles["card-container"]}>
              {!!postedStories.length &&
                postedStories.map((story, index) => (
                  <Card key={index} title={story} type="user-story" />
                ))}
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
