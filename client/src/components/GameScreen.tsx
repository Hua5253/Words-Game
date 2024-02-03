import React from "react";
import "./GameScreen.css";
import GameBoard from "./GameBoard";
import ChatBox from "./ChatBox";

export default function GameScreen() {
  return (
    <div className="gamescreen position-relative ">
      {/* Game Record Board */}
      <div className="position-absolute top-0 start-0 gameboard">
        <GameBoard />
      </div>
      {/* Chat Box */}
      <div className="chat">
        <ChatBox />
      </div>
    </div>
  );
}
