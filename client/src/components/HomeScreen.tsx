import CountDownModal from "./CountDownModal";
import { useNavigate } from "react-router-dom";
import "../CSS/HomeScreen.css";
import LoadingModal from "./LoadingModal";
import GetUser from "./GetUser";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const socket: Socket = io("http://localhost:3000");

function HomeScreen() {
    const navigate = useNavigate();
    const [loadingGame, setLoadingGame] = useState(false);
    const [inCountDown, setInCountDown] = useState(false);

    useEffect(() => {
        socket.on("matchFound", (data: { roomId: string }) => {
            console.log("Match found!", data);
            // Navigate to game session or update UI accordingly
        });

        return () => {
            socket.off("matchFound");
        };
    }, []);

    const transitToCountDown = () => {
        setInCountDown(true);
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
                <CountDownModal inCountDown={inCountDown} />
            </div>
        </>
    );
}

export default HomeScreen;
