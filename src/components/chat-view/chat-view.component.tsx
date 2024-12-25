import ChatListing from "../chat-listing/chat-listing.component";
import ChatWindow from "../chat-window/chat-window.component";
import "./chat-view.styles.css";

const ChatView = () => {
  return (
    <div className="chat-view">
      <ChatListing />
      <ChatWindow />
    </div>
  );
};

export default ChatView;
