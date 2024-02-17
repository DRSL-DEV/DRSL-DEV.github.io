import { Form, Input, Upload } from "antd";
import StoryHeader from "../../components/PageHeader";
import Button from "../../components/Button";
import upload_icon from "../../assets/icons/upload_icon.svg";
import "./index.css";

const CreateStory = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const uploadProps = {
    beforeUpload: (file) => {
      // Implement file handling logic here
      return false;
    },
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
