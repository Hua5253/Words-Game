import "../CSS/StatsScreen.css";

function StatsScreen() {
    return (
        <>
            <div className='statsscreen'>
                <h2 className='mb-5 text-center'>Leaderboard</h2>
                <div className='mb-3 d-flex gap-3'>
                    <ul className='nav nav-tabs'>
                        <li className='nav-item'>
                            <div className='nav-link active cursor-pointer'>
                                All time
                            </div>
                        </li>
                        <li className='nav-item'>
                            <div className='nav-link cursor-pointer'>
                                Last hour
                            </div>
                        </li>
                    </ul>
                    <div>
                        <select className='form-select'>
                            <option selected>Sort by</option>
                            <option value='1'>Number of wins</option>
                            <option value='2'>Average turns for wins</option>
                            <option value='3'>Number of games played</option>
                        </select>
                    </div>
                </div>
                <div>
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th scope='col'>#</th>
                                <th scope='col'>User</th>
                                <th scope='col'>Number of games</th>
                                <th scope='col'>Wins/Losses</th>
                                <th scope='col'>Average turn per win</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope='row'>1</th>
                                <td>Mark</td>
                                <td>30</td>
                                <td>29/1</td>
                                <td>2 min</td>
                            </tr>
                            <tr className='table-primary'>
                                <th scope='row'>2</th>
                                <td>Jacob</td>
                                <td>30</td>
                                <td>28/2</td>
                                <td>3 min</td>
                            </tr>
                            <tr>
                                <th scope='row'>2</th>
                                <td>Jacob</td>
                                <td>30</td>
                                <td>28/2</td>
                                <td>3 min</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default StatsScreen;
