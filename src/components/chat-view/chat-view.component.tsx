import { useEffect, useState } from "react";
import ChatListing from "../chat-listing/chat-listing.component";
import ChatWindow from "../chat-window/chat-window.component";
import "./chat-view.styles.css";
import { io } from "socket.io-client";
import { ONLINE_STATUS } from "../../enums/socket.types";

const ChatView = () => {
  const [userStatus, setUserStatus] = useState<{
    username: string;
    status: string;
  }>({ username: "", status: "" });

  useEffect(() => {
    const socket = io("http://localhost:3000");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    socket.on("connect", () => {
      socket.emit(ONLINE_STATUS, { username: user.username, status: "online" });
    });

    // Handle online status
    socket.on(ONLINE_STATUS, (data) => {
      setUserStatus(data);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      socket.emit(ONLINE_STATUS, {
        username: user.username,
        status: "offline",
      });
    });

    const handleBeforeUnload = () => {
      socket.emit(ONLINE_STATUS, {
        username: user.username,
        status: "offline",
      });
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      socket.emit(ONLINE_STATUS, {
        username: user.username,
        status: "offline",
      });
      socket.disconnect();
    };
  }, []);

  return (
    <div className="chat-view">
      <ChatListing userStatus={userStatus} />
      <ChatWindow userStatus={userStatus} />
    </div>
  );
};

export default ChatView;
