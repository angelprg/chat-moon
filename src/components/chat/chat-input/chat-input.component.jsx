import React, { useState } from "react";
import "./chat-input.styles.scss";

const ChatInput = ({ setMessage }) => {
  const [chatInput, setChatInput] = useState("");

  const handleSend = () => {
    if (chatInput !== "") {
      setMessage(chatInput);
      setChatInput("");
    }
  };
  return (
    <div id="chat-input">
      <input
        className="chat-input"
        type="text"
        value={chatInput}
        onChange={event => setChatInput(event.target.value)}
        onKeyPress={event => {
          if (event.key === "Enter") {
            handleSend();
          }
        }}
      />
      <button className="chat-send" onClick={() => handleSend()}>
        Enviar
      </button>
    </div>
  );
};

export default ChatInput;
