import styles from "./index.module.css";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Input, Checkbox, Upload, Select, message } from "antd";
import googleIcon from "../../assets/icons/Google icon.svg";
import Button from "../../components/Button";
import PageHeader from "../../components/PageHeader";
import PrimaryButton from "../../components/PrimaryButton";
import { updateUser } from "../../data/features/userInfoSlice";
import ImgCrop from "antd-img-crop";
import { getAuth, sendPasswordResetEmail, deleteUser } from "firebase/auth";
import { tagList } from "../../constants/constants";
import { uploadFile } from "../../data/features/fileUploadSlice";
import defaultProfile from "../../assets/images/profile.png"
import defaultBanner from "../../assets/images/default_banner.png"

const EditProfilePage = () => {
  const currentUser = useSelector((state) => state.userInfo.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedTags, setSelectedTags] = useState(currentUser.tagsOfInterest);
  const allowedImgTypes = [
    "image/jpeg",
    "image/png",
  ];

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  // const defaultProfile = "https://firebasestorage.googleapis.com/v0/b/detroit-river-story.appspot.com/o/user%2Fprofile%2Fprofile.png?alt=media&token=9014aaaf-8bd4-4d71-99bf-383c74961057"
  // const defaultBanner = "https://firebasestorage.googleapis.com/v0/b/detroit-river-story.appspot.com/o/user%2Fbanner%2Fdefault_banner.png?alt=media&token=75a934a6-ea7f-4ecc-a1f4-54e3290206db"
  const [profileImg, setProfileImg] = useState(currentUser.profileImage ? [{url:currentUser.profileImage,uid:1}] : [{url:defaultProfile,uid:1}]);
  const [banner, setBanner] = useState(currentUser.profileBanner ? [{url:currentUser.profileBanner,uid:1}] : [{url:defaultBanner,uid:1}]);

  const onPreview = async () => {
    //const profileURL = profileImg === null || profileImg === defaultProfile ? defaultProfile : profileImg;
    const imgWindow = window.open(defaultProfile);
    if (imgWindow) {
      imgWindow.document.write(`<img src="${profileImg}" alt="Profile Preview"/>`);
    } else {
      console.error("Failed to open image preview window.");
    }
  };

  const fileUploadProps = {
    beforeUpload: (file) => {
      if (allowedImgTypes.includes(file.type)) {
      } else {
        message.error({
          content: "You can only upload image, video, or audio files!",
          duration: 2,
        });
        return Upload.LIST_IGNORE;
      }
      return false;
    },
  };

  const handleSave = async (values) => {
    let profileImage = currentUser.profileImage;
    let profileBanner = currentUser.profileBanner;
    if (profileImg.length > 0) {
      profileImage = await dispatch(
        uploadFile({
          fileName: profileImg[0]?.name,
          file: profileImg[0]?.originFileObj,
          folderPath: `user/profile`,
        })
      ).unwrap();
    }
  
    if (banner.length > 0) {
      profileBanner = await dispatch(
        uploadFile({
          fileName: banner[0]?.name,
          file: banner[0]?.originFileObj,
          folderPath: `user/banner`,
        })
      ).unwrap();
    }

    const userDetails = {
      email: values.email,
      username: values.userName,
      profileName: values.profileName,
      biography: values.userBio,
      phoneNumber: values.phoneNumber,
      anonymousSubmissionCheck: values.anonySubChk,
      tagsOfInterest: selectedTags,
      profileImage,
      profileBanner,
    };
    const userWithoutNullValues = Object.fromEntries(
      Object.entries(userDetails).filter(([key, value]) => value !== undefined)
    );
    dispatch(
      updateUser({ userDetails: userWithoutNullValues, uid: currentUser.uid })
    ).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        localStorage.setItem(
          "userInfo",
          JSON.stringify({ uid: currentUser.uid, ...userDetails })
        );
        navigate("/profile");
      } else {
        message.error({
          content: `There was an error: ${result.payload}`,
          duration: 8,
        });
      }
    });

  };

  const handlePasswordChange = (email) => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        message.success({
          content: `An email for changing your password has been sent to ${email}. Please check your inbox.`,
          duration: 6,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error code: ", errorCode);
        message.error({
          content: `There was a problem in sending the password reset email: ${errorMessage}`,
          duration: 5,
        });
      });
  };

  const handleDeleteAccount = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      deleteUser(user)
        .then(() => {
          message.success({
            content: `We are sad to loose you :'( Your account is successfully deleted`,
            duration: 6,
          });
          navigate("/");
        })
        .catch((error) => {
          // An error occurred while deleting the user's authentication
          console.error("Error deleting user authentication:", error.message);
        });
    } else {
      // No user is currently authenticated
      console.error("No user is currently authenticated.");
    }
  };

  return (
    <div className={`page-container ${styles["edit-profile-page-container"]}`}>
      <PageHeader title="Account Information" />
      <h3>Profile</h3>
      <Form
        initialValues={{
          userName: currentUser.username,
          profileName: currentUser.profileName,
          email: currentUser.email,
          userBio: currentUser.biography,
          phoneNumber: currentUser.phoneNumber,
          anonySubChk: !!currentUser.anonymousSubmissionCheck,
          interest: currentUser.tagsOfInterests || selectedTags,
        }}
        onFinish={handleSave}
        name="nest-messages"
        validateMessages={validateMessages}
        className={styles["edit-profile-form"]}
      >
        <div>
          <div className={styles["short-input-container"]}>
            <Form.Item
              name="userName"
              label="Username"
              rules={[{ required: true }]}
            >
              <Input className={styles["short-input"]} />
            </Form.Item>
            <Form.Item
              name="profileName"
              label="Profile Name"
              rules={[{ required: false }]}
            >
              <Input className={styles["short-input"]} />
            </Form.Item>
          </div>
          <Form.Item
            name="anonySubChk"
            label="Anonymous Submissions"
            valuePropName="checked"
            getValueFromEvent={(e) => e.target.checked}
          >
            <Checkbox className={styles["check-box"]}>
              <span>Optional: Have account displayed as anonymous.</span>
              <span>This can be changed at any time.</span>
            </Checkbox>
          </Form.Item>

          <Form.Item name="userBio" label="Biography">
            <Input.TextArea
              showCount
              maxLength={200}
              placeholder="Would you like to add a biography?"
            />
          </Form.Item>
        </div>
        <div className={styles["profile-images-input"]}>
          <div>
            <h3>Profile Photo</h3>
            <div className={styles["profile-upload"]}>
              <ImgCrop rotationSlider aspectSlider showReset>
                <Upload
                  listType="picture-card"
                  fileList={profileImg}
                  onChange={(info)=>setProfileImg(info.fileList)}
                  onPreview={onPreview}
                  // beforeUpload={() => false} // need more function in validating the uploaded file
                  {...fileUploadProps}
                >
                  {!profileImg.length && 'Upload'}
                </Upload>
              </ImgCrop>
            </div>
          </div>
          <div>
            <h3>Profile Banner</h3>
            <div className={styles["banner-upload"]}>
            <ImgCrop rotationSlider aspectSlider showReset
              aspect={2}>
                <Upload
                  listType="picture-card"
                  fileList={banner}
                  onChange={(info)=>setBanner(info.fileList)}
                  onPreview={onPreview}
                  {...fileUploadProps}
                >
                  {!banner.length && 'Upload'}
                </Upload>
              </ImgCrop>
            </div>
          </div>
        </div>

        <div>
          <h3>Tags of Interest</h3>
          <Form.Item name="interest" label="">
            <Select
              mode="multiple"
              placeholder="Please pick your topics"
              value={selectedTags}
              onChange={setSelectedTags}
              options={tagList}
            />
          </Form.Item>
        </div>

        <div>
          <h3>Personal Information</h3>
          <Form.Item name="email" label="Email" rules={[{ type: "email" }]}>
            <Input disabled={true} />
          </Form.Item>
          <Form.Item name="phoneNumber" label="Phone Number">
            <Input />
          </Form.Item>
          <p
            className={styles["change-password"]}
            href="#"
            onClick={() => handlePasswordChange(currentUser.email)}
          >
            I want to change my password
          </p>
        </div>

        <Form.Item>
          <PrimaryButton text="Save" htmlType="submit" />
          <PrimaryButton text="Delete Account" onClick={handleDeleteAccount}/>
        </Form.Item>
      </Form>

      <div className={styles["link-account-section"]}>
        <h3>Linked Accounts</h3>
        <div className={styles["account-link-countainer"]}>
          <img
            className={styles["login-icons"]}
            src={googleIcon}
            alt="google log in"
          />
          <h4>Google</h4>
          <Button
            customStyles={{ fontSize: "14px", width: "100px", height: "30px" }}
            text="Unlink"
          />
        </div>
      </div>
    </div>
  );
};
export default EditProfilePage;
