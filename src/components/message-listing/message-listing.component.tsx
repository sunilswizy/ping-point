import { useEffect, useRef } from "react";
import { IMessage } from "../../enums/chat.enum";
import Message from "../message/message.component";
import "./message-listing.styles.css";

interface IMessageListing {
  messages: IMessage[];
}

const MessageListing: React.FC<IMessageListing> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="message-listing">
      {messages.map((message) => {
        return (
          <Message
            key={message._id}
            message={message}
            isCurrentUser={message.senderId === user.id}
          />
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageListing;
