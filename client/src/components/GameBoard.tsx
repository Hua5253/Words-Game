import React from "react";
import PlayerMoveRecord from "./PlayerMoveRecord";

export default function GameBoard() {
  return (
    <div className="gameboard">
      <div className="record grid gap-0 row-gap-3">
        <div className="p-2 g-col-6">
          <PlayerMoveRecord />
        </div>
        <div className="p-2 g-col-6">
          <PlayerMoveRecord />
        </div>
      </div>

      {/* Input box */}
      <div id="guess-input">
        <form className="input-group mb-3">
          <input type="text" placeholder="Enter your word" />
          <button className="btn btn-primary" type="button">
            Guess
          </button>
        </form>
      </div>
    </div>
  );
}
