import styles from "./index.module.css";
import ProfileHeader from "../../components/ProfileHeader";
import profile_bg from "../../assets/images/profile_bg.png";
import profile from "../../assets/images/profile.png";
import { Tabs } from 'antd';
import Card from "../../components/Card";
import addButton from "../../assets/icons/add_post_icon.svg";
import { Link } from "react-router-dom";


export const ProfilePage = () => {
  const { TabPane } = Tabs;

  const userName = 'Stories_with_Jada'
  const profileName = 'Jada Williams'
  const userBio = "Journalist and community activist that is interested in learning, sharing, expanding community knowledge about narratives in Metro Detroit."
  const interestedTopics = ["Communities & Livelihoods", "Environment & Ecology", "Indigenous History"]

  const bookMarkedPostTitles = ['Title1', 'Title2']
  const postedStories = ['Story1', 'Story2']
  const friends = ['User1', 'User2', 'User3']

  return <div className="profile-page-container">

    <ProfileHeader
      profileBanner = {profile_bg}
      profileImg = {profile}
      userName = {userName}
      profileName = {profileName}
      bio = {userBio}
      topics = {interestedTopics}
    />

    <div className={styles["profile-tab-container"]}>
      <Tabs defaultActiveKey="2" centered>
          <TabPane tab={<span className={styles["tab-title"]}>Bookmarked</span>} key="1">
            <div className={styles["card-container"]}>
              {bookMarkedPostTitles.map((title, index) => (
                  <Card key={index}
                    title = {title}
                    type = "lab-story"
                  />
              ))}
            </div>
          </TabPane>
          <TabPane tab={<span className={styles["tab-title"]}>My Stories</span>} key="2">
            <div className={styles["card-container"]}>
              {postedStories.map((story, index) => (
                  <Card key={index}
                    title = {story}
                    type = "user-story"
                  />
              ))}
            </div>
          </TabPane>
          <TabPane tab={<span className={styles["tab-title"]}>Connections</span>} key="3">
            <div className={styles["card-container"]}>
                {friends.map((friend, index) => (
                  <Card key={index}
                    title = {friend}
                    type = "user-profile"
                  />
              ))}
            </div>
          </TabPane>
      </Tabs>

      <div>
        <Link to="/create-story">
          <img className={styles["add-post-button"]} src={addButton} alt="create a new post" />
        </Link>
      </div>
    </div>
  </div>;
};

export default ProfilePage;
