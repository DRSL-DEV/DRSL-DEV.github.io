import styles from "./index.module.css";
import AdminCard from "../../components/AdminCard";
import imgSrc from "../../assets/images/card_img.png";
import gallery_placeholder from "../../assets/images/home_gallery.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Tabs } from 'antd';

import profile_bg from "../../assets/images/profile_bg.png"; 
import profile from "../../assets/images/profile.png";

import { useSelector, useDispatch } from "react-redux";
import { fetchStoryList } from "../../data/features/storyListSlice";

const AdminPage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const storyList = useSelector((state) => state.storyList.storyList);
  const status = useSelector((state) => state.storyList.status);

  console.log("storyList", storyList);
  console.log("status", status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchStoryList());
    }
  }, [status, dispatch]);

  const mediaUrls = [
    gallery_placeholder,
    gallery_placeholder,
    gallery_placeholder,
  ];

  const { TabPane } = Tabs;

  const cardDetail1 = {
    title:'I loved the dogpark',
    content:'The dogpark here is so nice and I enjoy walking my dogs here every morning since 1989',
    author:'Molly Henry',
    type:'user-story',
    imgSrc: imgSrc
  }
  
  return (
    <div className={`page-container ${styles["homepage-container"]}`}>
      <main>
        <h1 className={styles["admin-h1"]}>Welcome, Admin!</h1>
        <div className={styles["profile-tab-container"]}>
      <Tabs defaultActiveKey="1" centered>
          <TabPane tab={<span className={styles["tab-title"]}>Pending Approval</span>} key="1">
            <div className={styles["card-container"]}>
                
                <AdminCard
                title="Support + Industry"
                content="A guide on how I created a growing and supportive community among Detroit’s busy automotive industry."
                author="Steven Henry"
                type="user-story"
                imgSrc={imgSrc}
                />
                 
                <AdminCard title = {cardDetail1.title}
                    content = {cardDetail1.content}
                    author = {cardDetail1.author}
                    type = {cardDetail1.type}
                    imgSrc = {cardDetail1.imgSrc}
                    />
                 
            
            </div>
          </TabPane>
          <TabPane tab={<span className={styles["tab-title"]}>Approved</span>} key="2">
            <div className={styles["card-container"]}>
               <AdminCard
                title="Support + Industry"
                content="A guide on how I created a growing and supportive community among Detroit’s busy automotive industry."
                author="Steven Henry"
                type="user-story"
                imgSrc={imgSrc}
                />
            </div>
          </TabPane>
          <TabPane tab={<span className={styles["tab-title"]}>Rejected</span>} key="3">
            <div className={styles["card-container"]}>
                <AdminCard
                title="Support + Industry"
                content="A guide on how I created a growing and supportive community among Detroit’s busy automotive industry."
                author="Steven Henry"
                type="user-story"
                imgSrc={imgSrc}
            />

            </div>
          </TabPane>
      </Tabs>


    </div> 
      </main>
    </div>
  );
};

export default AdminPage;
