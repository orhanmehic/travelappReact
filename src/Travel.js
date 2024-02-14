import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import "./styles/Travel.css"

const Travel = ({travel}) =>{

    const [isSignedUp, setIsSignedUp] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const[travelDest, setTravelDest]=useState('');

    useEffect(() => {
        const checkUserSignUp = async () => {
            try {
                const userId = localStorage.getItem("userId");
                const response = await axios.get(`http://localhost:5000/api/travels/${travel._id}/signedUp`);
                setIsSignedUp(response.data.includes(userId));
            } catch (error) {
                console.error("Error checking user signup:", error);
            }
        };
        checkUserSignUp();
    }, [travel._id]);

    useEffect(() => {
        if(localStorage.getItem("userId")!==null) setIsLoggedIn(true);
        setTravelDest(travel.destination);
    }, [travel]);

    const handleSignUp = async () =>{
        try {
            const userId=localStorage.getItem("userId");
            const response = await axios.post(`http://localhost:5000/api/travels/${travel._id}/signup`, {userId});
            console.log("Signed up for the booking successfully:", response.data);
        } catch (error) {
            console.error("Error signing up:", error);
        }
    }
    return (
        <div className="travel-container">
            <h2 className="destination">{travel.destination}</h2>
            <p>Start Date: {travel.startDate}</p>
            <p>Return Date: {travel.returnDate}</p>
            <p>Description: {travel.description}</p>
            <Link className="questions-link" to={`/questions/${travel._id}`} travel={travelDest}>Questions</Link>
            {!isSignedUp && isLoggedIn && <button className="sign-up-button" onClick={handleSignUp}>Sign up for trip</button>}
        </div>
    );
};

export default Travel;

