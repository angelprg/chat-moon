import React from "react";
import "./chat-input.styles.scss";

const ChatInput = () => {
  return (
    <div id="chat-input">
      <input className="chat-input" type="text" />
      <button className="chat-send">Enviar</button>
    </div>
  );
};

export default ChatInput;
