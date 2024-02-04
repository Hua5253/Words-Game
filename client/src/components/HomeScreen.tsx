import CountDownModal from "./CountDownModal";
import { useNavigate } from "react-router-dom";
import "../CSS/HomeScreen.css";
import LoadingModal from "./LoadingModal";
import GetUser from "./GetUser";
import { useState } from "react";

function HomeScreen() {
    const navigate = useNavigate();
    const [loadingGame, setLoadingGame] = useState(false);
    const [inCountDown, setInCountDown] = useState(false);

    function transitToCountDown() {
        setInCountDown(true);
        setLoadingGame(false);
    }

    return (
        <>
            <div className='homescreen'>
                <GetUser />
                <h1>Guessing Words Game</h1>

                <div className='d-grid gap-2  mx-auto'>
                    <button
                        type='button'
                        className='btn btn-primary mt-5'
                        onClick={() => {
                            setLoadingGame(true);
                        }}
                    >
                        Play
                    </button>

                    <button
                        type='button'
                        className='btn btn-primary mt-3'
                        onClick={() => {
                            navigate("/stats");
                        }}
                    >
                        View Stats
                    </button>
                </div>

                <LoadingModal
                    loadingGame={loadingGame}
                    setInCountDown={transitToCountDown}
                />
                <CountDownModal inCountDown={inCountDown} />
            </div>
        </>
    );
}

export default HomeScreen;
