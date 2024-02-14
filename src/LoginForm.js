import React, { useState } from 'react';
import axios from 'axios';
import "./styles/LoginForm.css"


const LoginForm = ({onLogin}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/login', { username, password });
            const userId=response.data.userId;
            const role=response.data.role;
            console.log(userId);
            setErrorMessage('');
            onLogin(userId, role);
        } catch (error) {
            if (error.response) {
                setErrorMessage('Invalid username or password');
            } else {
                setErrorMessage('Internal Server Error');
            }
        }
    };

    return (
        <div className="login-form-container">
            <h2>Login</h2>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <form>
                <label>Username:</label>
                <input className="input-field" type="text" value={username}
                       onChange={(e) => setUsername(e.target.value)}/>
                <label>Password:</label>
                <input className="input-field" type="password" value={password}
                       onChange={(e) => setPassword(e.target.value)}/>
                <button className="login-button" type="button" onClick={handleLogin}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginForm;