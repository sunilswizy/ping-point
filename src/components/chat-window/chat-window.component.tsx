import "./chat-window.styles.css";
import ChatWindowHeader from "../chat-window-header/chat-window-header.component";
import { useEffect, useState } from "react";
import { IChatData } from "../../enums/chat.enum";
import MessageListing from "../message-listing/message-listing.component";
import MessageInput from "../shared/message-input/message-input.component";

const chatDataFromDB: IChatData = {
  _id: "1",
  chatType: "private",
  chatName: "John Doe",
  chatImage: "https://randomuser.me/api/portraits/men/11.jpg",
  members: ["1", "2"],
  messages: [
    {
      _id: "1",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      messageType: "text",
      senderId: "1",
      senderName: "John Doe",
      timestamp: "2021-09-01T10:00:00.000Z",
      chatImage: "https://randomuser.me/api/portraits/men/13.jpg",
    },
    {
      _id: "2",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      messageType: "text",
      senderId: "2",
      senderName: "Jane Doe",
      timestamp: "2021-09-01T10:01:00.000Z",
      chatImage: "https://randomuser.me/api/portraits/men/12.jpg",
    },
    {
      _id: "3",
      content: "How are you?",
      messageType: "text",
      senderId: "1",
      senderName: "John Doe",
      timestamp: "2021-09-01T10:02:00.000Z",
      chatImage: "https://randomuser.me/api/portraits/men/15.jpg",
    },
    {
      _id: "4",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      messageType: "text",
      senderId: "2",
      senderName: "Jane Doe",
      timestamp: "2021-09-01T10:03:00.000Z",
      chatImage: "https://randomuser.me/api/portraits/men/16.jpg",
    },
  ],
  createdAt: "2021-09-01T10:00:00.000Z",
  updatedAt: "2021-09-01T10:03:00.000Z",
  lastSeen: "2021-09-01T10:03:00.000Z",
  isOnline: true,
};

const ChatWindow = () => {
  const [chatData, setChatData] = useState<IChatData | null>(null);

  useEffect(() => {
    setChatData(chatDataFromDB);
  }, []);

  return (
    <div className="chat-window-container">
      {chatData && (
        <>
          <ChatWindowHeader {...chatData} />
          <div className="chat-window-body">
            <div className="chat-window-messages">
              <MessageListing messages={chatData.messages} />
            </div>
            <div className="chat-window-footer">
              <MessageInput />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatWindow;
