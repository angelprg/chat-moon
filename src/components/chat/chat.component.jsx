import React, { useState, useEffect } from "react";
import io from "socket.io-client";

import ChatHeader from "./chat-header/chat-header.component";
import ChatMessages from "./chat-messages/chat-messages.component";
import ChatInput from "./chat-input/chat-input.component";

import "./chat.styles.scss";
/*
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
*/
let socket = null;

const Chat = ({ username, setUsername }) => {
  // Si el usuario se desconecta o se pierde la conexión, se comienza reinicio del Socket
  if (socket && socket.disconnected) {
    socket = null;
    setUsername("");
  }

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const socketConnect = () => {
    if (!socket && username) {
      socket = io();
      socket.emit("join", username, error => {
        if (error) {
          alert("Error: " + error);
          socketDisconnect();
        }
      });
    }
  };

  const socketDisconnect = () => {
    console.log("leave", socket);
    if (socket) {
      socket.emit("leave");
      socket.disconnect();
    }
    socket = null;
    setUsername("");
  };

  useEffect(() => {
    socketConnect();
  }, [username]);

  useEffect(() => {
    if (message) socket.emit("userMessage", message, () => setMessage(""));
  }, [message]);

  useEffect(() => {
    if (socket && username) {
      socket.on("message", msg => {
        console.log(msg);
        msg.type =
          msg.from === username
            ? "me"
            : msg.from === "Admin"
            ? "admin"
            : "other";
        setMessages([...messages, msg]);
      });
    }
  }, [messages]);

  return (
    <div id="chat">
      <ChatHeader
        username={username}
        clearUser={() => {
          socketDisconnect();
        }}
      />
      <ChatMessages messages={messages} />
      <ChatInput setMessage={setMessage} />
    </div>
  );
};

export default Chat;
