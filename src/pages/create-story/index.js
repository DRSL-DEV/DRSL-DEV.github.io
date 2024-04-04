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
import { ReactMic } from "react-mic";

const CreateStory = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [audioFile, setAudioFile] = useState(null); // For storing and testing the recorded audio File object

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  // Function to save the recorded audio
  const onData = (recordedBlob) => {
    // No action is required; called continuously when audio data is being recorded
  };

  const removeAudio = () => {
    setRecordedBlob(null);
    setAudioFile(null);
    setFileList((prevFileList) =>
      prevFileList.filter((file) => file.uid !== "audio-file")
    );
  };

  // Finish record and store the audio file
  const onStop = (recordedBlob) => {
    setRecordedBlob(recordedBlob);
    setAudioFile(
      new File([recordedBlob.blob], "voice-recording.wav", {
        type: recordedBlob.blob.type,
      })
    );
    // const mimeType = recordedBlob.blob.type || 'audio/wav';

    setFileList((prevFileList) => {
      // Remove the previous audio if it exists
      const updatedFileList = prevFileList.filter(
        (file) => file.uid !== "audio-file"
      );

      // Create a representation for the fileList
      const audioFileObject = {
        uid: "audio-file", // identifier for the recorded file - removed if recording again
        name: "voice-recording.wav",
        status: "done",
        originFileObj: recordedBlob.blob, // The file object itself
        type: String(recordedBlob.blob.type),
      };

      return [...updatedFileList, audioFileObject];
    });
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userInfo.user);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  const filterOption = (input, option) =>
    option?.label.toLowerCase().includes(input.toLowerCase());

  const fileUploadProps = {
    beforeUpload: (file) => {
      if (allowedFileTypes.includes(file.type)) {
      } else {
        message.error({
          content: "You can only upload image, video, or audio files!",
          duration: 2,
        });
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
          fileName: fileInfo.name,
          file: fileInfo.originFileObj,
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
              filterOption={filterOption}
              suffixIcon={<img src={location_red} alt="location" />}
              options={siteLocationList}
            />
          </Form.Item>

          <Form.Item
            name="content"
            rules={[{ required: true, message: "Please write your story!" }]}
          >
            <Input.TextArea rows={4} placeholder="Write your story here..." />
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

        <div className={styles["audio-container"]}>
          {/* ReactMic component to display for record audio */}
          <ReactMic
            record={isRecording}
            className="sound-wave"
            onStop={onStop}
            onData={onData}
            strokeColor="#000000"
            backgroundColor="#cae8fa"
            styles={{ width: "100%", height: "20%" }}
          />

          <div className={styles["audio-recording-buttons"]}>
            <Button
              text="Start Recording"
              handleOnClick={startRecording}
              disabled={isRecording}
              customStyles={{
                backgroundColor: isRecording
                  ? "#ccc"
                  : "rgba(146, 187, 95, 0.75)",
              }}
            />

            <Button
              text="Stop Recording"
              handleOnClick={stopRecording}
              disabled={!isRecording}
              customStyles={{
                backgroundColor: isRecording
                  ? "var(--secondary-color-light-blue)"
                  : "#ccc",
              }}
            />
          </div>

          {recordedBlob && (
            <>
              <audio src={recordedBlob.blobURL} controls />
              <Button
                text="Remove Audio"
                handleOnClick={removeAudio}
                customStyles={{
                  backgroundColor: "rgba(255, 156, 150, 0.75)",
                }}
              />
            </>
          )}
        </div>
        <br />
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
