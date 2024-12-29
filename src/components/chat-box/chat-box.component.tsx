import "./chat-box.styles.css";
import { ChatTypes, IChatList } from "../../enums/chat.enum";
import React from "react";
import ProfileAvatar from "../shared/profile-avatar/profile-avatar.component";
import { Badge } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const ChatBox: React.FC<IChatList> = ({
  conversationID,
  chatImage,
  chatName,
  lastMessage,
  unreadCount,
  chatType,
  isOnline,
}) => {
  const defaultImage =
    chatImage || "https://storage.googleapis.com/pat-public/assets/Male.jpg";
  const navigate = useNavigate();
  const { chatId } = useParams();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const count = chatId === conversationID ? 0 : unreadCount[user.id] || 0;
  unreadCount[user.id] = count;

  return (
    <div
      className="chat-box"
      onClick={() => navigate(`/chat/${conversationID}`)}
      style={{ backgroundColor: chatId === conversationID ? "#443451" : "" }}
    >
      <div className="chat-box-image">
        <ProfileAvatar
          imageUrl={defaultImage}
          isOnline={isOnline && chatType === ChatTypes.private}
        />
      </div>
      <div className="chat-box-content">
        <span className="chat-box-content-name">{chatName}</span>
        <span className="chat-box-content-message">{lastMessage.content}</span>
      </div>
      <div className="chat-box-unread">
        <Badge count={count} showZero={false} />
      </div>
    </div>
  );
};

export default ChatBox;
