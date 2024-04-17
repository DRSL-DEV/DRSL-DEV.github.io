import styles from "./index.module.css";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Checkbox,
  Upload,
  Select,
  message,
  Modal,
  // Button,
} from "antd";
import googleIcon from "../../assets/icons/Google icon.svg";
import Button from "../../components/Button";
import PageHeader from "../../components/PageHeader";
import PrimaryButton from "../../components/PrimaryButton";
import { updateUser, deletUser } from "../../data/features/userInfoSlice";
import ImgCrop from "antd-img-crop";
import {
  getAuth,
  sendPasswordResetEmail,
  deleteUser,
  signOut,
} from "firebase/auth";
import { tagList } from "../../constants/constants";
import { uploadFile, deleteFile } from "../../data/features/fileUploadSlice";
import defaultProfile from "../../assets/images/profile.png";
import defaultBanner from "../../assets/images/default_banner.png";

const EditProfilePage = () => {
  const currentUser = useSelector((state) => state.userInfo.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedTags, setSelectedTags] = useState(
    currentUser ? currentUser.tagsOfInterest : []
  );
  const allowedImgTypes = ["image/jpeg", "image/png"];
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

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

  const [profileImg, setProfileImg] = useState(
    // uploaded:  0 or this field not exist (null): image is not uploaded yet, need to be uploaded
    //            1 image is already uploaded, may need to be removed
    //            2 default image, do not need to upload/remove
    currentUser?.profileImage
      ? [{ url: currentUser.profileImage, uid: 1, uploaded: 1 }]
      : [{ url: defaultProfile, uid: 1, uploaded: 2 }]
  );
  const [banner, setBanner] = useState(
    currentUser?.profileBanner
      ? [{ url: currentUser.profileBanner, uid: 1, uploaded: 1 }]
      : [{ url: defaultBanner, uid: 1, uploaded: 2 }]
  );

  const onPreview = async () => {
    //const profileURL = profileImg === null || profileImg === defaultProfile ? defaultProfile : profileImg;
    const imgWindow = window.open(defaultProfile);
    if (imgWindow) {
      imgWindow.document.write(
        `<img src="${profileImg}" alt="Profile Preview"/>`
      );
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
    const prevProfileImg = currentUser.profileImage;
    const prevBanner = currentUser.profileBanner;

    let newProfileImg = null;
    let newBanner = null;

    try {
      if (profileImg.length) {
        // if profileImg is not empty
        if (!profileImg[0].uploaded) {
          // if profileImg is not uploaded
          newProfileImg = await dispatch(
            uploadFile({
              fileName: profileImg[0]?.name,
              file: profileImg[0]?.originFileObj,
              folderPath: `user/profile`,
            })
          ).unwrap();
        } else if (profileImg[0].uploaded === 1) {
          // if profileImg is already uploaded
          newProfileImg = prevProfileImg;
        }

        if (
          // if user uploaded a new profile image, delete the previous one
          prevProfileImg &&
          newProfileImg &&
          newProfileImg !== prevProfileImg
        ) {
          dispatch(deleteFile(prevProfileImg));
          newProfileImg = null;
        }
      } else if (prevProfileImg) {
        // if user delete the current image, delete from firestore storage
        dispatch(deleteFile(prevProfileImg));
      }

      if (banner.length) {
        if (!banner[0].uploaded) {
          newBanner = await dispatch(
            uploadFile({
              fileName: banner[0]?.name,
              file: banner[0]?.originFileObj,
              folderPath: `user/banner`,
            })
          ).unwrap();
        } else if (banner[0].uploaded === 1) {
          newBanner = prevBanner;
        }

        if (prevBanner && newBanner && newBanner !== prevBanner) {
          dispatch(deleteFile(prevBanner));
          newBanner = null;
        }
      } else if (prevBanner) {
        dispatch(deleteFile(prevBanner));
      }

      const userDetails = {
        email: values.email,
        username: values.userName,
        profileName: values.profileName,
        biography: values.userBio,
        phoneNumber: values.phoneNumber,
        anonymousSubmissionCheck: values.anonySubChk,
        tagsOfInterest: selectedTags,
        profileImage: newProfileImg,
        profileBanner: newBanner,
      };
      const userWithoutNullValues = Object.fromEntries(
        Object.entries(userDetails).filter(
          ([key, value]) => value !== undefined
        )
      );
      dispatch(
        updateUser({
          userDetails: userWithoutNullValues,
          uid: currentUser.uid,
        })
      ).then((result) => {
        if (result.meta.requestStatus === "fulfilled") {
          localStorage.setItem(
            "userInfo",
            JSON.stringify({ uid: currentUser.uid, ...userDetails })
          );

          message.success({
            content:
              "Profile updated successfully! You will be redirected back to the profile page shortly",
            duration: 2,
          });
          setTimeout(() => {
            navigate("/profile");
          }, 2000);
        } else {
          message.error({
            content: "Failed to update profile.",
            duration: 2,
          });
        }
      });
    } catch (error) {}
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
    setDeleteModalVisible(false);
    dispatch(deletUser())
      .then(() => {
        message.success({
          content: `Accoutn has been successfully deleted!`,
          duration: 2,
        });

        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        console.log("Error deleting user:", error);
      });
  };

  // const handleDeleteAccount = () => {
  //   const auth = getAuth();
  //   const user = auth.currentUser;

  //   if (user) {
  //     deleteUser(user)
  //       .then(() => {
  //         dispatch(clearUser());
  //         signOut(auth)
  //           .then(() => {
  //             // User successfully logged out
  //             navigate("/");
  //           })
  //           .catch((error) => {
  //             console.error("Error signing out:", error.message);
  //           });
  //       })
  //       .catch((error) => {
  //         console.error("Error deleting user account:", error.message);
  //       });
  //   } else {
  //     console.error("No user is currently authenticated.");
  //   }
  // };

  return (
    <div className={`page-container ${styles["edit-profile-page-container"]}`}>
      <PageHeader title="Account Information" />
      <h3>Profile</h3>
      <Form
        initialValues={{
          userName: currentUser?.username,
          profileName: currentUser?.profileName,
          email: currentUser?.email,
          userBio: currentUser?.biography,
          phoneNumber: currentUser?.phoneNumber,
          anonySubChk: !!currentUser?.anonymousSubmissionCheck,
          interest: currentUser?.tagsOfInterests || selectedTags,
        }}
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
                  onChange={(info) => setProfileImg(info.fileList)}
                  onPreview={onPreview}
                  // beforeUpload={() => false} // need more function in validating the uploaded file
                  {...fileUploadProps}
                >
                  {!profileImg.length && "Upload"}
                </Upload>
              </ImgCrop>
            </div>
          </div>
          <div>
            <h3>Profile Banner</h3>
            <div className={styles["banner-upload"]}>
              <ImgCrop rotationSlider aspectSlider showReset aspect={2}>
                <Upload
                  listType="picture-card"
                  fileList={banner}
                  onChange={(info) => setBanner(info.fileList)}
                  onPreview={onPreview}
                  {...fileUploadProps}
                >
                  {!banner.length && "Upload"}
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

        <div className={styles["action-button-container"]}>
          <Button
            text="Save"
            htmlType="submit"
            customStyles={{
              width: "310px",
              height: "45px",
              borderRadius: "30px",
              fontSize: "16px",
              margin: " auto",
            }}
            handleOnClick={() => handleSave()}
          />
          <Button
            text="Delete Account"
            htmlType="button"
            customStyles={{
              width: "310px",
              height: "45px",
              borderRadius: "30px",
              fontSize: "16px",
              backgroundColor: "var( --secondary-color-red-accent)",
              margin: " auto",
            }}
            handleOnClick={() => {
              setDeleteModalVisible(true);
              console.log("click");
            }}
          />
        </div>
      </Form>

      <div className={styles["delete-account-btn"]}></div>

      <div className={styles["link-account-section"]}>
        <h3>Linked Accounts</h3>
        <div className={styles["account-link-countainer"]}>
          <img
            className={styles["login-icons"]}
            src={googleIcon}
            alt="google log in"
          />
          <h4>Google</h4>
          <Button text="Unlink" />
        </div>
      </div>

      <Modal
        open={deleteModalVisible}
        title="Delete Account"
        onCancel={() => setDeleteModalVisible(false)}
        footer={
          <div
            style={{
              display: "flex",
              marginTop: "32px",
              justifyContent: "space-between",
            }}
          >
            <Button
              text="CANCEL"
              handleOnClick={() => setDeleteModalVisible(false)}
            />
            <Button
              text="DELETE"
              customStyles={{
                backgroundColor: "var( --secondary-color-red-accent)",
              }}
              handleOnClick={() => handleDeleteAccount()}
            />
          </div>
        }
      >
        <p>Are you sure you want to delete your account?</p>
        <p>
          All your stories will be <strong>removed</strong> and this action
          cannot be undone.
        </p>
      </Modal>
    </div>
  );
};
export default EditProfilePage;
