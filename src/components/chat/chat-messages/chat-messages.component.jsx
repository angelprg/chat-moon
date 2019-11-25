import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";

import ChatMessage from "./chat-message/chat-message.component";
import "./chat-messages.styles.scss";

const ChatMessages = ({ messages }) => {
  return (
    <ScrollToBottom className="messages-box">
      {messages.map((msg, index) => (
        <ChatMessage key={index} msg={msg} />
      ))}
    </ScrollToBottom>
  );
};

export default ChatMessages;
