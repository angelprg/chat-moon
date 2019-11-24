import React, { useState } from "react";
const ip = require("ip");

import ChatConfig from "../chat-config/chat-config.component";
import Chat from "../chat/chat.component";

//console.log(ip.address());

const App = () => {
  const [username, setUsername] = useState("");

  return username === "" ? <ChatConfig setUsername={setUsername} /> : <Chat />;
};

export default App;
