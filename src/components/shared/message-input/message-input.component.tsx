import { PaperClipOutlined, SendOutlined } from "@ant-design/icons";
import "./message-input.styles.css";

const MessageInput: React.FC = () => {
  return (
    <div className="message-input-container">
      <input
        type="text"
        className="message-input"
        placeholder="Type a message"
      />
      <div className="message-input-icons">
        <PaperClipOutlined className="message-icon" />
        <SendOutlined className="message-icon" />
      </div>
    </div>
  );
};

export default MessageInput;
