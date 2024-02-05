import "../CSS/GameScreen.css";
import GameBoard from "./GameBoard";
import ChatBox from "./ChatBox";
import { SocketContext } from "./SocketContext";
import { useContext } from "react";

export default function GameScreen() {
    const socket = useContext(SocketContext);

    return (
        <div className='gamescreen position-relative '>
            {/* Game Record Board */}
            <GameBoard />
            {/* Chat Box */}
            <div className='chat'>
                <ChatBox socket={socket} />
            </div>
        </div>
    );
}
