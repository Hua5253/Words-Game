import {useEffect} from "react";


function checkFirstVisit() {
    const visitedCookie = getCookie('visited');
    
    if (!visitedCookie) {
        // If the cookie doesn't exist, set it
        setCookie();  // Set an expiration date or duration as needed
        console.log('First time visit! Cookie set.');
    } else {
        console.log('Returning visitor.');
    }
}

// Function to set a cookie
function setCookie() {
    document.cookie =  `visited=true;path=/`;
    let name = "steve"
    document.cookie =  `name=${name};path=/`;
}

// Function to get the value of a cookie
function getCookie(name : String) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === name) {
            return cookieValue;
        }
    }
    return null;    
}

export default function GetUser(){
    useEffect(() => {
        checkFirstVisit()
    },[]);

    let username = getCookie('name');
    return (
        <div className="greeting">
            Hello, {username}!
        </div>
    );
}