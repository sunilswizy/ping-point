import { PaperClipOutlined, SendOutlined } from "@ant-design/icons";
import "./message-input.styles.css";
import { message as notify } from "antd";
import { postData } from "../../../service/api-service";
import { MessageTypes } from "../../../enums/message.enum";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface IMessageInput {
  message: string;
  setMessage: (message: string) => void;
  sendMessage: (
    message: string,
    messageType: string,
    mediaUrl?: string
  ) => void;
}

const MessageInput: React.FC<IMessageInput> = ({
  message,
  sendMessage,
  setMessage,
}) => {
  const [messageApi, contextHolder] = notify.useMessage();

  const handleKeyDown = (
    e: DetailedHTMLProps<
      InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >
  ) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  const handleClick = () => {
    sendMessage(message, MessageTypes.Text);
    setMessage("");
  };

  const openFilePicker = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files;
      if (!file) return;

      const selectedFile = file[0];

      if (selectedFile.size > 5000000) {
        messageApi.error("File size should be less than 5MB");
        return;
      }

      if (selectedFile.type.split("/")[0] !== "image") {
        messageApi.error("Only images are allowed");
        return;
      }

      handleFileUpload(selectedFile);
    };
    fileInput.click();
  };

  const handleFileUpload = async (file: File) => {
    const fileName = "chat/" + file.name + Date.now();
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

    sendMessage(
      file.name,
      MessageTypes.Image,
      `https://pat-v2-stage.s3.amazonaws.com/${fileName}`
    );
  };

  return (
    <div className="message-input-container">
      {contextHolder}
      <input
        type="text"
        className="message-input"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="message-input-icons">
        <PaperClipOutlined className="message-icon" onClick={openFilePicker} />
        <SendOutlined className="message-icon" onClick={handleClick} />
      </div>
    </div>
  );
};

export default MessageInput;
