import { Routes, Route, Navigate } from "react-router-dom";
import HomeScreen from "./HomeScreen";
import GameScreen from "./GameScreen";
import StatsScreen from "./StatsScreen";
import { SocketContext, socket } from "./SocketContext";

function App() {
    return (
        <SocketContext.Provider value={socket}>
            <Routes>
                <Route index element={<Navigate to='/home' replace />} />
                <Route path='/home' element={<HomeScreen />} />
                <Route path='/game' element={<GameScreen />} />
                <Route path='/stats' element={<StatsScreen />} />
            </Routes>
        </SocketContext.Provider>
    );
}

export default App;
