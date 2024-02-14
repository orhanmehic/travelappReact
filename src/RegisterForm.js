import React, { useState } from "react";
import axios from "axios";
import "./styles/RegisterForm.css"

const RegisterForm = () => {
    const [username,setUsername] = useState('');
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [repeatPassword,setRepeatPassword]=useState('')
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== repeatPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }
        try {
            const response = await axios.post("http://localhost:5000/api/register", {username,email,password});
            console.log("Registration successful:", response.data);
            // Redirect the user to the login page or another page after successful registration
        } catch (error) {
            console.error("Registration failed:", error);
            setErrorMessage('Registration failed. Please try again later.');
        }
    };

    return (
        <div className="register-form-container">
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="repeatPassword">Repeat Password:</label>
                    <input type="password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)}/>
                </div>
                <button type="submit">Register</button>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </form>
        </div>
    );
};

export default RegisterForm;
