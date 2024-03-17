import styles from "./index.module.css";
import { useState } from "react";
import { Form, Input, Upload, Select, message } from "antd";
import PageHeader from "../../components/PageHeader";
import Button from "../../components/Button";
import upload_icon from "../../assets/icons/upload_icon.svg";
import location_red from "../../assets/icons/location_red.svg";
import tag_blue from "../../assets/icons/tag_blue.svg";
import { useDispatch, useSelector } from "react-redux";
import { addNewStory } from "../../data/features/storyListSlice";
import { uploadFile } from "../../data/features/fileUploadSlice";

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

const SiteLocationList = [
  {
    value: "Site 1",
    label: "Site 1",
  },
  {
    value: "Site 2",
    label: "Site 2",
  },
  {
    value: "Site 3",
    label: "Site 3",
  },
  {
    value: "Site 4",
    label: "Site 4",
  },
  {
    value: "Site 5",
    label: "Site 5",
  },
  {
    value: "Site 6",
    label: "Site 6",
  },
  {
    value: "Site 7",
    label: "Site 7",
  },
  {
    value: "Site 8",
    label: "Site 8",
  },
  {
    value: "Site 9",
    label: "Site 9",
  },
  {
    value: "Site 10",
    label: "Site 10",
  },
];
const TagList = [
  {
    value: "Communities & Livelihoods",
    label: "Communities & Livelihoods",
  },
  {
    value: "Indigenous History",
    label: "Indigenous History",
  },
  {
    value: "Underground Railroad",
    label: "Underground Railroad",
  },
  {
    value: "Civil_right & Freedom",
    label: "Civil Right & Freedom",
  },
  {
    value: "Cultural Identities",
    label: "Cultural Identities",
  },
  {
    value: "River Environment & Ecology",
    label: "River Environment & Ecology",
  },
  {
    value: "Modern-Day Detroit",
    label: "Modern-Day Detroit",
  },
];

const CreateStory = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const dispatch = useDispatch();
  const fileUploadStatus = useSelector(
    (state) => state.fileUpload.uploadStatus
  );

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

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
          site: values.site,
          tags: values.tags,
          media: fileURLs, // Pass the array of URLs
          postType: "user",
          status: "pending",
          submitTime: new Date().toISOString(),
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
            <Input placeholder="Title" />
          </Form.Item>

          <Form.Item
            name="site"
            rules={[
              {
                required: true,
                message: "Please select the Site Location of your story!",
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Select or Search a Site Location"
              optionFilterProp="children"
              filterOption={filterOption}
              suffixIcon={<img src={location_red} alt="location" />}
              options={SiteLocationList}
            />
          </Form.Item>

          <Form.Item
            name="tags"
            rules={[
              {
                required: true,
                message: "Please select the Site Location of your story!",
              },
            ]}
          >
            <Select
              mode="tags"
              showSearch
              placeholder="Select or Search Tags"
              optionFilterProp="children"
              filterOption={filterOption}
              suffixIcon={<img src={tag_blue} alt="tags" />}
              options={TagList}
            />
          </Form.Item>

          <Form.Item
            name="content"
            rules={[{ required: true, message: "Please write your story!" }]}
          >
            <Input.TextArea rows={4} placeholder="Write your story here..." />
          </Form.Item>

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
    </div>
  );
};

export default CreateStory;
