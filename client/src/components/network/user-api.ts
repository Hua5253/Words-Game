import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
})


export const getUsers = () => api.get('/users');

export const getCurrentUser = () => api.get('/currentUser');

export const getUsersByWins = () => api.get('/wins');

export const getUsersByGamesPlayed = () => api.get('/gamesPlayed');

export const getUsersByTurns = () => api.get('/turns');

export const getLastHour = () => api.get('/lasthour');

export const getLastHourByWins = () => api.get('/lasthour/wins');

export const getLastHourByTurns = () => api.get('/lasthour/turns');

export const getLastHourByGamesPlayed = () => api.get('/lasthour/gamesPlayed');

export const creatUser = (newUser: string) => {
    return api.post('/', {
        name : newUser
    })
}
export interface newMatch{
    won : Boolean,
    turns : Number, 
    timePlayed : Date,
}

export const updateuser = (userId: string, match: newMatch) => {
    return api.patch(`/${userId}`, {
        won : match.won,
        turns : match.turns,
        timePlayed: match.timePlayed,
    })
}

export const getUser = (userId: string) => api.get(`/${userId}`);


const apis ={
    getUsers,
    getCurrentUser,
    getUsersByWins,
    getUsersByGamesPlayed,
    getUsersByTurns,
    getLastHour,
    getLastHourByWins,
    getLastHourByTurns,
    getLastHourByGamesPlayed,
    creatUser,
    updateuser,
    getUser,
}
export default apis