import {
  Avatar,
  Button,
  Input,
  message,
  Modal,
  Upload,
  UploadProps,
} from "antd";
import "./chat-header.styles.css";
import SearchBar from "../shared/search/search.component";
import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";

const props: UploadProps = {
  name: "file",
  action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const ChatHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const editProfile = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="chat-header-container">
      <SearchBar placeholder="Search for people or a group" />

      <div className="chat-header-avatar">
        <Avatar
          className="message-icon"
          src="https://randomuser.me/api/portraits/women/10.jpg"
          onClick={showModal}
        />
      </div>

      <Modal
        title="My Profile"
        open={isModalOpen}
        onOk={editProfile}
        onCancel={handleCancel}
        cancelText="Close"
        okText="Save"
      >
        <div className="chat-header-avatar-edit">
          <Avatar
            shape="square"
            src="https://randomuser.me/api/portraits/women/10.jpg"
            style={{ width: "70px", height: "70px" }}
          />

          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </div>
        <div className="chat-header-username">
          <h3>Username</h3>
          <Input
            placeholder="Username"
            style={{ width: "300px" }}
            value="John Doe"
          />
        </div>
      </Modal>
    </div>
  );
};

export default ChatHeader;
