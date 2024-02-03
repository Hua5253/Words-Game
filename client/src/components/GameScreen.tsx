import React from "react";
import "./GameScreen.css";
import GameBoard from "./GameBoard";

export default function GameScreen() {
  return (
    <div className="gamescreen position-relative ">
      {/* Game Record Board */}
      <div className="position-absolute top-0 start-0 mh-100">
        <GameBoard />
      </div>
      {/* Chat Box */}
    </div>
  );
}
