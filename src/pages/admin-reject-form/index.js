import styles from "./index.module.css";
import { Form, Input, message } from "antd";
import PageHeader from "../../components/PageHeader";
import Button from "../../components/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addComment } from "../../data/features/adminCommentSlice";

const AdminRejectForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { postId, comment } = location.state;

  const handleSubmission = (values) => {
    const newComment = {
      comment: values.content,
      commentTime: new Date().toISOString(),
    };
    dispatch(addComment({ postId, newComment })).unwrap();
    message.success({
      content:
        "Story rejected and comment submitted successfully! You will be redirected back to the story page shortly.",
      duration: 2,
    });
    setTimeout(() => {
      navigate("/admin-page");
    }, 2000);
  };

  return (
    <div className="page-container">
      <PageHeader title="Reject Story" />
      <Form
        name="reject_story"
        className={styles["reject_story-form"]}
        onFinish={handleSubmission}
        initialValues={{ content: comment || "" }}
      >
        <div className="form-fields">
          <Form.Item
            name="content"
            rules={[
              { required: true, message: "Please leave rejection reason!" },
            ]}
          >
            <Input.TextArea placeholder="Write the rejection reason here..." />
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

export default AdminRejectForm;
