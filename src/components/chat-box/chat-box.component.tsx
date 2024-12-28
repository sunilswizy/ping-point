import "./chat-box.styles.css";
import { ChatTypes, IChatList } from "../../enums/chat.enum";
import React from "react";
import ProfileAvatar from "../shared/profile-avatar/profile-avatar.component";
import { Badge } from "antd";

const ChatBox: React.FC<IChatList> = ({
  chatImage,
  chatName,
  lastMessage,
  unreadCount,
  chatType,
  isOnline,
}) => {
  const defaultImage =
    chatImage || "https://storage.googleapis.com/pat-public/assets/Male.jpg";

  return (
    <div className="chat-box">
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
        <Badge count={unreadCount} showZero={false} />
      </div>
    </div>
  );
};

export default ChatBox;
