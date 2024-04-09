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
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { tagList } from "../../constants/constants";
import { uploadUserImg } from "../../data/features/fileUploadSlice";

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

  const [file, setFile] = useState(null);
  const onChange = (info) => {
    setFile(info.fileList[0]); // Only keep the first file in the list
  };

  const onPreview = async () => {
    if (file) {
      const src = file.url || await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
      const image = new Image();
      image.src = src;
      image.className = styles["circular-image"];
      const imgWindow = window.open(src);
      imgWindow?.document.write(image.outerHTML);
    }
  };



  //TODO: Add the ability to upload profile and banner images
  //TODO: Vaidate phone number input

  //TODO: Discuss: Should we display anonymous submission details on profile page - Yes
  //TODO: Discuss: Handle password change - Work with Ceceil.
  //TODO: Discuss: Add a delete account button on this page and a confirmation dialogue - confirmed - Also ask confirmation about deeting posts
  //TODO: Discuss: Unlinking Social Profile? - Low Priority

  const handleSave = (values) => {
    const userDetails = {
      email: values.email,
      username: values.userName,
      profileName: values.profileName,
      biography: values.userBio,
      phoneNumber: values.phoneNumber,
      anonymousSubmissionCheck: values.anonySubChk,
      tagsOfInterest: selectedTags,
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
          content: `Broken: ${result.payload}`,
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
    console.log("Password change requested for: ", email);
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
              <ImgCrop rotationSlider>
                <Upload
                
                  customRequest={({ file }) => {
                    dispatch(uploadUserImg({ file, userId: currentUser.uid }));
                  }}
                  listType="picture-card"
                  fileList={file ? [file] : []}
                  onChange={onChange}
                  onPreview={onPreview}
                  beforeUpload={() => false} // Prevent file from being uploaded automatically
                >
                  {!file && '+ Upload'}
                </Upload>
              </ImgCrop>
            </div>
          </div>
          <div>
            <h3>Profile Banner</h3>
            <div className={styles["profile-upload"]}>
            
            {/* <ImgCrop rotationSlider>
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={file ? [file] : []}
                  onChange={onChange}
                  onPreview={onPreview}
                  beforeUpload={() => false} // Prevent file from being uploaded automatically
                >
                  {!file && '+ Upload'}
                </Upload>
              </ImgCrop> */}
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
