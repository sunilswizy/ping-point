import { useEffect, useState } from "react";
import "./chat-listing.styles.css";
import ChatBox from "../chat-box/chat-box.component";
import { IChatList } from "../../enums/chat.enum";
import ChatHeader from "../chat-header/chat-header.component";
import { getData } from "../../service/api-service";

const ChatListing = () => {
  const [chatList, setChatList] = useState<IChatList[]>([]);

  useEffect(() => {
    const fetchChatList = async () => {
      const response = await getData(
        "messages/conversations/676ed7ac39f371fafb576a16"
      );
      setChatList(response);
    };
    fetchChatList();
  }, []);

  return (
    <div className="chat-listing">
      <ChatHeader />
      <div className="chat-listing-container">
        {chatList.map((chat) => (
          <ChatBox key={chat._id} {...chat} />
        ))}
      </div>
    </div>
  );
};

export default ChatListing;
