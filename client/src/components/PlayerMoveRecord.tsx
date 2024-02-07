interface GuessResult {
    guess: string,
    corrects: number
}
interface Props {
    guessResults: GuessResult[];
    name: string;
}

export default function PlayerMoveRecord({guessResults, name} : Props) {
    console.log(guessResults);

    return (
        <div className="recordlist">
            <table className="table table-bordered playertable">
                <thead>
                    <tr>
                        <th>{name}</th>
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
