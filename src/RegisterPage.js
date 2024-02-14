import React from "react";
import RegisterForm from "./RegisterForm";
import NavBar from "./NavBar";
import "./styles/RegisterPage.css"

const RegisterPage = () => {
    return (
        <div className="register-page-container">
            <NavBar/>
            <h1 className="register-page-heading">Registration Page</h1>
            <RegisterForm/>
        </div>
    );
};

export default RegisterPage;
