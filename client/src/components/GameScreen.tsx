import "../CSS/GameScreen.css";
import GameBoard from "./GameBoard";
import ChatBox from "./ChatBox";

export default function GameScreen() {
    return (
        <div className='gamescreen position-relative '>
            {/* Game Record Board */}
            <GameBoard />
            {/* Chat Box */}
            <div className='chat'>
                <ChatBox />
            </div>
        </div>
    );
}
