import styles from "./index.module.css";
import { Form, Input, Checkbox, Upload, Select } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import Button from "../../components/Button";
import PageHeader from "../../components/PageHeader";
import profileImg from "../../assets/images/profile.png";
import { useState } from 'react';
import googleIcon from "../../assets/icons/Google icon.svg"
import { useSelector, useDispatch } from 'react-redux';
import PrimaryButton from "../../components/PrimaryButton";
import { updateUser } from "../../data/features/userInfoSlice";
import { useNavigate } from "react-router-dom";
import ImgCrop from 'antd-img-crop';

const EditProfilePage = () => {

  const currentUser = useSelector((state) => state.userInfo.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [profileImage, setProfileImage] = useState(currentUser.profileImage);
  // const [profileBanner, setProfileBanner] = useState(currentUser.profileBanner);
  const [selectedTags, setSelectedTags] = useState(currentUser.tagsOfInterest);
  const [formFields, setFormFields] = useState({});


  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  const options = [
    'Communities & Livelihood',
    'Indigenous History',
    'Underground Railroad',
    'Civil Rights & Freedom',
    'Cultural Identities',
    'Environment & Ecology',
    'Organizations & Industries',
    'Modern-Day History',
    'Post-European Settlement',
  ];
  const filteredOptions = options.filter(o => !selectedTags.includes(o));

  const [fileList, setFileList] = useState([]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };


  const currentPassword = "12345678";

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
    console.log("Dispatching user Details: ", userDetails);
    dispatch(updateUser({ userDetails: userDetails, uid: currentUser.id }));
    navigate("/profile");
  }

  const handleValuesChange = (changedValues, allValues) => {
    setFormFields(allValues);
  };

  return (
    <div className={`page-container ${styles["edit-profile-page-container"]}`}>
      <PageHeader title='Account Information' />
      <h3>Profile</h3>
      <Form
        initialValues={{
          userName: currentUser.username,
          profileName: currentUser.profileName,
          password: currentPassword,
          email: currentUser.email,
          userBio: currentUser.biography,
          phoneNumber: currentUser.phoneNumber,
          anonySubChk: !!currentUser.anonymousSubmissionCheck,
          interest: currentUser.tagsOfInterest,
        }}
        onFinish={handleSave}
        onValuesChange={handleValuesChange}
        name="nest-messages"
        validateMessages={validateMessages}
        className={styles["edit-profile-form"]}
      >

        <div>
          <div className={styles["short-input-container"]}>
            <Form.Item name="userName" label="Username" rules={[{ required: true }]}>
              <Input className={styles["short-input"]}/>
              {/* <Input className={styles["short-input"]} value={userName} onChange={(text) => setUserName(text)} /> */}
            </Form.Item>
            <Form.Item name="profileName" label="Profile Name" rules={[{ required: false }]}>
            <Input className={styles["short-input"]} />
              {/* <Input className={styles["short-input"]} value={profileName} onChange={(text) => setProfileName(text)} /> */}
            </Form.Item>
          </div>
          <Form.Item name="anonySubChk" label="Anonymous Submissions" valuePropName="checked"
              getValueFromEvent={(e) => e.target.checked}>
            <Checkbox className={styles["check-box"]} ><span>Optional: Have account displayed as anonymous.</span><span>This can be changed at any time.</span></Checkbox>
          </Form.Item>

          <Form.Item name="userBio" label="Biography">
            <Input.TextArea showCount maxLength={200} placeholder="Would you like to add a biography?"/>
          </Form.Item>
        </div>

        <div className={styles["profile-images-input"]}>
          <div>
            <h3>Profile Photo</h3>
            <div className={styles["profile-upload"]}>
              <ImgCrop rotationSlider>
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onChange={onChange}
                  onPreview={onPreview}
                >
                  {fileList.length < 1 && '+ Upload'}
                </Upload>
              </ImgCrop>
            </div>
          </div>
          <div>
            <h3>Profile Banner</h3>
            <div className={styles["profile-upload"]}>
              <ImgCrop rotationSlider>
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onChange={onChange}
                  onPreview={onPreview}
                >
                  {fileList.length < 1 && '+ Upload'}
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
              options={filteredOptions.map(item => ({
                value: item,
                label: item,
              }))}
            />
          </Form.Item>
        </div>

        <div>
          <h3>Personal Information</h3>
          <Form.Item name="email" label="Email" rules={[{ type: 'email' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Password">
            <Input.Password
              placeholder="input password"
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>
          <Form.Item name="phoneNumber" label="Phone Number">
            <Input/>
          </Form.Item>
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
          <Button customStyles={{ fontSize: '14px', width: '100px', height: '30px' }} text="Unlink" />
        </div>
      </div>


    </div>
  );

};
export default EditProfilePage;

