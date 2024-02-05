import { useEffect, useState } from "react";
import { adjectives, animals } from "../data/username";

const generateName = () => {
    const randadj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randanim = animals[Math.floor(Math.random() * animals.length)];
    return randadj + randanim;
};
function checkFirstVisit() {
    const visitedCookie = getCookie("visited");

    if (!visitedCookie) {
        // If the cookie doesn't exist, set it
        setCookie(); // Set an expiration date or duration as needed
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
        };

        fetchName();
    }, []);

    return <div className="greeting">Hello, {name}!</div>;
}
