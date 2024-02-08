import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import PlayerMoveRecord from "./PlayerMoveRecord";
import { wordToGuessSchema, yourGuessScheme } from "../data/validate";
import { SocketContext } from "./SocketContext";
import { useLocation } from "react-router-dom";
import { getUserByName, updateuser } from "./network/user-api";
import { getCookie } from "./GetUser";
import { newMatch } from "./network/user-api";
import ResultModal from "./ResultModel";

interface NavigationState {
    userName: string;
    opponentName: string;
}

interface GuessResult {
    guess: string;
    corrects: number;
}

export default function GameBoard() {
    const [wordToGuess, setWordToGuess] = useState<string>("");
    const [yourGuess, setYourGuess] = useState<string>("");
    const [wordToGuessError, setWordToGuessError] = useState<string>("");
    const [wordSend, setWordSend] = useState<boolean>(false);
    const [opponentWordToGuess, setOpponentWordToGuess] = useState("");
    const [myGuessResults, setMyGuessResults] = useState<GuessResult[]>([]);
    const [opponentGuessResults, setOpponentGuessResults] = useState<
        GuessResult[]
    >([]);

    const [end, setEnd] = useState<boolean>(false);

    const location = useLocation();
    const { userName, opponentName }: NavigationState = location.state || {}; // Destructure the passed state

    const socket = useContext(SocketContext);

    socket.on("opponentGuessResult", (wordResult) => {
        setOpponentGuessResults([...opponentGuessResults, wordResult]);
    });

    useEffect(() => {
        socket.on("guessWord", (wordToGuess) => {
            console.log(wordToGuess);
            setOpponentWordToGuess(wordToGuess);
        });

        return () => {
            socket.off("opponentGuessResult");
            socket.off("guessWord");
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

        setWordToGuess("");
    };

    const handleYourGuessChange = (e: ChangeEvent<HTMLInputElement>) => {
        setYourGuess(e.target.value);
    };

    const submitYourGuess = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //Here is where you then verify if the word set is valid
        const { error } = yourGuessScheme.validate(yourGuess);

        //first check if the word set is valid in terms of if it is a valid word
        if (error) {
            console.log(error);
            return;
        }

        console.log("your guess: ", yourGuess);

        // guess is correct
        if (yourGuess.toLowerCase() === opponentWordToGuess.toLowerCase()) {
            console.log("go to game result modal");
            // send the result to the server
            const userID = getCookie("userId");
            if(userID) {
                updateUserByID(userID);
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

        setYourGuess("");
    };

    function updateUserByID(userID: string) {     
        const newMatch : newMatch = {
            won: true,
            turns: myGuessResults.length + 1,
            timePlayed: new Date(Date.now()),
        }

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
                        name={userName}
                    />
                </div>
                <div className="g-col-6">
                    <PlayerMoveRecord
                        guessResults={opponentGuessResults}
                        name={opponentName}
                    />
                </div>
            </div>

            {/* Input box */}
            <div id="token-input">
                <form className="input-group mb-3" onSubmit={submitWordToGuess}>
                    {wordToGuessError && (
                        <div style={{ color: "red" }}>{wordToGuessError}</div>
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
            <div id="guess-input">
                <form className="input-group mb-3" onSubmit={submitYourGuess}>
                    <input
                        type="text"
                        placeholder="Enter your word"
                        onChange={handleYourGuessChange}
                        value={yourGuess}
                        id="yourGuess"
                        name="yourGuess"
                        // disabled
                    />
                    <button className="btn btn-primary" type="submit">
                        Guess
                    </button>
                </form>
            </div>
            {end && <ResultModal />}
        </div>
    );
}
