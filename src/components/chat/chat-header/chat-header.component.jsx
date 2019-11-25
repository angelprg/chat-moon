import React from "react";
import SVG from "react-inlinesvg";

import MoonsIcon from "../../../assets/icons/moons-icon.svg";
import SettingsIcon from "../../../assets/icons/settings-icon.svg";
import "./chat-header.styles.scss";

const ChatHeader = ({ username }) => {
  return (
    <div id="chat-header">
      <SVG src={MoonsIcon} className="moons-icon" />
      <div className="username">{username}</div>
      <SVG src={SettingsIcon} className="settings-icon" />
    </div>
  );
};

export default ChatHeader;
