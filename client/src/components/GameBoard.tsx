import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import PlayerMoveRecord from "./PlayerMoveRecord";
import { wordToGuessSchema, yourGuessScheme } from "../data/validate";
import { SocketContext } from "./SocketContext";
import { useLocation } from "react-router-dom";
import { getCookie, getUserByName, updateuser } from "./network/user-api";
import { newMatch } from "./network/user-api";
import ResultModal from "./ResultModel";

interface Player {
    playerName: string | null;
    playerID: string | null;
}
interface NavigationState {
    username: string;
    opponent: Player;
}

interface GuessResult {
    guess: string;
    corrects: number;
}

export default function GameBoard() {
    const [wordToGuess, setWordToGuess] = useState<string>("");
    const [yourGuess, setYourGuess] = useState<string>("");
    const [yourGuessError, setYourGuessError] = useState<string>("");
    const [wordToGuessError, setWordToGuessError] = useState<string>("");
    const [wordSend, setWordSend] = useState<boolean>(false);
    const [opponentWordToGuess, setOpponentWordToGuess] = useState("");
    const [myGuessResults, setMyGuessResults] = useState<GuessResult[]>([]);
    const [opponentGuessResults, setOpponentGuessResults] = useState<
        GuessResult[]
    >([]);
    const [winner, setWinner] = useState<string>("");
    const [isMyTurn, setTurn] = useState<boolean>(false);

    const [end, setEnd] = useState<boolean>(false);

    const location = useLocation();
    const { username, opponent }: NavigationState = location.state || {}; // Destructure the passed state

    const socket = useContext(SocketContext);

    // socket.on("opponentGuessResult", (wordResult) => {
    //     setOpponentGuessResults([...opponentGuessResults, wordResult]);
    // });

    useEffect(() => {
        socket.on("guessWord", (wordToGuess) => {
            console.log(wordToGuess);
            setOpponentWordToGuess(wordToGuess);
        });

        socket.on("myturn", (turnBool) => {
            console.log("setting my turn to " + turnBool);
            setTurn(turnBool);
        });

        const handleOpponentGuessResult = (data: GuessResult) => {
            setOpponentGuessResults((prevData) => [...prevData, data]);
        };

        socket.on("opponentGuessResult", handleOpponentGuessResult);

        socket.on("end", () => {
            console.log(opponent.playerName);
            if (opponent.playerName) {
                setWinner(opponent.playerName);
            }
            socket.emit("update-stats");
            const userID = getCookie("userId");
            if (userID) {
                updateUserByID(userID, false);
            }

            setEnd(true);
        });

        return () => {
            socket.off("guessWord");
            socket.off("opponentGuessResult");
            socket.off("end");
            socket.off("myturn");
        };
    }, []);

    const handleWordToGuessChange = (e: ChangeEvent<HTMLInputElement>) => {
        setWordToGuess(e.target.value);
        setWordToGuessError("");
    };

    const submitWordToGuess = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //Here is where you then verify if the word set is valid
        const { error } = wordToGuessSchema.validate(wordToGuess);

        if (error) {
            console.log(error);
            setWordToGuessError(error.details[0].message);
            //do we need to store error?
        } else {
            alert("The word to guess is: " + wordToGuess);
            setWordToGuessError("");
            setWordSend(true);

            //following is sending the word to the back end
            socket.emit("guessWordReady", wordToGuess);
        }

        // setWordToGuess("");
    };

    const handleYourGuessChange = (e: ChangeEvent<HTMLInputElement>) => {
        setYourGuess(e.target.value);
        setYourGuessError("");
    };

    const submitYourGuess = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //Here is where you then verify if the word set is valid
        const { error } = yourGuessScheme.validate(yourGuess);

        //first check if the word set is valid in terms of if it is a valid word
        if (error) {
            console.log(error);
            setYourGuessError(error.details[0].message);
            return;
        }

        console.log("your guess: ", yourGuess);

        // guess is correct, game over
        if (yourGuess.toLowerCase() === opponentWordToGuess.toLowerCase()) {
            console.log("go to game result modal");
            // send the result to the server
            const userID = getCookie("userId");
            if (username) {
                setWinner(username);
            }
            socket.emit("end");
            // console.log(opponent.playerID);

            if (userID) {
                updateUserByID(userID, true);
            }

            // send the result to the server -> game ended signal

            setEnd(true);
            return;
        }

        // guess is not correct
        const correctCharacters = check(yourGuess, opponentWordToGuess);
        const myGuessResult: GuessResult = {
            guess: yourGuess,
            corrects: correctCharacters,
        };
        setMyGuessResults([...myGuessResults, myGuessResult]);

        socket.emit("myGuessResult", myGuessResult);
        setTurn(false);

        setYourGuess("");
    };

    function updateUserByID(userID: string, win: boolean) {
        const newMatch: newMatch = {
            won: win,
            turns: myGuessResults.length + 1,
            timePlayed: new Date(Date.now()),
        };

        updateuser(userID, newMatch);
    }

    function check(ans: string, ver: string) {
        let c = 0;
        ans = ans.toLowerCase();
        ver = ver.toLowerCase();

        for (let i = 0; i < ans.length; i++) {
            for (let j = 0; j < ver.length; j++) {
                if (ans[i] == ver[j]) {
                    c += 1;
                }
            }
        }
        return c;
    }

    return (
        <div className="gameComponents">
            <div className="record">
                <div className="pe-2 g-col-6">
                    <PlayerMoveRecord
                        guessResults={myGuessResults}
                        name={username}
                    />
                </div>
                <div className="g-col-6">
                    <PlayerMoveRecord
                        guessResults={opponentGuessResults}
                        name={opponent.playerName}
                    />
                </div>
            </div>

            {/* Input box */}
            {!wordSend && (
                <div id="token-input">
                    <form
                        className="input-group mb-3"
                        onSubmit={submitWordToGuess}
                    >
                        {wordToGuessError && (
                            <div style={{ color: "red" }}>
                                {wordToGuessError}
                            </div>
                        )}
                        <input
                            type="text"
                            placeholder="Word for your opponent to guess"
                            onChange={handleWordToGuessChange}
                            value={wordToGuess}
                            id="wordToGuess"
                            name="wordToGuess"
                            disabled={wordSend ? true : false}
                        />
                        <button
                            className="btn btn-primary"
                            type="submit"
                            disabled={wordSend ? true : false}
                        >
                            Send to Opponent
                        </button>
                    </form>
                </div>
            )}

            {wordSend && (
                <div id="guess-input">
                    {yourGuessError && (
                        <div style={{ color: "red" }}>{yourGuessError}</div>
                    )}
                    <form
                        className="input-group mb-3"
                        onSubmit={submitYourGuess}
                    >
                        <input
                            type="text"
                            placeholder="Enter your word"
                            onChange={handleYourGuessChange}
                            value={yourGuess}
                            id="yourGuess"
                            name="yourGuess"
                            // disabled
                            disabled={
                                !isMyTurn ||
                                (opponentWordToGuess.length == 0 ? true : false)
                            }
                        />
                        <button
                            className="btn btn-primary"
                            type="submit"
                            disabled={!isMyTurn}
                        >
                            Guess
                        </button>
                    </form>
                </div>
            )}

            {end && (
                <ResultModal
                    winner={winner}
                    yourWord={wordToGuess}
                    opponentWord={opponentWordToGuess}
                    turnNumber={myGuessResults.length + 1}
                />
            )}
        </div>
    );
}
