import { Routes, Route, Navigate } from "react-router-dom";
import HomeScreen from "./HomeScreen";
import GameScreen from "./GameScreen";
import StatsScreen from "./StatsScreen";

function App() {
    return (
        <Routes>
            <Route index element={<Navigate to='/home' replace />} />
            <Route path='/home' element={<HomeScreen />} />
            <Route path='/game' element={<GameScreen />} />
            <Route path='/stats' element={<StatsScreen />} />
        </Routes>
    );
}

export default App;
