import React, { useRef, useState } from "react";
import io from "socket.io-client"
import { useEffect } from "react"
import Login from "./login/login";

const socket = io.connect("http://localhost:3001")

function App() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 600 }}>
      <Login />
    </div>
  )

}

export default App;
