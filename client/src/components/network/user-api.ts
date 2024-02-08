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

// Function to get the value of a cookie
export function getCookie(name: String) {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split("=");
        if (cookieName === name) {
            return cookieValue;
        }
    }
    return null;
}


const apis ={
    getUsers,
    getUserByName,
    getLastHour,
    creatUser,
    updateuser,
    getUser,
    getCookie,
    
}
export default apis