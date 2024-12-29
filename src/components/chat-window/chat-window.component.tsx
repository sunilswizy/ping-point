import "./chat-window.styles.css";
import ChatWindowHeader from "../chat-window-header/chat-window-header.component";
import { useEffect, useState } from "react";
import { IChatData, IMessage } from "../../enums/chat.enum";
import MessageListing from "../message-listing/message-listing.component";
import MessageInput from "../shared/message-input/message-input.component";
import { getData } from "../../service/api-service";
import { useNavigate, useParams } from "react-router-dom";
import emptyConversation from "../../assets/empty-conversation.svg";
import { NEW_MESSAGE } from "../../enums/socket.types";
import { Socket } from "socket.io-client";

interface IChatListing {
  userStatus: { username: string; status: string };
  socket: Socket | null;
}

const ChatWindow: React.FC<IChatListing> = ({ userStatus, socket }) => {
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
  }, [chatId, navigate, user.id]);

  useEffect(() => {
    setChatData((prevData) => {
      if (!prevData) return null;
      return {
        ...prevData,
        isOnline: userStatus.status === "online",
        lastSeen: new Date().toISOString(),
      };
    });
  }, [userStatus]);

  useEffect(() => {
    if (!socket) return;

    socket.on(NEW_MESSAGE, (newMessage) => {
      if (
        newMessage.recipientId === chatId ||
        newMessage.groupId === chatId ||
        newMessage.senderId === chatId
      ) {
        setChatData((prevData) => {
          if (!prevData) return null;
          return {
            ...prevData,
            messages: [...prevData.messages, newMessage],
          };
        });
      }
    });

    return () => {
      socket.off(NEW_MESSAGE);
    };
  }, [socket, chatId, user.id]);

  const sendMessage = async (
    message: string,
    messageType: string,
    mediaUrl = ""
  ) => {
    const payload = {
      receiverUsername: chatData?.chatName,
      senderUsername: user.username,
      senderId: user.id,
      content: message,
      messageType,
      mediaUrl,
      ...(chatData?.chatType === "private" && { recipientId: chatId }),
      ...(chatData?.chatType === "group" && { groupId: chatId }),
    };

    if (socket) {
      socket.emit(NEW_MESSAGE, payload);
    }
  };

  useEffect(() => {
    setMessage("");
    setChatDataListing(chatData?.messages || []);
  }, [chatData]);

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
