import { Avatar } from "antd";
import { ChatTypes, IChatData } from "../../enums/chat.enum";
import "./chat-window-header.styles.css";
import SearchBar from "../shared/search/search.component";

const ChatWindowHeader: React.FC<IChatData> = ({
  chatImage,
  chatName,
  chatType,
  lastSeen,
  isOnline,
}) => {
  return (
    <div className="chat-window-header">
      <div className="chat-window-header-details-container">
        <div className="chat-window-header-image">
          <Avatar
            style={{ width: "100%", height: "100%" }}
            src={chatImage}
            alt={chatName}
          />
        </div>
        <div className="chat-window-header-details">
          <h3>{chatName}</h3>
          {chatType === ChatTypes.private && (
            <p>{isOnline ? "Online" : `Last seen ${lastSeen}`}</p>
          )}
        </div>
      </div>
      <div className="chat-window-header-search">
        <SearchBar placeholder="search message" />
      </div>
    </div>
  );
};

export default ChatWindowHeader;
