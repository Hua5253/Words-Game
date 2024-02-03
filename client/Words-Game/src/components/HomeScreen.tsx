import "./HomeScreen.css";
import LoadingModal from "./LoadingModal";

function HomeScreen() {
  return (
    <div className="homescreen">
      <div className="greeting">
        Hello, <input type="text" className="name-input" />
      </div>
      <h1>Guessing Words Game</h1>
      <button
        type="button"
        className="btn btn-primary mt-5"
        data-bs-toggle="modal"
        data-bs-target="#loadingModal"
      >
        Play
      </button>

      <LoadingModal />

      <button type="button" className="btn btn-primary mt-3">
        View Stats
      </button>
    </div>
  );
}

export default HomeScreen;
