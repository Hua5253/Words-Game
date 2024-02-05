import PlayerMoveRecord from "./PlayerMoveRecord";

export default function GameBoard() {
    return (
        <div className="gameComponents">
            <div className="record">
                <div className="pe-2 g-col-6">
                    <PlayerMoveRecord />
                </div>
                <div className="g-col-6">
                    <PlayerMoveRecord />
                </div>
            </div>

            {/* Input box */}
            <div id="token-input">
                <form className="input-group mb-3">
                    <input
                        type="text"
                        placeholder="Word for your opponent to guess"
                    />
                    <button className="btn btn-primary" type="button">
                        Guess
                    </button>
                </form>
            </div>
            <div id="guess-input">
                <form className="input-group mb-3">
                    <input type="text" placeholder="Enter your word" />
                    <button className="btn btn-primary" type="button">
                        Guess
                    </button>
                </form>
            </div>
        </div>
    );
}
