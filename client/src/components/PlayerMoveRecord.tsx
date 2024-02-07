
interface GuessResult {
    guess: string,
    corrects: number
}
interface Props {
    guessResults: GuessResult[];
}

export default function PlayerMoveRecord({guessResults} : Props) {
    console.log(guessResults);

    return (
        <div className="recordlist">
            <table className="table table-bordered playertable">
                <thead>
                    <tr>
                        <th>Player</th>
                    </tr>
                </thead>
                <tbody>
                    {guessResults.map(
                        (guessResult, index) => (
                            <tr key={index}>
                                <td>{guessResult.guess} {guessResult.corrects}</td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
}
