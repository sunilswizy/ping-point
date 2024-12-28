import { Avatar } from "antd";
import { ChatTypes, IChatData } from "../../enums/chat.enum";
import "./chat-window-header.styles.css";
import SearchBar from "../shared/search/search.component";
import moment from "moment";

interface IChatWindowHeader {
  chatData: IChatData;
  onSearchMessage: (text: string) => void;
}

const ChatWindowHeader: React.FC<IChatWindowHeader> = ({
  chatData,
  onSearchMessage,
}) => {
  const { chatImage, chatName, chatType, lastSeen, isOnline } = chatData;

  const defaultImage =
    chatImage || "https://storage.googleapis.com/pat-public/assets/Male.jpg";

  const timestamp = moment(lastSeen).startOf("minute").fromNow();

  return (
    <div className="chat-window-header">
      <div className="chat-window-header-details-container">
        <div className="chat-window-header-image">
          <Avatar
            style={{ width: "100%", height: "100%" }}
            src={defaultImage}
            alt={chatName}
          />
        </div>
        <div className="chat-window-header-details">
          <h3>{chatName}</h3>
          {chatType === ChatTypes.private && (
            <p>{isOnline ? "Online" : `Last seen ${timestamp}`}</p>
          )}
        </div>
      </div>
      <div className="chat-window-header-search">
        <SearchBar
          placeholder="search message"
          onSearchMessage={onSearchMessage}
        />
      </div>
    </div>
  );
};

export default ChatWindowHeader;
