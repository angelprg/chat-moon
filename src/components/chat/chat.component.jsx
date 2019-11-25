import React, { useState, useEffect } from "react";

import ChatHeader from "./chat-header/chat-header.component";
import ChatMessages from "./chat-messages/chat-messages.component";
import ChatInput from "./chat-input/chat-input.component";

import "./chat.styles.scss";

const dummy_messages = [
  {
    from: "Admin",
    text: "Bienvenido",
    timestamp: new Date().toLocaleTimeString().slice(0, -3),
    type: "admin"
  },
  {
    from: "Angel",
    text: "Hola",
    timestamp: new Date().toLocaleTimeString().slice(0, -3),
    type: "me"
  },
  {
    from: "Jessica",
    text: "cmo tás?",
    timestamp: new Date().toLocaleTimeString().slice(0, -3),
    type: "other"
  },
  {
    from: "Angel",
    text: "Bien, y tú?",
    timestamp: new Date().toLocaleTimeString().slice(0, -3),
    type: "me"
  },
  {
    from: "Jessica",
    text: "También",
    timestamp: new Date().toLocaleTimeString().slice(0, -3),
    type: "other"
  }
];

const Chat = ({ username }) => {
  const [messages, setMessages] = useState(dummy_messages);
  const [message, setMessage] = useState("");

  //useEffect(()=>{},message);
  return (
    <div id="chat">
      <ChatHeader username={username} />
      <ChatMessages messages={messages} />
      <ChatInput message={message} setMessage={setMessage} />
    </div>
  );
};

export default Chat;
