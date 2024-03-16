import { Form, Input, Upload, message } from "antd";
import PageHeader from "../../components/PageHeader";
import Button from "../../components/Button";
import upload_icon from "../../assets/icons/upload_icon.svg";
import styles from "./index.module.css";

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

const AdminRejectForm = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const onFileChange = (info) => {
    console.log("file status change", info);

    // Log details if the file is successfully read
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      // Here: any callback to trigger after successful upload
    } else if (info.file.status === "error") {
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
      } else {
        message.error("You can only upload image, video, or audio files!");
        return Upload.LIST_IGNORE;
      }
      return false;
    },
    onChange: onFileChange,
  };

  const handleSubmission = (values) => {};

  return (
    <div className="page-container">
      <PageHeader title="Reject Story" />
      <Form
        name="reject_story"
        onFinish={onFinish}
        className={styles["reject_story-form"]}
      >
        <div className="form-fields">

          <Form.Item
            name="content"
            rules={[{ required: true, message: "Please leave rejection reason!" }]}
          >
            <Input.TextArea rows={4} placeholder="Write the rejection reason here..." 
            style={{ width: '100%' }}/>
          </Form.Item>

        </div>

        <Form.Item>
          <Button
            text="Submit"
            handleOnClick={() => handleSubmission()}
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

export default AdminRejectForm;
