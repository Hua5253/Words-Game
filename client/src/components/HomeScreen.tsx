import CountDownModal from "./CountDownModal";
import { useNavigate } from "react-router-dom";
import "../CSS/HomeScreen.css";
import LoadingModal from "./LoadingModal";
import GetUser from "./GetUser";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "./SocketContext";

function HomeScreen() {
    const socket = useContext(SocketContext);
    const navigate = useNavigate();
    const [loadingGame, setLoadingGame] = useState(false);
    const [showCountDownModal, setShowCountDownModal] = useState(false);

    useEffect(() => {
        socket.on("matchFound", (data: { roomId: string }) => {
            // console.log("Match found!", data);
            setShowCountDownModal(true);
            setLoadingGame(false);
        });

        return () => {
            socket.off("matchFound");
        };
    }, []);

    const transitToCountDown = () => {
        setLoadingGame(false);
    };

    const findingAMatch = () => {
        socket.emit("finding-a-match");
    };

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
                            findingAMatch();
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
                    socket={socket}
                />
                {showCountDownModal && (
                    <CountDownModal
                        timeout={3}
                        closeModal={() => {
                            setShowCountDownModal(false);
                            navigate("/game");
                        }}
                    />
                )}
            </div>
        </>
    );
}

export default HomeScreen;
