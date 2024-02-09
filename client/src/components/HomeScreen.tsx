import CountDownModal from "./CountDownModal";
import { useNavigate } from "react-router-dom";
import "../CSS/HomeScreen.css";
import LoadingModal from "./LoadingModal";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "./SocketContext";
import { getCookie } from "./network/user-api";
import GetUser from "./GetUser";


interface Player {
    playerName: string | null;
    playerID: string | null;
}


function HomeScreen() {
    const socket = useContext(SocketContext);
    const navigate = useNavigate();
    const [loadingGame, setLoadingGame] = useState(false);
    const [showCountDownModal, setShowCountDownModal] = useState(false);
    const [opponent, setOpponent] = useState<Player>({playerName: "", playerID: ""});


    const playerName = getCookie("name");
    const userID = getCookie("userId");
    const player : Player = {
        playerName: playerName,
        playerID : userID
    }


    socket.emit("player", player);


    useEffect(() => {
        socket.on("matchFound", () => {
            setShowCountDownModal(true);
            setLoadingGame(false);


            socket.on("player", (player) => {
                setOpponent(player);
            });
        });


        return () => {
            socket.off("matchFound");
            socket.off("player-name");
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
            <div className="homescreen">
                <GetUser />
                <h1>Guessing Words Game</h1>


                <div className="d-grid gap-2  mx-auto">
                    <button
                        type="button"
                        className="btn btn-primary mt-5"
                        onClick={() => {
                            setLoadingGame(true);
                            findingAMatch();
                        }}
                    >
                        Play
                    </button>


                    <button
                        type="button"
                        className="btn btn-primary mt-3"
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
                            navigate("/game", {
                                state: {
                                    opponent: opponent
                                },
                            });
                        }}
                    />
                )}
            </div>
        </>
    );
}


export default HomeScreen;
