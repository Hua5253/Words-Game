import { useEffect, useState } from "react";
import { adjectives, animals } from "../data/username";
import api from "./network/user-api"

const generateName = () => {
    const randadj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randanim = animals[Math.floor(Math.random() * animals.length)];
    return randadj + randanim;
};
function checkFirstVisit() {
    const visitedCookie = getCookie("visited");

    if (!visitedCookie) {
        // If the cookie doesn't exist, set it
        setCookie(); 

        // document.cookie = `visited=true;path=/`;
        // async function createUser(){
        //     let name: string = generateName();
            
        //     try {
        //         const response = await api.creatUser(name);

        //     } catch (error) {
        //         console.log(error);
        //     }
        // }
        // createUser();

        console.log("First time visit! Cookie set.");
    } else {
        // console.log('Returning visitor.');
    }
}

// Function to set a cookie
function setCookie() {
    document.cookie = `visited=true;path=/`;
    let name = generateName();
    document.cookie = `name=${name};path=/`;
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
            const newName = await getCookie("name");
            if (newName !== null) {
                setName(newName);
            } else {
                setName("error");
            }

            // const userId_response = await api.getCurrentUser();
            // const userId: string = userId_response.data._id;
            // console.log(userId_response);

            // const userName_response = await api.getUser("65c12a63099076f92fc9f73a");
            // const userName = userName_response.data.name;
            // console.log(userName_response);

            // setName(userName);
        };

        fetchName();
    }, []);

    return <div className="greeting">Hello, {name}!</div>;
}
