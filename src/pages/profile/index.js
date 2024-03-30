import styles from "./index.module.css";
import ProfileHeader from "../../components/ProfileHeader";
import profile_bg from "../../assets/images/profile_bg.png";
import profile from "../../assets/images/profile.png";
import add_post from "../../assets/icons/add_post_card.svg";
import { Tabs } from 'antd';
import Card from "../../components/Card";
import { Link } from "react-router-dom";
import {useSelector } from 'react-redux';



export const ProfilePage = () => {
  const { TabPane } = Tabs;
  const CurrentUser = useSelector((state) => state.userInfo.user);

  const userName = CurrentUser.username;
  const profileName = CurrentUser.profileName || "Set a display name?"
  const userBio = CurrentUser.biography || "When you add a bio, it'll show up here"
  const interestedTopics = CurrentUser.tagsOfInterest || ["Communities & Livelihoods", "Environment & Ecology", "Indigenous History"]

  const bookMarkedPostTitles = CurrentUser.bookMarkedPostID || ["No Stories to show, yet"]
  const postedStories = CurrentUser.postedStoriesID || ["Start your first story, by clicking the plus sign above!"]
  const friends = CurrentUser.friendsID || ["Time to make some friends!"]

  return <div className="profile-page-container">

    <ProfileHeader
      profileBanner={profile_bg}
      profileImg={profile}
      userName={userName}
      profileName={profileName}
      bio={userBio}
      topics={interestedTopics}
    />

    <div className={styles["profile-tab-container"]}>
      <Tabs defaultActiveKey="2" centered>
        <TabPane tab={<span className={styles["tab-title"]}>Bookmarked</span>} key="1">
          <div className={styles["card-container"]}>
            {bookMarkedPostTitles.map((title, index) => (
              <Card key={index}
                title={title}
                type="lab-story"
              />
            ))}
          </div>
        </TabPane>
        <TabPane tab={<span className={styles["tab-title"]}>My Stories</span>} key="2">
          <Link to="/create-story">
            <img className={styles["add-post-card"]} src={add_post} alt="add post" />
          </Link>
          <div className={styles["card-container"]}>
            {postedStories.map((story, index) => (
              <Card key={index}
                title={story}
                type="user-story"
              />
            ))}
          </div>
        </TabPane>
        <TabPane tab={<span className={styles["tab-title"]}>Connections</span>} key="3">
          <div className={styles["card-container"]}>
            {friends.map((friend, index) => (
              <Card key={index}
                title={friend}
                type="user-profile"
              />
            ))}
          </div>
        </TabPane>
      </Tabs>
    </div>
  </div>;
};

export default ProfilePage;
