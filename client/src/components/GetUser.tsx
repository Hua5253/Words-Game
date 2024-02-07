import { useEffect, useState } from "react";
import { adjectives, animals } from "../data/username";
import api from "./network/user-api";

const generateName = () => {
    const randadj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randanim = animals[Math.floor(Math.random() * animals.length)];
    return randadj + randanim;
};
function checkFirstVisit() {
    const visitedCookie = getCookie("visited");
    // If the cookie doesn't exist, set it
    if (!visitedCookie) {
        document.cookie = `visited=true;path=/`;
        async function createUser() {
            let name: string = generateName();
            try {
                document.cookie = `name=${name};path=/`;
                const user_info = await api.creatUser(name);
                console.log(user_info);
                const userId = user_info.data._id;
                document.cookie = `userId=${userId};path=/`;
            } catch (error) {
                // console.log("error creating user");
            }
        }
        createUser();

        // console.log("First time visit! Cookie set.");
    } else {
        // console.log('Returning visitor.');
    }
}

// Function to get the value of a cookie
function getCookie(name: String) {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split("=");
        if (cookieName === name) {
            return cookieValue;
        }
    }
    return null;
}

export default function GetUser() {
    const [name, setName] = useState("");

    useEffect(() => {
        checkFirstVisit();
        const fetchName = async () => {
            const userName = await getCookie("name");
            if (userName !== null) {
                setName(userName);
            } else {
                setName("error");
            }
        };

        fetchName();
    });

    return <div className='greeting'>Hello, {name}!</div>;
}
