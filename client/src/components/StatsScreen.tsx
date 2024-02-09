import { useContext, useEffect, useState } from "react";
import "../CSS/StatsScreen.css";
import { useNavigate } from "react-router-dom";
import { getLastHour, getUsers, getCookie } from "./network/user-api";
import { SocketContext } from "./SocketContext";

export default function StatsScreen() {
    const socket = useContext(SocketContext);
    const [currentTab, setCurrentTab] = useState("all");
    const navigate = useNavigate();

    const [data, setData] = useState([] as any[]);
    const [username, setUsername] = useState("");

    const [sortBy, setSortBy] = useState("");

    useEffect(() => {
        getUserName();
    }, []);

    useEffect(() => {
        getData();
        socket.on("stats", () => {
            getData();
        });
    }, [sortBy, currentTab]);

    const getData = async () => {
        let tempData: any[] = [];

        if (currentTab == "all") {
            tempData = await getUsers().then((res) => res.data);
        } else if (currentTab == "last") {
            tempData = await getLastHour().then((res) => res.data);
        }

        switch (sortBy) {
            case "1":
                setData(tempData.sort((a, b) => b.matchesWon - a.matchesWon));
                break;
            case "2":
                setData(tempData.sort((a, b) => a.avgTurns - b.avgTurns));
                break;
            case "3":
                setData(tempData.sort((a, b) => b.totalMatches - a.totalMatches));
                break;
            default:
                setData(tempData);
                break;
        }
    };

    const getUserName = () => {
        const name = getCookie("name") as string;
        setUsername(name);
    };

    const handleChangeTab = (tab: string) => {
        setCurrentTab(tab);
    };

    return (
        <>
            <div className="statsscreen">
                <div className="position-relative">
                    <h2 className="mb-5 text-center">Leaderboard</h2>
                    <button
                        type="button"
                        className="btn btn-outline-primary position-absolute top-0"
                        onClick={() => {
                            navigate("/");
                        }}>
                        Back
                    </button>
                </div>
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
                    <table className="table">
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
                                <tr className={`${item.name == username ? "table-primary" : ""}`} key={item._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.totalMatches}</td>
                                    <td>
                                        {item.matchesWon}/{item.totalMatches - item.matchesWon}
                                    </td>
                                    <td>{item.avgTurns}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
