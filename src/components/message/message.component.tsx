import { IMessage } from "../../enums/chat.enum";
import { Avatar, Image } from "antd";
import "./message.styles.css";
import moment from "moment";

interface IMessageProps {
  message: IMessage;
  isCurrentUser: boolean;
}

const Message: React.FC<IMessageProps> = ({ message, isCurrentUser }) => {
  const { chatImage, content, timestamp, senderName, messageType, mediaUrl } =
    message;
  const dateAndTime = moment(timestamp).format("MMM, DD/MM HH:mm");
  const defaultImage =
    chatImage || "https://storage.googleapis.com/pat-public/assets/Male.jpg";

  return (
    <div
      className="message-container"
      style={{ flexDirection: isCurrentUser ? "row-reverse" : "row" }}
    >
      <div className="message-avatar">
        <Avatar src={defaultImage} />
      </div>
      <div className="message-content">
        {messageType === "image" && (
          <Image src={mediaUrl} alt="message" className="message-image" />
        )}

        <div className="message-text">{content}</div>
        <div className="message-timestamp">
          {!isCurrentUser ? senderName + " | " + dateAndTime : dateAndTime}
        </div>
      </div>
    </div>
  );
};

export default Message;
