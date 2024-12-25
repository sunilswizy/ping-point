import { IMessage } from "../../enums/chat.enum";
import { Avatar } from "antd";
import "./message.styles.css";
import moment from "moment";

interface IMessageProps {
  message: IMessage;
  isCurrentUser: boolean;
}

const Message: React.FC<IMessageProps> = ({ message, isCurrentUser }) => {
  const { chatImage, content, timestamp, senderName } = message;
  const dateAndTime = moment(timestamp).format("MMM, DD/MM HH:mm");

  return (
    <div
      className="message-container"
      style={{ flexDirection: isCurrentUser ? "row-reverse" : "row" }}
    >
      <div className="message-avatar">
        <Avatar src={chatImage} />
      </div>
      <div className="message-content">
        <div className="message-text">{content}</div>
        <div className="message-timestamp">
          {!isCurrentUser ? senderName + " | " + dateAndTime : dateAndTime}
        </div>
      </div>
    </div>
  );
};

export default Message;
