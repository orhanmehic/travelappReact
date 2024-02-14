import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavBar from './AdminNavBar';
import "./styles/AdminTravels.css"


const AdminTravels = () => {
    const [travels, setTravels] = useState([]);
    const [destination, setDestination] = useState('');
    const [startDate, setStartDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [description, setDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchTravels = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/travels/admin');
                setTravels(response.data);
            } catch (error) {
                console.error('Error fetching travels:', error);
            }
        };

        fetchTravels();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/travels', {
                destination,
                startDate,
                returnDate,
                description
            });
            console.log('Travel created successfully:', response.data);
            setDestination('');
            setStartDate('');
            setReturnDate('');
            setDescription('');
            setErrorMessage('');
        } catch (error) {
            console.error('Error creating travel:', error);
            setErrorMessage('An error occurred');
        }
    };

    const handleDelete = async (travelId) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/travels/${travelId}`);
            console.log('Travel deleted successfully:', response.data);
        } catch (error) {
            console.error('Error deleting travel:', error);
        }
    };

    return (
        <div className="admin-travels-container">
            <AdminNavBar/>
            <h2 className="admin-travels-heading">Add Travel</h2>
            {errorMessage && <div style={{color: 'red'}}>{errorMessage}</div>}
            <form className="add-travel-form" onSubmit={handleSubmit}>
                <div>
                    <label>Destination:</label>
                    <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} required/>
                </div>
                <div>
                    <label>Start Date:</label>
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required/>
                </div>
                <div>
                    <label>Return Date:</label>
                    <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} required/>
                </div>
                <div>
                    <label>Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required/>
                </div>
                <button type="submit">Add Travel</button>
            </form>
            <h2 className="admin-travels-heading">Travels</h2>
            <ul>
                {travels.map(travel => (
                    <li key={travel._id} className="travel-item">
                        <div>
                            <h3>{travel.destination}</h3>
                            <p>Start Date: {travel.startDate}</p>
                            <p>Return Date: {travel.returnDate}</p>
                            <p>Description: {travel.description}</p>
                            <button className="delete-button" onClick={() => handleDelete(travel._id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminTravels;
