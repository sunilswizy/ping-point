import {
  Avatar,
  Button,
  GetProp,
  Input,
  message,
  Modal,
  Upload,
  UploadProps,
} from "antd";
import "./chat-header.styles.css";
import SearchBar from "../shared/search/search.component";
import { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { postData, putData } from "../../service/api-service";
import AddUserModel from "../add-user/add-user.component";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const beforeUpload = (file: FileType) => {
  if (!(file.type === "image/jpeg" || file.type === "image/png")) {
    message.error("You can only upload JPG/PNG file!");
    return false;
  }
  if (!(file.size / 1024 / 1024 < 2)) {
    message.error("Image must smaller than 2MB!");
    return false;
  }
  return true;
};

interface ChatHeaderProps {
  setSearch: (search: string) => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ setSearch }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const [messageApi, contextHolder] = message.useMessage();
  const [imageUrl, setImageUrl] = useState<string>(userData.profilePicture);
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const editProfile = async () => {
    const response = await putData(`users/${userData.id}`, {
      profilePicture: imageUrl,
    });

    if (response) {
      messageApi.success("Profile updated successfully");
    } else {
      messageApi.error("Failed to update profile");
    }

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    user.profilePicture = imageUrl;
    localStorage.setItem("user", JSON.stringify(user));
    setIsModalOpen(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleChange: UploadProps["onChange"] = async (info) => {
    setLoading(true);
    const file = info.file.originFileObj as FileType;
    await handleFileUpload(file);
    setLoading(false);
  };

  const handleFileUpload = async (file: File) => {
    const fileName = "profile/" + file.name + Date.now();
    const signedUrl = await postData("file/pre-signed-url", {
      key: fileName,
      type: file.type,
    });

    if (!signedUrl) {
      messageApi.error("Failed to upload file");
      return;
    }

    const response = await fetch(signedUrl, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    });

    if (!response.ok) {
      messageApi.error("Failed to upload file");
      return;
    }

    setImageUrl(`https://pat-v2-stage.s3.amazonaws.com/${fileName}`);
  };

  const onSearchMessage = (text: string) => {
    setSearch(text);
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
    </button>
  );

  return (
    <div className="chat-header-container">
      {contextHolder}
      <SearchBar
        placeholder="Search for people or a group"
        onSearchMessage={onSearchMessage}
      />

      <div className="chat-header-add-user">
        <Button
          type="default"
          shape="circle"
          icon={<PlusOutlined />}
          onClick={() => setIsAddModalOpen(true)}
        />
      </div>

      <div className="chat-header-avatar">
        <Avatar
          className="message-icon"
          src={userData.profilePicture}
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
        footer={[
          <div className="profile-btn-group" key="footer">
            <div>
              <Button
                key="logout"
                variant="filled"
                color="danger"
                onClick={logout}
              >
                Logout
              </Button>
            </div>
            <div className="profile-btn-group-right">
              <Button key="back" onClick={handleCancel}>
                Close
              </Button>
              <Button key="submit" type="primary" onClick={editProfile}>
                Save
              </Button>
            </div>
          </div>,
        ]}
      >
        <div className="chat-header-avatar-edit">
          <Avatar
            shape="square"
            src={imageUrl}
            style={{ width: "70px", height: "70px" }}
          />

          <Upload
            name="avatar"
            listType="picture-circle"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {uploadButton}
          </Upload>
        </div>
        <div className="chat-header-username">
          <h3>Username</h3>
          <Input
            placeholder="Username"
            style={{ width: "300px" }}
            value={userData.username}
            disabled={true}
          />
        </div>
      </Modal>
      {isAddModalOpen && (
        <AddUserModel
          isModalOpen={isAddModalOpen}
          setIsModalOpen={setIsAddModalOpen}
        />
      )}
    </div>
  );
};

export default ChatHeader;
