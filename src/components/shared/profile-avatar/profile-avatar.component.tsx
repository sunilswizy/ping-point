import React from "react";
import "./profile-avatar.styles.css";

interface IProfileProps {
  imageUrl: string;
  isOnline: boolean;
}

const ProfileAvatar: React.FC<IProfileProps> = ({ imageUrl, isOnline }) => (
  <div className="profile-avatar-container">
    <img src={imageUrl} alt="Profile" />
    <span className={`badge ${isOnline ? "online" : "offline"}`}></span>
  </div>
);

export default ProfileAvatar;
