import { useEffect, useMemo, useState } from "react";
import "./chat-listing.styles.css";
import ChatBox from "../chat-box/chat-box.component";
import { IChatList } from "../../enums/chat.enum";
import ChatHeader from "../chat-header/chat-header.component";
import { getData } from "../../service/api-service";
import search from "../../assets/search.svg";

interface IChatListing {
  userStatus: { username: string; status: string };
  newMessage: any;
}

const ChatListing: React.FC<IChatListing> = ({ userStatus, newMessage }) => {
  const [chatList, setChatList] = useState<IChatList[]>([]);
  const [chatSearch, setChatSearch] = useState("");
  const [filterChatList, setFilterChatList] = useState<IChatList[]>([]);

  useEffect(() => {
    const fetchChatList = async () => {
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      const response = await getData(`messages/conversations/${user.id}`);
      setChatList(response);
    };
    fetchChatList();
  }, []);

  useEffect(() => {
    setChatList((prevChatList) => {
      return prevChatList.map((chat) => {
        if (chat.chatName === userStatus.username) {
          return { ...chat, isOnline: userStatus.status === "online" };
        }
        return chat;
      });
    });
  }, [userStatus]);

  useEffect(() => {
    if (!newMessage) return;
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setChatList((prevChatList) => {
      const formatted = prevChatList.map((chat) => {
        if (
          chat.conversationID === newMessage.senderId ||
          chat.conversationID === newMessage.recipientId
        ) {
          return {
            ...chat,
            lastMessage: {
              content: newMessage.content,
              messageType: newMessage.messageType,
              senderId: newMessage.senderId,
              senderName: newMessage.senderName,
              timestamp: newMessage.timestamp,
            },
            unreadCount: {
              ...chat.unreadCount,
              [user.id]: chat.unreadCount[user.id]
                ? chat.unreadCount[user.id] + 1
                : 1,
            },
          };
        }
        return chat;
      });

      formatted.sort((a, b) => {
        const aTime = new Date(a.lastMessage.timestamp).getTime();
        const bTime = new Date(b.lastMessage.timestamp).getTime();
        return bTime - aTime;
      });

      return formatted;
    });
  }, [newMessage]);

  useMemo(() => {
    const filterChatList = chatList.filter((chat) =>
      chat.chatName.toLowerCase().includes(chatSearch.toLowerCase())
    );
    setFilterChatList(filterChatList);
  }, [chatSearch, chatList]);

  return (
    <div className="chat-listing">
      <ChatHeader setSearch={setChatSearch} />
      <div className="chat-listing-container">
        {filterChatList.length ? (
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
