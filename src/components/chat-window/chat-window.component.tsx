import "./chat-window.styles.css";
import ChatWindowHeader from "../chat-window-header/chat-window-header.component";
import { useEffect, useState } from "react";
import { IChatData, IMessage } from "../../enums/chat.enum";
import MessageListing from "../message-listing/message-listing.component";
import MessageInput from "../shared/message-input/message-input.component";
import { getData, postData } from "../../service/api-service";
import { useNavigate, useParams } from "react-router-dom";
import emptyConversation from "../../assets/empty-conversation.svg";

const ChatWindow = () => {
  const [chatData, setChatData] = useState<IChatData | null>(null);
  const [chatDataListing, setChatDataListing] = useState<IMessage[]>([]);
  const [message, setMessage] = useState("");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const { chatId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChatData = async () => {
      try {
        if (!chatId) {
          navigate("/");
          return;
        }

        const response = await getData(
          `messages/conversation/${chatId}/${user.id}`
        );
        setChatData(response);
        setChatDataListing(response.messages);
      } catch {
        navigate("/");
      }
    };

    fetchChatData();
  }, []);

  const sendMessage = async (
    message: string,
    messageType: string,
    mediaUrl = ""
  ) => {
    const response = await postData("messages", {
      recipientId: chatId,
      senderId: user.id,
      content: message,
      messageType,
      mediaUrl,
    });

    if (!response) return;
    console.log(response);

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
      {chatData ? (
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
      ) : (
        <div className="empty-conversation">
          <div className="empty-conversation-image">
            <img src={emptyConversation} alt="Empty Conversation" />
          </div>
          <div>
            <h2>Select Chat to Begin a Conversation</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
