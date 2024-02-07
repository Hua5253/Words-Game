import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
})


export const getUsers = () => api.get('/users');

// export const getCurrentUser = () => api.get('/currentUser');

export const getLastHour = () => api.get('/lasthour');


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


export interface user{
    name: String
}

export const getUserByName = (findName: string) => {
    return api.get(`/name`, {
        params: {
            name: findName,
        },
    });
}


const apis ={
    getUsers,
    getUserByName,
    getLastHour,
    creatUser,
    updateuser,
    getUser,
}
export default apis