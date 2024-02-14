import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import QuestionForm from "./QuestionForm";
import NavBar from "./NavBar";
import "./styles/Questions.css"
const Questions = () =>{
    const [questions, setQuestions]=useState([]);
    const {travelId}=useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/questions/${travelId}`)
            .then(response=>setQuestions(response.data))
            .catch(error => console.error(error));
    }, [travelId]);


    const isLoggedIn=localStorage.getItem("userId");


    return (
        <div className="questions-container">
            <NavBar/>
            {questions.length > 0 && (
                <>
                    <h1 className="questions-heading">{questions[0].travel.destination}</h1>
                    {questions.map(question => (
                        <div key={question._id} className="question-item">
                            <h3 className="question-text">{question.text}</h3>
                            {/* Render answer if available */}
                            {question.response && (
                                <div className="answer">
                                    <h4>Answer:</h4>
                                    <p>{question.response}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </>
            )}
            {isLoggedIn && <QuestionForm travelId={travelId}/>}
        </div>

    );

}

export default Questions;