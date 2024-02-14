import React, {useEffect, useState} from "react";
import AdminNavBar from "./AdminNavBar";
import axios from "axios";
import "./styles/AdminUsers.css"

const AdminUsers = () =>{
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [users, setUsers] = useState([]);
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('');



    // Fetch users on component mount
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/admin/users");
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);

    // Function to handle form submission for adding a new user
    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/admin/users', { username, email, password });
            console.log("User created successfully:", response.data);
            // Clear form fields
            setUsername('');
            setEmail('');
            setPassword('');
            setErrorMessage('');
        } catch (error) {
            console.error("Error creating user:", error);
            if (error.response) {
                setErrorMessage(error.response.data.error || 'An error occurred');
            } else {
                setErrorMessage('An error occurred');
            }
        }
    };

    // Function to handle deletion of a user
    const handleDelete = async (userId) => {
        try {
            const response = await axios.post(`http://localhost:5000/api/admin/users/${userId}`);
            console.log("User deleted successfully:", response.data);
        } catch (error) {
            console.error("Error deleting user:", error);
            // Handle error
        }
    };

    return (
            <div className="admin-users-container">
                <AdminNavBar />
                <h2 className="admin-users-heading">Add User</h2>
                {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
                <form className="add-user-form" onSubmit={handleSubmit}>
                    <div>
                        <label>Username:</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                    <button type="submit">Add User</button>
                </form>
                <h2 className="admin-users-heading">Users</h2>
                {/* Render list of users */}
                <ul className="users-list">
                    {users.map(user => (
                        <li key={user._id} className="user-item">
                            <span>{user.username}</span>
                            <button className="delete-button" onClick={() => handleDelete(user._id)}>Deactivate</button>
                        </li>
                    ))}
                </ul>
            </div>
    );
}

export default AdminUsers;