import React from "react";
import {Link} from "react-router-dom";
import "./styles/AdminNavBar.css"

const AdminNavBar = () =>{

    const handleLogout=()=>{
        localStorage.clear();

    }

    return (
        <nav className="admin-nav-container">
            <ul className="admin-nav">
                <li>
                    <Link to="/adminpanel/users">Users</Link>
                </li>
                <li>
                    <Link to="/adminpanel/travels">Travels</Link>
                </li>
                <li>
                    <Link to="/adminpanel/questions">Questions</Link>
                </li>
                <li>
                    <Link to="/" onClick={handleLogout} className="logout-link">Logout</Link>
                </li>
            </ul>
        </nav>
    )
}

export default AdminNavBar