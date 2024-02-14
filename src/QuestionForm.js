import React, {useState} from "react";
import axios from "axios";
import "./styles/QuestionForm.css"

const QuestionForm=({travelId, onSubmitQuestion})=>{
    const [question, setQuestion]=useState('');
    const [errorMessage, setErrorMessage]=useState('');


    const handleSubmit= async (e)=>{
        try{
            const response = await axios.post(`http://localhost:5000/api/questions/${travelId}/addQuestion`, {question});
            setErrorMessage('');
            onSubmitQuestion();
        }catch (error) {
            if(error.response) setErrorMessage('Internal server error')
        }
    }


    return (
        <div className="question-form-container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="question">Question:</label>
                <input className="question-input" type="text" value={question}
                       onChange={(e) => setQuestion(e.target.value)}/>
                <button className="submit-button" type="submit">Submit</button>
            </form>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
    )
}

export default QuestionForm;