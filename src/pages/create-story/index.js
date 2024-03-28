import styles from "./index.module.css";
import { useEffect, useState } from "react";
import { Form, Input, Upload, Select, message } from "antd";
import PageHeader from "../../components/PageHeader";
import Button from "../../components/Button";
import upload_icon from "../../assets/icons/upload_icon.svg";
import location_red from "../../assets/icons/location_red.svg";
import tag_blue from "../../assets/icons/tag_blue.svg";
import { useDispatch, useSelector } from "react-redux";
import { addNewStory } from "../../data/features/storyListSlice";
import { uploadFile } from "../../data/features/fileUploadSlice";
import { siteLocationList, tagList } from "../../constants/constants";
import { useNavigate } from "react-router-dom";
import { allowedFileTypes } from "../../constants/constants";

const CreateStory = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const fileUploadStatus = useSelector(
    (state) => state.fileUpload.uploadStatus
  );

  const user = useSelector((state) => state.userInfo.user);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const fileUploadProps = {
    beforeUpload: (file) => {
      if (allowedFileTypes.includes(file.type)) {
        // console.log("File details:", {
        //   name: file.name,
        //   type: file.type,
        //   size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        // });
      } else {
        message.error({
          content: "You can only upload image, video, or audio files!",
          duration: 2,
        });
        // console.log("File type not allowed:", file.type);
        return Upload.LIST_IGNORE;
      }
      return false;
    },
    onChange: (info) => {
      setFileList(info.fileList);
      // Log details if the file is successfully read
      if (info.file.status === "done") {
        message.success({
          content: `${info.file.name} file uploaded successfully`,
          duration: 2,
        });
      } else if (info.file.status === "error") {
        message.error({
          content: `${info.file.name} file upload failed.`,
          duration: 2,
        });
      }
    },
  };

  const handleSubmission = async (values) => {
    const uploadPromises = fileList.map((fileInfo) =>
      dispatch(
        uploadFile({
          file: {
            ...fileInfo.originFileObj,
            name: `${fileInfo.originFileObj.name}_${new Date().getTime()}`,
          },
          folderPath: `post/${fileInfo.type.split("/")[0]}`,
        })
      ).unwrap()
    );

    try {
      const fileURLs = await Promise.all(uploadPromises);

      dispatch(
        addNewStory({
          userId: user.uid,
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
      message.success({
        content:
          "Story submitted successfully! You will be redirected back to the previous page shortly",
        duration: 2,
      });
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } catch (error) {
      message.error({
        content: "Failed to upload files and create story.",
        duration: 2,
      });
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
            <Input placeholder="Title" maxLength={40} />
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
              options={siteLocationList}
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
              options={tagList}
              onSelect={() => {
                if (form.getFieldValue("tags").length > 3) {
                  message.warning({
                    content: `You can only select up to 3 tags.`,
                    duration: 2,
                  });
                }
                form.setFieldsValue({
                  tags: form.getFieldValue("tags").slice(0, 3),
                });
              }}
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
