import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import PlayerMoveRecord from "./PlayerMoveRecord";
import { wordToGuessSchema, yourGuessScheme } from '../data/validate';
import { SocketContext } from "./SocketContext";
import { useLocation } from "react-router-dom";

interface NavigationState {
    userName: string;
    opponentName: string;
}

interface GuessResult {
    guess: string,
    corrects: number
}

export default function GameBoard() {
    const [wordToGuess, setWordToGuess] = useState<string>("");
    const [yourGuess, setYourGuess] = useState<string>("");
    const [wordToGuessError, setWordToGuessError] = useState<string>("");
    const [wordSend, setWordSend] = useState<boolean>(false);
    const [opponentWordToGuess, setOpponentWordToGuess] = useState("");
    const [myGuessResults, setMyGuessResults] = useState<GuessResult[]>([]);

    const location = useLocation();
    const { userName, opponentName }: NavigationState = location.state || {}; // Destructure the passed state

    const socket = useContext(SocketContext);

    useEffect(() => {
        socket.on("guessWord", wordToGuess => {
            console.log(wordToGuess);
            setOpponentWordToGuess(wordToGuess);
        });

        return () => {
            socket.off("player-name");
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

        console.log("your guess: ",yourGuess);

        // guess is correct
        if(yourGuess.toLowerCase() === opponentWordToGuess.toLowerCase()) {
            console.log("go to game result modal");
            // send the result to the server
        }

        // guess is not correct
        const correctCharacters = check(yourGuess, opponentWordToGuess);
        const myGuessResult: GuessResult = {guess: yourGuess, corrects: correctCharacters};
        setMyGuessResults([...myGuessResults, myGuessResult]);

        setYourGuess("");
    };

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
        <div className='gameComponents'>
            <div className='record'>
                <div className='pe-2 g-col-6'>
                    <PlayerMoveRecord guessResults={myGuessResults} name={userName} />
                </div>
                <div className='g-col-6'>
                    <PlayerMoveRecord guessResults={myGuessResults} name={opponentName}/>
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
                        id='yourGuess'
                        name='yourGuess'
                        // disabled
                    />
                    <button className='btn btn-primary' type='submit'>
                        Guess
                    </button>
                </form>
            </div>
        </div>
    );
}
