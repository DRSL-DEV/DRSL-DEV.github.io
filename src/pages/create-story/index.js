import styles from "./index.module.css";
import { useEffect, useState } from "react";
import * as React from "react";
import { Form, Input, Upload, Select, message } from "antd";
import PageHeader from "../../components/PageHeader";
import Button from "../../components/Button";
import upload_icon from "../../assets/icons/upload_icon.svg";
import location_red from "../../assets/icons/location_red.svg";
import tag_blue from "../../assets/icons/tag_blue.svg";
import { useDispatch, useSelector } from "react-redux";
import { addOrUpdateStory } from "../../data/features/storyListSlice";
import { uploadFile, deleteFile } from "../../data/features/fileUploadSlice";
import { siteLocationList, tagList } from "../../constants/constants";
import { useNavigate, useLocation } from "react-router-dom";
import { allowedFileTypes } from "../../constants/constants";
import AudioReactRecorder, { RecordState } from "../../components/ReactAudio";
import ImageCompression from "browser-image-compression";

const CreateStory = () => {
  const location = useLocation();
  const { selectedPost } = location.state || {};
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userInfo.user);

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
    if (location.state?.site) {
      form.setFieldsValue({
        site: location.state.site.id,
      });
    }
  }, [navigate, user, form, location.state]);

  const filterOption = (input, option) =>
    option?.label.toLowerCase().includes(input.toLowerCase());

  const [fileList, setFileList] = useState(
    selectedPost?.media.map((media, index) => ({
      uid: `${selectedPost.title}-media${index}`,
      name: ``,
      uploaded: true,
      url: media,
    })) || []
  );

  const [recordState, setrecordState] = useState(null); //second record state
  const [audioData, setaudioData] = useState(null); //second audio data

  const start = () => {
    setrecordState(RecordState.START);
  };

  const stop = () => {
    setrecordState(RecordState.STOP);
  };

  const onStopSecond = (data) => {
    setaudioData(data);
    if (!data || !data.blob) {
      console.error("onStop received an invalid audio:", data);
      return;
    }

    //prepare audio element
    const audioUrl = URL.createObjectURL(data.blob);
    const audioElement = new Audio(audioUrl);

    //add to filelist
    audioElement.onloadedmetadata = () => {
      const duration = (data.stopTime - data.startTime) / 1000;
      if (duration > 180) {
        message.error({
          content: "Audio length cannot exceed 3 minutes.",
          duration: 2,
        });
        setaudioData(null);
      } else {
        setaudioData(data);

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
            originFileObj: data.blob, // The file object itself
            type: String(data.blob.type),
          };

          return [...updatedFileList, audioFileObject];
        });
      }
      URL.revokeObjectURL(audioUrl);
    };
  };

  const removeAudioSecond = () => {
    setaudioData(null);
    setFileList((prevFileList) =>
      prevFileList.filter((file) => file.uid !== "audio-file")
    );
  };

  const beforeUpload = (file) => {
    if (!allowedFileTypes.includes(file.type)) {
      message.error({
        content: "You can only upload image, video, or audio files!",
        duration: 2,
      });
      return Upload.LIST_IGNORE;
    }
    const isVideo = file.type.startsWith("video/");
    const isAudio = file.type.startsWith("audio/");
    const isImage = file.type.startsWith("image/");

    if (isVideo || isAudio) {
      return new Promise((resolve, reject) => {
        const url = URL.createObjectURL(file);
        const mediaElement = document.createElement(
          isVideo ? "video" : "audio"
        );
        mediaElement.addEventListener("loadedmetadata", () => {
          const duration = mediaElement.duration;

          if (isVideo && duration > 30) {
            message.error({
              content: "Video length cannot exceed 30 seconds.",
              duration: 2,
            });
            reject();
          } else if (isAudio && duration > 180) {
            message.error({
              content: "Audio length cannot exceed 3 minutes.",
              duration: 2,
            });
            reject();
          } else {
            resolve();
          }

          URL.revokeObjectURL(url);
        });

        mediaElement.addEventListener("error", () => {
          message.error({
            content: "Failed to load video/audio metadata.",
            duration: 2,
          });
          reject();
        });

        mediaElement.src = url;
      })
        .then(() => false)
        .catch(() => Upload.LIST_IGNORE);
    }

    const imageSizeLimit = 2 * 1024 * 1024;

    if (isImage && file.size > imageSizeLimit) {
      const options = {
        maxSizeMB: 2,
        useWebWorker: true,
      };

      return ImageCompression(file, options)
        .then((compressedFile) => {
          return compressedFile;
        })
        .catch((error) => {
          console.error(error);
          // message.error("Image compression failed.");
          return Upload.LIST_IGNORE;
        });
    }

    return false;
  };

  const fileUploadProps = {
    beforeUpload: beforeUpload,
    onChange: (info) => {
      setFileList(info.fileList);
      // Log details if the file is successfully read
      if (info.file.status === "done") {
        message.success({
          content: `${info.file.name} file uploaded successfully`,
          duration: 2,
        });
      } else if (info.file.status === "error") {
        // message.error({
        //   content: `${info.file.name} file upload failed.`,
        //   duration: 2,
        // });
      }
    },
  };

  const handleSubmission = async (values) => {
    const uploadPromises = fileList
      .filter((file) => !file.uploaded)
      .map((fileInfo) =>
        dispatch(
          uploadFile({
            fileName: fileInfo.name,
            file: fileInfo.originFileObj,
            folderPath: `post/${fileInfo.type.split("/")[0]}`,
          })
        ).unwrap()
      );

    const fileUrlList = fileList
      .filter((file) => file.uploaded)
      .map((file) => file.url);

    const deletePromises =
      selectedPost?.media
        .filter((mediaUrl) => !fileUrlList.includes(mediaUrl))
        .map((mediaUrl) => dispatch(deleteFile(mediaUrl)).unwrap()) || [];

    try {
      const fileURLs = [
        ...fileList.filter((file) => file.uploaded).map((file) => file.url),
        ...(await Promise.all(uploadPromises)),
      ];

      await Promise.all(deletePromises);

      dispatch(
        addOrUpdateStory({
          id: selectedPost?.id || null,
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
      <PageHeader title="Contribute Your Story" />
      <Form
        form={form}
        name="create_story"
        onFinish={handleSubmission}
        layout="vertical"
        className={styles["create-story-form"]}
        initialValues={{
          title: selectedPost?.title || "",
          content: selectedPost?.content || "",
          site: selectedPost?.site || "",
          tags: selectedPost?.tags || [],
          media: selectedPost?.media || [],
          postType: selectedPost?.postType || "",
        }}
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
          {/* //second audio recorder */}
          <AudioReactRecorder
            state={recordState}
            onStop={onStopSecond}
            backgroundColor="#cae8fa"
            canvasWidth={500}
            canvasHeight={50}
          />

          {audioData && (
            <>
              <audio
                id="recorded audio"
                src={audioData ? audioData.url : null}
                controls
              />
              <Button
                text="Remove Audio"
                handleOnClick={removeAudioSecond}
                customStyles={{
                  backgroundColor: "rgba(255, 156, 150, 0.75)",
                }}
              />
            </>
          )}
          <div className={styles["audio-recording-buttons"]}>
            <Button
              text={audioData ? "Record Again" : "Record Audio"}
              handleOnClick={start}
              disabled={recordState === RecordState.START}
              customStyles={{
                backgroundColor:
                  recordState === RecordState.START
                    ? "#ccc"
                    : "rgba(146, 187, 95, 0.75)",
              }}
            />

            {recordState === RecordState.START && (
              <Button
                text="Stop Recording"
                handleOnClick={stop}
                disabled={recordState === RecordState.STOP}
                customStyles={{
                  backgroundColor:
                    recordState === RecordState.START
                      ? "var(--secondary-color-light-blue)"
                      : "#ccc",
                }}
              />
            )}
          </div>
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
