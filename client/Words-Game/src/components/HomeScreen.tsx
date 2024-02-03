import "./HomeScreen.css";
import LoadingModal from "./LoadingModal";
import GetUser from "./GetUser";
function HomeScreen() {
  return (
    <>
      <div className="homescreen">
        <GetUser/>
        <h1>Guessing Words Game</h1>

        <div className="d-grid gap-2  mx-auto">
          <button
            type="button"
            className="btn btn-primary mt-5"
            data-bs-toggle="modal"
            data-bs-target="#loadingModal"
          >
            Play
          </button>

          <button type="button" className="btn btn-primary mt-3">
            View Stats
          </button>
        </div>

        <LoadingModal />
      </div>
    </>
  );
}

export default HomeScreen;
