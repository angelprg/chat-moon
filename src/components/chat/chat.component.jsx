import React, { useState, useEffect } from "react";
import io from "socket.io-client";

import ChatHeader from "./chat-header/chat-header.component";
import ChatMessages from "./chat-messages/chat-messages.component";
import ChatInput from "./chat-input/chat-input.component";

import "./chat.styles.scss";
let socket = null;

const Chat = ({ username, setUsername }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  // Si el usuario se desconecta o se pierde la conexión, se comienza reinicio del Socket
  if (socket && socket.disconnected) {
    socket = null;
    setUsername("");
  }

  // Conecar al socket y mostrar posibles mensajes de error
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

  // Avisar al socket de salida y desconectar
  const socketDisconnect = () => {
    if (socket) {
      socket.emit("leave", () => socket.disconnect());
    }
    socket = null;
    setUsername("");
  };

  // Esperar inicio de conexión a socket
  useEffect(() => {
    socketConnect();
  }, [username]);

  // Esperar envío de mensajes al socket
  useEffect(() => {
    if (message) socket.emit("userMessage", message, () => setMessage(""));
  }, [message]);

  // Esperar envío de mensajes desde el socket
  useEffect(() => {
    if (socket && username) {
      socket.on("message", msg => {
        msg.type =
          msg.from === username
            ? "me"
            : msg.from === "Admin"
            ? "admin"
            : "other";
        setMessages([...messages, msg]);
      });
    }

    // cada vez que se procesa un mensaje, se limpia el "listener" y hasta que llegue un nuevo mensaje
    return () => {
      if (socket) {
        socket.off();
      }
    };
  }, [messages]);

  return (
    <div id="chat">
      <ChatHeader username={username} clearUser={() => socketDisconnect()} />
      <ChatMessages messages={messages} />
      <ChatInput setMessage={setMessage} />
    </div>
  );
};

export default Chat;
