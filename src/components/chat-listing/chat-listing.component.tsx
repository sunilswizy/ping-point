import { useEffect, useState } from "react";
import "./chat-listing.styles.css";
import ChatBox from "../chat-box/chat-box.component";
import { IChatList } from "../../enums/chat.enum";
import ChatHeader from "../chat-header/chat-header.component";

// const chatListResponse = {
//   _id: "conversationId/groupId",
//   chatType: "direct/group",
//   chatName: "User Name/Group Name",
//   chatImage: "profile/group picture URL",
//   lastMessage: {
//     content: "Message content",
//     messageType: "text/image/video",
//     senderId: "userId",
//     senderName: "Sender Name",
//     timestamp: "2024-12-25T10:00:00Z"
//   },
//   unreadCount: 3,
//   updatedAt: "2024-12-25T10:00:00Z"
// };

const chatListFromDb = [
  {
    _id: "1",
    chatType: "private",
    chatName: "John Doe",
    chatImage: "https://randomuser.me/api/portraits/women/1.jpg",
    lastMessage: {
      content: "Hello",
      messageType: "text",
      senderId: "2",
      senderName: "John Doe",
      timestamp: "2024-12-25T10:00:00Z",
    },
    unreadCount: 1,
    updatedAt: "2024-12-25T10:00:00Z",
    isOnline: true,
  },
  {
    _id: "2",
    chatType: "private",
    chatName: "Jane Doe",
    chatImage: "https://randomuser.me/api/portraits/women/2.jpg",
    lastMessage: {
      content: "Hi",
      messageType: "text",
      senderId: "3",
      senderName: "Jane Doe",
      timestamp: "2024-12-25T10:00:00Z",
    },
    unreadCount: 2,
    updatedAt: "2024-12-25T10:00:00Z",
    isOnline: false,
  },
  {
    _id: "3",
    chatType: "group",
    chatName: "Friends forever in the world of React",
    chatImage: "https://randomuser.me/api/portraits/women/3.jpg",
    lastMessage: {
      content: "Hey boy am I glad to see you again today!",
      messageType: "text",
      senderId: "4",
      senderName: "John Doe",
      timestamp: "2024-12-25T10:00:00Z",
    },
    unreadCount: 3,
    updatedAt: "2024-12-25T10:00:00Z",
    isOnline: false,
  },
  {
    _id: "4",
    chatType: "private",
    chatName: "John Doe",
    chatImage: "https://randomuser.me/api/portraits/women/4.jpg",
    lastMessage: {
      content: "Hello",
      messageType: "text",
      senderId: "2",
      senderName: "John Doe",
      timestamp: "2024-12-25T10:00:00Z",
    },
    unreadCount: 1,
    updatedAt: "2024-12-25T10:00:00Z",
    isOnline: true,
  },
  {
    _id: "5",
    chatType: "private",
    chatName: "Jane Doe",
    chatImage: "https://randomuser.me/api/portraits/women/5.jpg",
    lastMessage: {
      content: "Hi",
      messageType: "text",
      senderId: "3",
      senderName: "Jane Doe",
      timestamp: "2024-12-25T10:00:00Z",
    },
    unreadCount: 2,
    updatedAt: "2024-12-25T10:00:00Z",
    isOnline: false,
  },
  {
    _id: "6",
    chatType: "group",
    chatName: "Friends forever in the world of React",
    chatImage: "https://randomuser.me/api/portraits/women/6.jpg",
    lastMessage: {
      content: "Hey boy am I glad to see you again today!",
      messageType: "text",
      senderId: "4",
      senderName: "John Doe",
      timestamp: "2024-12-25T10:00:00Z",
    },
    unreadCount: 3,
    updatedAt: "2024-12-25T10:00:00Z",
    isOnline: false,
  },
  {
    _id: "7",
    chatType: "private",
    chatName: "John Doe",
    chatImage: "https://randomuser.me/api/portraits/women/7.jpg",
    lastMessage: {
      content: "Hello",
      messageType: "text",
      senderId: "2",
      senderName: "John Doe",
      timestamp: "2024-12-25T10:00:00Z",
    },
    unreadCount: 1,
    updatedAt: "2024-12-25T10:00:00Z",
    isOnline: true,
  },
  {
    _id: "8",
    chatType: "private",
    chatName: "Jane Doe",
    chatImage: "https://randomuser.me/api/portraits/women/8.jpg",
    lastMessage: {
      content: "Hi",
      messageType: "text",
      senderId: "3",
      senderName: "Jane Doe",
      timestamp: "2024-12-25T10:00:00Z",
    },
    unreadCount: 2,
    updatedAt: "2024-12-25T10:00:00Z",
    isOnline: false,
  },
  {
    _id: "9",
    chatType: "group",
    chatName: "Friends forever in the world of React",
    chatImage: "https://randomuser.me/api/portraits/women/9.jpg",
    lastMessage: {
      content: "Hey boy am I glad to see you again today!",
      messageType: "text",
      senderId: "4",
      senderName: "John Doe",
      timestamp: "2024-12-25T10:00:00Z",
    },
    unreadCount: 3,
    updatedAt: "2024-12-25T10:00:00Z",
    isOnline: false,
  },
  {
    _id: "10",
    chatType: "private",
    chatName: "John Doe",
    chatImage: "https://randomuser.me/api/portraits/women/10.jpg",
    lastMessage: {
      content: "Hello",
      messageType: "text",
      senderId: "2",
      senderName: "John Doe",
      timestamp: "2024-12-25T10:00:00Z",
    },
    unreadCount: 1,
    updatedAt: "2024-12-25T10:00:00Z",
    isOnline: true,
  },
  {
    _id: "11",
    chatType: "private",
    chatName: "Jane Doe",
    chatImage: "https://randomuser.me/api/portraits/women/11.jpg",
    lastMessage: {
      content: "Hi",
      messageType: "text",
      senderId: "3",
      senderName: "Jane Doe",
      timestamp: "2024-12-25T10:00:00Z",
    },
    unreadCount: 2,
    updatedAt: "2024-12-25T10:00:00Z",
    isOnline: false,
  },
  {
    _id: "13",
    chatType: "group",
    chatName: "Friends forever in the world of React",
    chatImage: "https://randomuser.me/api/portraits/women/13.jpg",
    lastMessage: {
      content: "Hey boy am I glad to see you again today!",
      messageType: "text",
      senderId: "4",
      senderName: "John Doe",
      timestamp: "2024-12-25T10:00:00Z",
    },
    unreadCount: 3,
    updatedAt: "2024-12-25T10:00:00Z",
    isOnline: false,
  },
];

const ChatListing = () => {
  const [chatList, setChatList] = useState<IChatList[]>([]);

  useEffect(() => {
    // Fetch chat list from database
    setChatList(chatListFromDb);
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
