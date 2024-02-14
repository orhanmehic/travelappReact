import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import "./styles/NavBar.css"


const NavBar = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(localStorage.getItem("userId")!==null)
    }, []);

    const handleLogout = () => {
        localStorage.clear()
        setIsLoggedIn(false)
    }


    return (
        <nav className="navbar">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/">
                        Home
                    </Link>
                </li>
                {!isLoggedIn && (
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">
                                Login
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">
                                Register
                            </Link>
                        </li>
                    </>
                )}
                {isLoggedIn && (
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/myTravels">
                                My travels
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/" onClick={handleLogout}>
                                Logout
                            </Link>
                        </li>
                    </>
                )}
                {/* Add more navigation items as needed */}
            </ul>
        </nav>
    );
}

export default NavBar;