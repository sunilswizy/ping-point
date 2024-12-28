import { useEffect, useState } from "react";
import "./chat-listing.styles.css";
import ChatBox from "../chat-box/chat-box.component";
import { IChatList } from "../../enums/chat.enum";
import ChatHeader from "../chat-header/chat-header.component";
import { getData } from "../../service/api-service";
import search from "../../assets/search.svg";

const ChatListing = () => {
  const [chatList, setChatList] = useState<IChatList[]>([]);

  useEffect(() => {
    const fetchChatList = async () => {
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      const response = await getData(`messages/conversations/${user.id}`);
      setChatList(response);
    };
    fetchChatList();
  }, []);

  return (
    <div className="chat-listing">
      <ChatHeader />
      <div className="chat-listing-container">
        {chatList.length ? (
          chatList.map((chat) => <ChatBox key={chat._id} {...chat} />)
        ) : (
          <div className="chat-listing-no-chat">
            <div>
              <img src={search} alt="search" />
            </div>
            <div className="chat-listing-no-chat-text">
              <h3>No chats found</h3>
              <p>Add someone to message</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatListing;
