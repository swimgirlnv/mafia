import "./App.css";
import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";

// @ts-ignore
const socket = io.connect("http://localhost:3001");

// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Lobby from "./Lobby";

function App() {
  const room = useRef<string>("");

  const joinRoom = () => {
    if (room.current !== "") {
      // socket.emit("join_room", room);
    }
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={<Home room={room.current} joinRoom={() => joinRoom()} />}
          />
          <Route path="/lobby" element={<Lobby />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
