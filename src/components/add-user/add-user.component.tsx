import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Avatar,
  Input,
  Modal,
  Radio,
  RadioChangeEvent,
  Select,
  Upload,
  message as notify,
} from "antd";
import { useEffect, useState } from "react";
import { getData, postData } from "../../service/api-service";
import "./add-user.styles.css";
import { useNavigate } from "react-router-dom";

interface AddUserModelProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}

const AddUserModel: React.FC<AddUserModelProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const [userList, setUserList] = useState<[]>([]);
  const [chatType, setChatType] = useState("private");
  const [loading, setLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [groupName, setGroupName] = useState("");
  const [message, setMessage] = useState("");
  const [groupProfile, setGroupProfile] = useState<string | null>(null);
  const [messageApi, contextHolder] = notify.useMessage();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData("users/all");
      const formatted = data.body.map((user: any) => ({
        label: user.username,
        value: user._id,
      }));

      setUserList(formatted);
    };

    fetchData();
  }, []);

  const createChat = async () => {
    if (chatType === "group") {
      if (!groupName.trim()) {
        messageApi.error("Group name is required for a group chat.");
        return;
      }
      if (!selectedUsers.length) {
        messageApi.error("Please select at least one user for a group chat.");
        return;
      }
      if (!groupProfile) {
        messageApi.error("Group image is required.");
        return;
      }
    } else if (chatType === "private" && selectedUsers.length == 0) {
      messageApi.error("Please select a user for a private chat.");
      return;
    }

    const data = {
      chatType,
      selectedUsers,
      groupName,
      groupProfile,
      message,
    };

    const response = await postData("messages/conversation/start", data);
    navigate(`/chat/${response._id}`);

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChatTypeChange = (e: RadioChangeEvent) => {
    setChatType(e.target.value);
    setSelectedUsers([]);
    if (e.target.value === "private") {
      setGroupName("");
      setGroupProfile(null);
    }
  };

  const handleUserSelect = (value: string[]) => {
    setSelectedUsers(value);
  };

  const handleGroupNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName(e.target.value);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleImageUpload = async (file: File) => {
    const reader = new FileReader();
    reader.onload = async () => {
      setLoading(true);
      const fileName = `chat/${file.name}` + Date.now();
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

      setGroupProfile(`https://pat-v2-stage.s3.amazonaws.com/${fileName}`);
      setLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
    </button>
  );

  return (
    <>
      {contextHolder}
      <Modal
        title="Create Chat"
        open={isModalOpen}
        onOk={createChat}
        onCancel={handleCancel}
        cancelText="Close"
        okText="Send"
      >
        <div className="chat-header-form">
          <div className="chat-header-form-group">
            <h3>Chat Type</h3>
            <Radio.Group onChange={handleChatTypeChange} value={chatType}>
              <Radio value="private">Private</Radio>
              <Radio value="group">Group</Radio>
            </Radio.Group>
          </div>
          <div className="chat-header-form-group">
            <h3>{chatType === "private" ? "Select User" : "Add Users"}</h3>
            <Select
              size="large"
              mode={chatType === "group" ? "multiple" : undefined}
              value={selectedUsers}
              onChange={handleUserSelect}
              style={{ width: 300 }}
              options={userList}
              placeholder={
                chatType === "private" ? "Select one user" : "Select users"
              }
            />
          </div>
          {chatType === "group" && (
            <>
              <div className="chat-header-form-group">
                <h3>Group Name</h3>
                <Input
                  placeholder="Group Name"
                  style={{ width: "300px" }}
                  value={groupName}
                  onChange={handleGroupNameChange}
                />
              </div>
              <div className="chat-header-form-group">
                <h3>Group Image</h3>
                <Upload
                  name="avatar"
                  listType="picture-circle"
                  className="avatar-uploader"
                  showUploadList={false}
                  beforeUpload={(file) => {
                    handleImageUpload(file);
                    return false;
                  }}
                >
                  {groupProfile ? (
                    <Avatar
                      shape="square"
                      src={groupProfile}
                      style={{ width: "70px", height: "70px" }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </div>
            </>
          )}
          <div className="chat-header-form-group">
            <h3>Message</h3>
            <Input.TextArea
              placeholder="Type your message..."
              style={{ width: "300px" }}
              value={message}
              onChange={handleMessageChange}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddUserModel;
