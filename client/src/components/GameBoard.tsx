import { ChangeEvent, FormEvent, useState } from "react";
import PlayerMoveRecord from "./PlayerMoveRecord";
import { wordToGuessSchema, yourGuessScheme } from "../data/validate";
import { Socket } from "socket.io-client";
import { getCookie } from "./GetUser";

interface Props {
    socket: Socket;
}

export default function GameBoard({ socket }: Props) {
    const [wordToGuess, setWordToGuess] = useState<string>("");
    const [yourGuess, setYourGuess] = useState<string>("");
    const [wordToGuessError, setWordToGuessError] = useState<string>("");
    const [wordSend, setWordSend] = useState<boolean>(false);

    const opponent = "opponent";

    const playerName = getCookie("name");

    const handleWordToGuessChange = (e: ChangeEvent<HTMLInputElement>) => {
        setWordToGuess(e.target.value);
        setWordToGuessError("");
    };

    socket.on("guessWord", (wordToGuess) => {
        console.log(wordToGuess);
    });
    socket.on("playerName", (playerName) => {
        console.log(playerName);
    });

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
            socket.emit("guessWordReady", wordToGuess, playerName);
        }

        setWordToGuess("");
    };

    const handleYourGuessChange = (e: ChangeEvent<HTMLInputElement>) => {
        setYourGuess(e.target.value);
    };

    const submitYourGuess = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert("Your Guess is: " + yourGuess);

        //Here is where you then verify if the word set is valid
        const { error } = yourGuessScheme.validate(yourGuess);

        //first check if the word set is valid in terms of if it is a valid word
        if (error) {
            console.log(error);
        }

        //then sent to back end socket.emit....

        //then has a socket.on... to catch a signal of rather the word is right or wrong
        //if wrong display data

        //if right move on (display the game result page)

        setYourGuess("");
    };

    return (
        <div className="gameComponents">
            <div className="record">
                <div className="pe-2 g-col-6">
                    <PlayerMoveRecord
                        playerName={playerName ? playerName : "unknown"}
                    />
                </div>
                <div className="g-col-6">
                    <PlayerMoveRecord playerName={opponent} />
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
                        disabled //I think this should be toggled when opponent sent the word over (same with the button)
                    />
                    <button className="btn btn-primary" type="submit" disabled>
                        Guess
                    </button>
                </form>
            </div>
        </div>
    );
}
