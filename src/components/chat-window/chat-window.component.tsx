import "./chat-window.styles.css";
import ChatWindowHeader from "../chat-window-header/chat-window-header.component";
import { useEffect, useState } from "react";
import { IChatData, IMessage } from "../../enums/chat.enum";
import MessageListing from "../message-listing/message-listing.component";
import MessageInput from "../shared/message-input/message-input.component";
import { getData, postData } from "../../service/api-service";

const ChatWindow = () => {
  const [chatData, setChatData] = useState<IChatData | null>(null);
  const [chatDataListing, setChatDataListing] = useState<IMessage[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchChatData = async () => {
      const response = await getData(
        "messages/conversation/676ed7ac39f371fafb576a16/676ed7a639f371fafb576a13"
      );
      setChatData(response);
      setChatDataListing(response.messages);
    };

    fetchChatData();
  }, []);

  const sendMessage = async (
    message: string,
    messageType: string,
    mediaUrl = ""
  ) => {
    const response = await postData("messages", {
      recipientId: "676ed7ac39f371fafb576a16",
      senderId: "676ed7a639f371fafb576a13",
      content: message,
      messageType,
      mediaUrl,
    });

    setChatData((prevData) => {
      if (prevData) {
        return {
          ...prevData,
          messages: [...prevData.messages, response],
        };
      }
      return null;
    });
  };

  const onSearchMessage = (text: string) => {
    const messages = chatData?.messages;
    if (!messages) return;
    const filteredMessages = messages.filter((message) =>
      message.content.toLowerCase().includes(text.toLowerCase())
    );
    setChatDataListing(filteredMessages);
  };

  return (
    <div className="chat-window-container">
      {chatData && (
        <>
          <ChatWindowHeader
            chatData={chatData}
            onSearchMessage={onSearchMessage}
          />
          <div className="chat-window-body">
            <div className="chat-window-messages">
              <MessageListing messages={chatDataListing} />
            </div>
            <div className="chat-window-footer">
              <MessageInput
                message={message}
                setMessage={setMessage}
                sendMessage={sendMessage}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatWindow;
