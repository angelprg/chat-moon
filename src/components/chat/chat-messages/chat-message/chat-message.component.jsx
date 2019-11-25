import React from "react";

import "./chat-message.styles.scss";

const ChatMessage = ({ msg }) => {
  return (
    <div className={`msg-box msg-${msg.type}`}>
      <div className="msg-header">
        <span className="msg-from">
          {msg.type !== "admin" ? msg.from : null}
        </span>
        <span className="msg-timestamp">{msg.timestamp}</span>
      </div>
      <div className="msg-text">{msg.text}</div>
    </div>
  );
};

export default ChatMessage;
