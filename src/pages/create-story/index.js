import styles from "./index.module.css";
import { useState } from "react";
import { Form, Input, Upload, Modal, message } from "antd";
import PageHeader from "../../components/PageHeader";
import Button from "../../components/Button";
import upload_icon from "../../assets/icons/upload_icon.svg";
import location_red from "../../assets/icons/location_red.svg";
import profile_green from "../../assets/icons/profile_green.svg";
import tag_blue from "../../assets/icons/tag_blue.svg";
import { useDispatch, useSelector } from "react-redux";
import { addNewStory } from "../../data/features/storyListSlice";
import { uploadFile } from "../../data/features/fileUploadSlice";
import { type } from "@testing-library/user-event/dist/type";

const allowedFileTypes = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "video/mp4",
  "video/webm",
  "video/ogg",
  "audio/mpeg",
  "audio/ogg",
  "audio/wav",
];

const CreateStory = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [site, setSite] = useState("");
  const [tags, setTags] = useState([]);
  const [modalType, setModalType] = useState("");

  const dispatch = useDispatch();
  const fileUploadStatus = useSelector(
    (state) => state.fileUpload.uploadStatus
  );

  const showModal = (type) => {
    setIsModalOpen(true);
    setModalType(type);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getModalContent = () => {
    switch (modalType) {
      case "site":
        return (
          <ul>
            {new Array(10).fill(0).map((_, index) => (
              <li
                key={index}
                onClick={() => {
                  setSite(`Site ${index + 1}`);
                  handleCancel();
                }}
              >
                Site {index + 1}
              </li>
            ))}
          </ul>
        );
      case "tag":
        return (
          <ul>
            {[
              "Communities & Livelihoods",
              "Indigenous History",
              "Underground Railroad",
              "Civil Right & Freedom",
              "Cultural Identities",
              "River Environment & Ecology",
              "Modern-Day Detroit",
            ].map((tag) => (
              <li
                key={tag}
                onClick={() => {
                  setTags(tag);
                  handleCancel();
                }}
              >
                {tag}
              </li>
            ))}
          </ul>
        );
      default:
        return null;
    }
  };

  const fileUploadProps = {
    beforeUpload: (file) => {
      if (allowedFileTypes.includes(file.type)) {
        console.log("File details:", {
          name: file.name,
          type: file.type,
          size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        });
      } else {
        message.error("You can only upload image, video, or audio files!");
        return Upload.LIST_IGNORE;
      }
      return false;
    },
    onChange: (info) => {
      console.log("file status change", info);
      setFileList(info.fileList);
      // Log details if the file is successfully read
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        // Here: any callback to trigger after successful upload
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const handleSubmission = async (values) => {
    console.log("Received values of form: ", values);
    console.log("Uploaded files: ", fileList);

    const uploadPromises = fileList.map((fileInfo) =>
      dispatch(
        uploadFile({
          file: fileInfo.originFileObj,
          folderPath: `post/${fileInfo.type.split("/")[0]}`,
        })
      ).unwrap()
    );

    try {
      const fileURLs = await Promise.all(uploadPromises);

      dispatch(
        addNewStory({
          title: values.title,
          content: values.content,
          media: fileURLs, // Pass the array of URLs
          postType: "user",
          status: "pending",
          submitTime: new Date().toISOString(),
          site: site,
          tags: tags,
        })
      ).unwrap();
      form.resetFields();
      setFileList([]);
    } catch (error) {
      console.error("Error uploading files:", error);
      message.error("Failed to upload files and create story.");
    }
  };

  return (
    <div className="page-container">
      <PageHeader title="Create Story" />
      <Form
        form={form}
        name="create_story"
        onFinish={handleSubmission}
        layout="vertical"
        className={styles["create-story-form"]}
      >
        <div className="form-fields">
          <Form.Item
            name="title"
            rules={[
              {
                required: true,
                message: "Please input the title of your story!",
              },
            ]}
          >
            <Input
              placeholder="Title"
              suffix={
                <img
                  src={location_red}
                  alt="location"
                  onClick={() => showModal("site")}
                />
              }
            />
          </Form.Item>

          <div className={styles["content-container"]}>
            <Form.Item
              name="content"
              rules={[{ required: true, message: "Please write your story!" }]}
            >
              <Input.TextArea rows={4} placeholder="Write your story here..." />
            </Form.Item>
            <div className={styles["option-icons-container"]}>
              <img src={tag_blue} alt="tag" onClick={() => showModal("tag")} />
              <img
                src={profile_green}
                alt="profile"
                onClick={() => showModal()}
              />
            </div>
          </div>
          <Form.Item valuePropName="fileList">
            <div className="upload-container">
              <Upload
                {...fileUploadProps}
                listType="picture"
                fileList={fileList}
                className="upload-list-inline"
              >
                <img src={upload_icon} alt="upload" />
                <h5>Upload Media</h5>
              </Upload>
            </div>
          </Form.Item>
        </div>

        <Form.Item>
          <Button
            text="Submit"
            customStyles={{
              width: "310px",
              height: "45px",
              borderRadius: "30px",
              fontSize: "16px",
            }}
          />
        </Form.Item>
      </Form>
      <Modal
        title={modalType === "site" ? "Select Site" : "Select Tags"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {getModalContent()}
      </Modal>
    </div>
  );
};

export default CreateStory;
