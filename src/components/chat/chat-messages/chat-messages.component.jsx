import React from "react";

import ChatMessage from "./chat-message/chat-message.component";
import "./chat-messages.styles.scss";

const ChatMessages = ({ messages }) => {
  return (
    <div id="messages-box">
      {messages.map((msg, index) => (
        <ChatMessage key={index} msg={msg} />
      ))}
    </div>
  );
};

export default ChatMessages;
