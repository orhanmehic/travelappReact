import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import "./styles/MyTravels.css"

const MyTravels = () => {
    const [travels, setTravels] = useState([]);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const fetchMyTravels = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/getMyTravels/${userId}`);
                setTravels(response.data);
            } catch (error) {
                console.error("Error fetching my travels:", error);
            }
        };

        fetchMyTravels();
    }, [userId]);

    return (
        <div className="my-travels-container">
            <NavBar/>
            <h1 className="my-travels-heading">My Ended Travels</h1>
            <ul>
                {travels.length > 0 ? (
                    travels.map((travel, index) => (
                        <li key={index} className="travel-item">
                            <div className="travel-info">
                                <strong>Destination:</strong> {travel.destination}
                            </div>
                            <div className="travel-info">
                                <strong>Start Date:</strong> {travel.startDate}
                            </div>
                            <div className="travel-info">
                                <strong>Return Date:</strong> {travel.returnDate}
                            </div>
                            <div className="travel-info">
                                <strong>Description:</strong> <span
                                className="travel-description">{travel.description}</span>
                            </div>
                        </li>
                    ))
                ) : (
                    <p className="no-travels-message">No ended travels found.</p>
                )}
            </ul>
        </div>
    );
};

export default MyTravels;
