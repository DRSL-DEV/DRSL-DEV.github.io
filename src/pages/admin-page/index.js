import styles from "./index.module.css";
import { useState } from "react";
import AdminCard from "../../components/AdminCard";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Tabs } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { subscribeToStoryList } from "../../data/features/storyListSlice";

const AdminPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storyList = useSelector((state) => state.storyList.storyList);
  const status = useSelector((state) => state.storyList.status);
  const [activeTab, setActiveTab] = useState(
    sessionStorage.getItem("adminActiveTab") || "1"
  );

  const { TabPane } = Tabs;

  useEffect(() => {
    const unsubscribe = dispatch(subscribeToStoryList());

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <div className={`page-container ${styles["homepage-container"]}`}>
      <main>
        <h1 className={styles["admin-h1"]}>Welcome, Admin!</h1>
        <div className={styles["profile-tab-container"]}>
          <Tabs
            defaultActiveKey={activeTab}
            onChange={(key) => {
              setActiveTab(key);
              sessionStorage.setItem("adminActiveTab", key);
            }}
            centered
          >
            <TabPane
              tab={
                <span className={styles["tab-title"]}>Pending Approval</span>
              }
              key="1"
            >
              <div className={styles["card-container"]}>
                {!!storyList.length &&
                  storyList
                    .filter(
                      (story) =>
                        story.postType === "user" && story.status === "pending"
                    )
                    .map((story, index) => (
                      <AdminCard key={index} storyInfo={story} />
                    ))}
              </div>
            </TabPane>
            <TabPane
              tab={<span className={styles["tab-title"]}>Approved</span>}
              key="2"
            >
              <div className={styles["card-container"]}>
                {!!storyList.length &&
                  storyList
                    .filter(
                      (story) =>
                        story.postType === "user" && story.status === "approved"
                    )
                    .map((story, index) => (
                      <AdminCard key={index} storyInfo={story} />
                    ))}
              </div>
            </TabPane>
            <TabPane
              tab={<span className={styles["tab-title"]}>Rejected</span>}
              key="3"
            >
              <div className={styles["card-container"]}>
                {!!storyList.length &&
                  storyList
                    .filter(
                      (story) =>
                        story.postType === "user" && story.status === "rejected"
                    )
                    .map((story, index) => (
                      <AdminCard key={index} storyInfo={story} />
                    ))}
              </div>
            </TabPane>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
