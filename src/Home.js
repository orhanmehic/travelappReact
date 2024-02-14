import React, {useEffect, useState} from "react";
import axios from "axios";
import Travel from "./Travel";
import NavBar from "./NavBar";
import {Navigate} from "react-router-dom";
import "./styles/Home.css"


const Home = () => {
    const [travels, setTravels] = useState([]);

    useEffect(() => {
        // Fetch travels from the backend
        axios.get('http://localhost:5000/api/travels')
            .then(response => setTravels(response.data))
            .catch(error => console.error(error));
    }, []);

    if(localStorage.getItem("role")==="admin"){
        return <Navigate to="/adminpanel/users"/>
    }

    return (
        <div className="home-container">
            <NavBar/>
            <h1 className="welcome-heading">Welcome to the TravelApp</h1>
            <div className="travels-container">
                {localStorage.getItem("userId")}
                {travels.length > 0 && travels.map(travel => (
                    <Travel key={travel._id} travel={travel}/>
                ))}
            </div>
        </div>
    )
}


export default Home;