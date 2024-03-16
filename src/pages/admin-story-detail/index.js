import image_placeholder from "../../assets/images/image_placeholder.png";
import PageHeader from "../../components/PageHeader";
import AdminStoryInfo from "../../components/AdminStoryInfo";
import LikeButton from "../../components/LikeButton";
import Button from "../../components/Button";
import link_icon from "../../assets/icons/link_icon.svg";
import profile from "../../assets/images/profile.png";
import { Carousel } from "antd";
import { useNavigate } from "react-router-dom";

import styles from "./index.module.css";
import firebase from "firebase/app";
import "firebase/firestore";
// import firebaseConfig from "../../Secrets";

const AdminStoryDetailPage = () => {
  const siteTitle = "Admin View";
  const date = "02/09/2024"; //display only if storyStatus is Pending
  const tags = ["tag1", "tag2", "tag3"];
  const author = "username";
  const approvalDate = "02/11/2024"; //display only if storyStatus is Approved
  const rejectDate = "02/10/2024"; //display only if storyStatus is Rejected
  const storyStatus = "Rejected"; //Pending, Approved, Rejected

  const contentTitle = `Title of Story that has the status of ${storyStatus}`;
  const mediaUrls = [image_placeholder, image_placeholder, image_placeholder];
  const storyContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magnis dis parturient montes nascetur ridiculus mus mauris. Pellentesque elit eget gravida cum sociis. Sit amet tellus cras adipiscing enim eu turpis egestas pretium. Sit amet porttitor eget dolor morbi non arcu risus quis. Amet risus nullam eget felis eget nunc lobortis mattis. Lacus suspendisse faucibus interdum posuere lorem ipsum. Sed tempus urna et pharetra. Et malesuada fames ac turpis egestas sed tempus urna. Eu scelerisque felis imperdiet proin fermentum leo vel orci. Scelerisque felis imperdiet proin fermentum leo. At tellus at urna condimentum mattis. Mauris cursus mattis molestie a iaculis at erat pellentesque adipiscing. Non odio euismod lacinia at quis risus sed. Ultrices vitae auctor eu augue ut lectus arcu. Viverra suspendisse potenti nullam ac tortor. Pulvinar sapien et ligula ullamcorper malesuada proin. Donec massa sapien faucibus et. Phasellus vestibulum lorem sed risus ultricies tristique nulla. Risus nec feugiat in fermentum posuere urna nec. Nisi est sit amet facilisis. Integer enim neque volutpat ac. Enim neque volutpat ac tincidunt vitae semper quis lectus nulla. Porttitor rhoncus dolor purus non enim praesent. Malesuada fames ac turpis egestas. Nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue. Non sodales neque sodales ut etiam sit amet nisl purus. Etiam non quam lacus suspendisse. Sit amet commodo nulla facilisi nullam vehicula ipsum a. Ac ut consequat semper viverra nam libero justo. Ultrices dui sapien eget mi proin. Justo laoreet sit amet cursus sit amet dictum sit amet. Mattis pellentesque id nibh tortor.";
  const navigate = useNavigate();

  const handleShare = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        alert("Link copied to clipboard");
      })
      .catch((error) => {
        console.error("Error copying link to clipboard: ", error);
      });
  };

  return (
    <div className={`page-container ${styles["story-detail-page-container"]}`}>
      <div>
        <img
          className={styles["share-icon"]}
          onClick={handleShare}
          src={link_icon}
          alt="share"
        />
      </div>
      <div className={styles["story-title"]}>
        <PageHeader title={siteTitle} />
      </div>
      <Carousel className={styles.carousel} autoplay>
        {mediaUrls.map((mediaUrl, index) => (
          <div>
            <img
              className={styles["story-image-gallery"]}
              key={index}
              src={mediaUrl}
              alt="post media"
            />
          </div>
        ))}
      </Carousel>
      <AdminStoryInfo
        title={contentTitle}
        content={storyContent}
        author={author}
        profileImg={profile}
        date={date}
        tags={tags}
        className={styles["story-info-resize"]}
        status = {storyStatus}
        adminUpdateTime = {approvalDate}
      />

      <div className={styles["button-container"]}>
        <div className={styles["rejection-container"]}>
          <div className={styles["rejection-header-container"]}>
            <div className={styles["rejection-header-text"]}>Admin Comment on 14:23pm, 3/23/2023</div>
          </div>
          <div className={styles["rejection-content-container"]}>
            <div className={styles["rejection-content-text"]}>
              attis molestie a iaculis at erat pellentesque adipiscing. Non odio euismod lacinia 
              at quis risus sed. Ultrices vitae auctor eu augue ut lectus arcu. Viverra suspendiss
              e potenti nullam ac tortor. odio euismod lacinia at quis risus sed. Ultrices vitae odio 
              euismod lacinia at quis risus sed. Ultrices vita.
              attis molestie a iaculis at erat pellentesque adipiscing. Non odio euismod lacinia 
              at quis risus sed. Ultrices vitae auctor eu augue ut lectus arcu. Viverra suspendiss
              e potenti nullam ac tortor. odio euismod lacinia at quis risus sed. Ultrices vitae odio 
              euismod lacinia at quis risus sed. Ultrices vita.
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles["button-container"]}>
        {/* conditional rendering of buttons - display reject and approve if pending;
        display reject if Approved
        display approve if Rejected */}
        {storyStatus === "Pending" && (
          <>
            <Button
              text="Reject"
              handleOnClick={() => navigate("/admin-page/admin-reject-form")}
              customStyles={{
                backgroundColor: "rgba(255, 156, 150, 0.75)",
              }}
              className={styles["reject-button"]}
            />
            <Button 
              text="Approve" 
              handleOnClick={() => navigate("/admin-page/admin-approve-action")} 
              customStyles={{
                backgroundColor: "rgba(146, 187, 95, 0.75)",
              }}
            />
          </>
        )}
        {storyStatus === "Approved" && (
          <Button
            text="Reject"
            handleOnClick={() => navigate("/admin-page/admin-reject-form")}
            customStyles={{
              backgroundColor: "rgba(255, 156, 150, 0.75)",
            }}
            className={styles["reject-button"]}
          />
        )}
        {storyStatus === "Rejected" && (
          <>
            <Button 
            text="Edit Comment" 
            handleOnClick={() => navigate("/admin-page")} 
            />
            <Button 
            text="Approve" 
            handleOnClick={() => navigate("/admin-page")} 
            customStyles={{
              backgroundColor: "rgba(146, 187, 95, 0.75)",
            }}
            />
          </>
        )}
        </div>
      
      
    </div>
  );
};

export default AdminStoryDetailPage;