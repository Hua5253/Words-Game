import CountDownModal from "./CountDownModal";
import { useNavigate } from 'react-router-dom'
import "./HomeScreen.css";
import LoadingModal from "./LoadingModal";
import GetUser from "./GetUser";
function HomeScreen() {
  const navigate = useNavigate()

  //   const [loading, setLoading] = useState(true);
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
            // data-bs-target="#countdownModal"
          >
            Play
          </button>

          <button type="button" className="btn btn-primary mt-3" onClick={()=>{navigate('/stats')}}>
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
