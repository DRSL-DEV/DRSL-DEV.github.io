import { Form, Input, Upload, message } from "antd";
import StoryHeader from "../../components/PageHeader";
import Button from "../../components/Button";
import upload_icon from "../../assets/icons/upload_icon.svg";
import "./index.css";

const allowedFileTypes = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'video/mp4',
  'video/webm',
  'video/ogg',
  'audio/mpeg',
  'audio/ogg',
  'audio/wav',
];

const CreateStory = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const onFileChange = (info) => {
    console.log('file status change', info);
  
    // Log details if the file is successfully read
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      // Here: any callback to trigger after successful upload
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const uploadProps = {
    beforeUpload: (file) => {
      if (allowedFileTypes.includes(file.type)) {
        console.log("File details:", {
          name: file.name,
          type: file.type,
          size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        });
      } 
      else {
        message.error('You can only upload image, video, or audio files!');
        return Upload.LIST_IGNORE;
      }
      return false;
    },
    onChange: onFileChange,
  };

  return (
    <div className="page-container">
      <StoryHeader title="Create Story" />
      <Form
        name="create_story"
        onFinish={onFinish}
        layout="vertical"
        className="create-story-form"
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
            name="content"
            rules={[{ required: true, message: "Please write your story!" }]}
          >
            <Input.TextArea rows={4} placeholder="Write your story here..." />
          </Form.Item>

          <Form.Item
            name="upload"
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e && e.fileList;
            }}
          >
            <div className="upload-container">
              <Upload
                {...uploadProps}
                listType="picture"
                className="upload-list-inline"
              >
                <img src={upload_icon} alt="upload" />
                <h5>Upload Media</h5>
              </Upload>
            </div>
          </Form.Item>
        </div>

        <Form.Item>
          <Button text="Submit" />
          {/* <Button type="primary" htmlType="submit">
            Submit
          </Button> */}
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateStory;
