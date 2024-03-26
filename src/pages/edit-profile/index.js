import styles from "./index.module.css";
import { Form, Input, InputNumber, Checkbox, Upload, Select} from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import Button from "../../components/Button";
import PageHeader from "../../components/PageHeader";
import profileImg from "../../assets/images/profile.png";
import { useState } from 'react';
import googleIcon from "../../assets/icons/Google icon.svg"

const EditProfilePage = () =>{

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
    'Modern-Day History' ,
    'Post-European Settlement',
  ];
  const [selectedItems, setSelectedItems] = useState([]);
  const filteredOptions = options.filter(o => !selectedItems.includes(o));

  const currentUsername = "Story_with_Jada";
  const currentPassword = "12345678";
  const currentEmail = 'detroitriverstory@gmail.com';


  return (
    <div className={`page-container ${styles["edit-profile-page-container"]}`}>
      <PageHeader title='Account Information' />
      <h3>Profile</h3>
      <Form initialValues={{
        userName: currentUsername,
        password: currentPassword,
        email: currentEmail,
        }} 
        name="nest-messages" 
        validateMessages={validateMessages}
        className={styles["edit-profile-form"]}
        >

        <div>
          <div className={styles["short-input-container"]}>
            <Form.Item name="userName" label="Username" rules={[{ required: true }]}>
              <Input className={styles["short-input"]}/>
            </Form.Item>
            <Form.Item name="profileName" label="Profile Name" rules={[{ required: false }]}>
              <Input className={styles["short-input"]} />
            </Form.Item>
          </div>
          <Checkbox className={styles["check-box"]}><span>Optional: Have account displayed as anonymous.</span><span>This can be changed at any time.</span></Checkbox>

          <Form.Item name="userBio" label="Biography">
            <Input.TextArea showCount maxLength={200} placeholder="Would you like to add a biography?"/>
          </Form.Item>
        </div>

        <div className={styles["profile-images-input"]}>
          <div>
            <h3>Profile Photo</h3>
            <div className={styles["profile-image-left"]}>
              <img className={styles["profile-img"]} src={profileImg} alt="profile" />
              <Upload>
                <Button customStyles={{fontSize:'12px', width:'75px', height:'30px'}} text="Upload"/>
              </Upload>
            </div>
          </div>
          <div>
            <h3>Profile Banner</h3>
            <div className={styles["profile-image-left"]}>
              <img className={styles["profile-img"]} src={profileImg} alt="profile" />
              <Upload>
                <Button customStyles={{fontSize:'12px', width:'75px', height:'30px'}} text="Upload"/>
              </Upload>
            </div>
          </div>
        </div>

        <div>
          <h3>Tags of Interest</h3>
          <Form.Item name="interest" label="">
            <Select
              mode="multiple"
              placeholder="Please pick your topics"
              value={selectedItems}
              onChange={setSelectedItems}
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
            <Input />
          </Form.Item>
        </div>

        <Button
          text="Save"
          customStyles={{margin:"8% auto", display:"flex", justifyContent:"center"}}
        />
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
          <Button customStyles={{fontSize:'14px', width:'100px', height:'30px'}} text="Unlink"/>
        </div>
      </div>


    </div>
  );

};
export default EditProfilePage;
