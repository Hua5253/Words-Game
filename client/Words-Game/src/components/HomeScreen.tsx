import CountDownModal from "./CountDownModal";
import "./HomeScreen.css";
import LoadingModal from "./LoadingModal";
// import React, { useState } from "react";

function HomeScreen() {
  //   const [loading, setLoading] = useState(true);
  return (
    <>
      <div className="homescreen">
        <div className="greeting">
          Hello, <input type="text" className="name-input" />
        </div>
        <h1>Guessing Words Game</h1>

        <div className="d-grid gap-2  mx-auto">
          <button
            type="button"
            className="btn btn-primary mt-5"
            data-bs-toggle="modal"
            data-bs-target="#loadingModal"
            // data-bs-target="#countdownModal"
          >
            Play
          </button>

          <button type="button" className="btn btn-primary mt-3">
            View Stats
          </button>
        </div>

        <LoadingModal />
        <CountDownModal />
      </div>
    </>
  );
}

export default HomeScreen;
