import { useEffect, useState } from "react";
import "../CSS/StatsScreen.css";

function StatsScreen() {
    const mockData = [
        { user: "jack", totalGames: 40, winGames: 10, loseGames: 30, averageTurns: 5 },
        { user: "Mark", totalGames: 30, winGames: 20, loseGames: 10, averageTurns: 4 },
        { user: "Tom", totalGames: 20, winGames: 5, loseGames: 15, averageTurns: 3 },
        { user: "Tom", totalGames: 20, winGames: 5, loseGames: 15, averageTurns: 3 },
        { user: "Tom", totalGames: 20, winGames: 5, loseGames: 15, averageTurns: 3 },
        { user: "Tom", totalGames: 20, winGames: 5, loseGames: 15, averageTurns: 3 },
        { user: "Tom", totalGames: 20, winGames: 5, loseGames: 15, averageTurns: 3 },
        { user: "Tom", totalGames: 20, winGames: 5, loseGames: 15, averageTurns: 3 },
        { user: "Tom", totalGames: 20, winGames: 5, loseGames: 15, averageTurns: 3 },
        { user: "Tom", totalGames: 20, winGames: 5, loseGames: 15, averageTurns: 3 },
        { user: "Tom", totalGames: 20, winGames: 5, loseGames: 15, averageTurns: 3 },
        { user: "Tom", totalGames: 20, winGames: 5, loseGames: 15, averageTurns: 3 },
        { user: "Tom", totalGames: 20, winGames: 5, loseGames: 15, averageTurns: 3 },
        { user: "Tom", totalGames: 20, winGames: 5, loseGames: 15, averageTurns: 3 },
    ];

    const [currentTab, setCurrentTab] = useState("all");

    const [data, setData] = useState([] as any[]);

    const [sortBy, setSortBy] = useState("");

    useEffect(() => {
        getData();
    }, [sortBy]);

    const getData = () => {
        // switch (sortBy) {
        //     case "1":
        //         setData(mockData.sort((a, b) => b.winGames - a.winGames));
        //         break;
        //     case "2":
        //         setData(mockData.sort((a, b) => a.averageTurns - b.averageTurns));
        //         break;
        //     case "3":
        //         setData(mockData.sort((a, b) => b.totalGames - a.totalGames));
        //         break;
        //     default:
        //         setData(mockData);
        //         break;
        // }

        fetch("http://127.0.0.1:3000/api/")
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
            });
    };

    const handleChangeTab = (tab: string) => {
        console.log(tab);

        setCurrentTab(tab);
    };

    return (
        <>
            <div className="statsscreen">
                <h2 className="mb-5 text-center">Leaderboard</h2>
                <div className="mb-3 d-flex gap-3">
                    <ul className="nav nav-tabs">
                        <li
                            className="nav-item"
                            onClick={() => {
                                handleChangeTab("all");
                            }}>
                            <div className={`nav-link cursor-pointer ${currentTab == "all" ? "active" : ""}`}>All time</div>
                        </li>
                        <li
                            className="nav-item"
                            onClick={() => {
                                handleChangeTab("last");
                            }}>
                            <div className={`nav-link cursor-pointer ${currentTab == "last" ? "active" : ""}`}>Last hour</div>
                        </li>
                    </ul>
                    <div>
                        <select
                            className="form-select"
                            onChange={(e) => {
                                setSortBy(e.target.value);
                            }}>
                            <option selected disabled>
                                Sort by
                            </option>
                            <option value="1">Number of wins</option>
                            <option value="2">Average turns for wins</option>
                            <option value="3">Number of games played</option>
                        </select>
                    </div>
                </div>
                <div className="table-container">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">User</th>
                                <th scope="col">Number of games</th>
                                <th scope="col">Wins/Losses</th>
                                <th scope="col">Average turn per win</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr className={`${item.user == "jack" ? "table-primary" : ""}`} key={item.user}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.user}</td>
                                    <td>{item.totalGames}</td>
                                    <td>
                                        {item.winGames}/{item.loseGames}
                                    </td>
                                    <td>{item.averageTurns}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default StatsScreen;
