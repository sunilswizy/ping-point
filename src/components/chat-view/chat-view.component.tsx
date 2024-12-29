import { useEffect, useState } from "react";
import ChatListing from "../chat-listing/chat-listing.component";
import ChatWindow from "../chat-window/chat-window.component";
import "./chat-view.styles.css";
import { io, Socket } from "socket.io-client";
import { NEW_MESSAGE, ONLINE_STATUS } from "../../enums/socket.types";

const ChatView = () => {
  const [userStatus, setUserStatus] = useState<{
    username: string;
    status: string;
  }>({ username: "", status: "" });
  const [socket, setSocket] = useState<Socket | null>(null);
  const [newMessage, setNewMessage] = useState<any>();

  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    newSocket.on("connect", () => {
      newSocket.emit(ONLINE_STATUS, {
        username: user.username,
        status: "online",
      });
    });

    newSocket.on(ONLINE_STATUS, (data) => {
      setUserStatus(data);
    });

    newSocket.on("disconnect", () => {
      newSocket.emit(ONLINE_STATUS, {
        username: user.username,
        status: "offline",
      });
    });

    newSocket.on(NEW_MESSAGE, (newMessage) => {
      setNewMessage(newMessage);
    });

    const handleBeforeUnload = () => {
      newSocket.emit(ONLINE_STATUS, {
        username: user.username,
        status: "offline",
      });
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    setSocket(newSocket);

    return () => {
      newSocket.emit(ONLINE_STATUS, {
        username: user.username,
        status: "offline",
      });
      window.removeEventListener("beforeunload", handleBeforeUnload);
      newSocket.disconnect();
    };
  }, []);

  return (
    <div className="chat-view">
      <ChatListing userStatus={userStatus} newMessage={newMessage} />
      <ChatWindow userStatus={userStatus} socket={socket} />
    </div>
  );
};

export default ChatView;
