// LoginPage.js
import React, {useState} from 'react';
import LoginForm from './LoginForm';
import {Navigate, redirect} from "react-router-dom";
import NavBar from "./NavBar";
import "./styles/LoginPage.css"



const LoginPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSuccessfulLogin = (userId, role) => {
        localStorage.setItem("userId",userId)
        localStorage.setItem("role", role)
        setIsLoggedIn(true);
    };

    // If user is logged in, redirect to the appropriate page based on role
    if (isLoggedIn) {
        return localStorage.getItem("role") === 'admin' ? <Navigate to="/adminpanel/users"/> : <Navigate to="/"/>;
    }


    return (
        <div className="login-page-container">
            <NavBar/>
            <h1 className="login-page-heading">Welcome to the Login Page</h1>
            <LoginForm onLogin={handleSuccessfulLogin}/>
        </div>
    );
};

export default LoginPage;
