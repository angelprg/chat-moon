import React, { useState } from "react";
import SVG from "react-inlinesvg";

import LogoMoons from "../../assets/icons/moons.svg";
import "../app/app.styles.scss";
import "./chat-config.styles.scss";

const ChatConfig = ({ setUsername }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSetUsername = () => {
    if (inputValue === "") {
      alert("El nombre de usuario es obligatorio");
      return;
    }
    setUsername(inputValue);
    setInputValue("");
  };

  return (
    <div className="chat-config">
      <h2>CHAT</h2>
      <SVG src={LogoMoons} className="logo" />
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={inputValue}
        onChange={event => setInputValue(event.target.value)}
        onKeyPress={event => {
          if (event.key === "Enter") {
            handleSetUsername();
          }
        }}
      />
      <button onClick={handleSetUsername}>Entrar</button>
    </div>
  );
};

export default ChatConfig;
