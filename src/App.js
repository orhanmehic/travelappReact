import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Routes,} from 'react-router-dom';
import LoginPage from './LoginPage';
import Home from './Home';
import Questions from "./Questions";
import RegisterPage from "./RegisterPage";
import AdminUsers from "./AdminUsers";
import AdminQuestions from "./AdminQuestions";
import AdminTravels from "./AdminTravels";
import MyTravels from "./MyTravels";






function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/questions/:travelId" element={<Questions />} />
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/mytravels" element={<MyTravels/>}/>
                <Route path="/adminpanel/questions" element={<AdminQuestions/>}/>
                <Route path="/adminpanel/users" element={<AdminUsers/>}/>
                <Route path="/adminpanel/travels" element={<AdminTravels/>}/>
            </Routes>
        </Router>
    );
}

export default App;