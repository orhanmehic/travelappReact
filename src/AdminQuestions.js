import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavBar from './AdminNavBar';
import "./styles/AdminQuestions.css"

const AdminQuestions = () => {
    const [questions, setQuestions] = useState([]);
    const [replyInput, setReplyInput] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [replies, setReplies] = useState({});

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/questions');
                setQuestions(response.data);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuestions();
    }, []);

    const handleDelete = async (questionId) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/questions/${questionId}`);
            console.log('Question deleted successfully:', response.data);
            // Refresh the questions list after deletion
            const updatedQuestions = questions.filter(question => question._id !== questionId);
            setQuestions(updatedQuestions);
        } catch (error) {
            console.error('Error deleting question:', error);
        }
    };

    const handleSubmitReply = async (questionId) => {
        setReplies({
            ...replies,
            [questionId]: replyInput,
        });
        console.log(replies);
        console.log(questionId);
        try {
            const response = await axios.post(`http://localhost:5000/api/questions/${questionId}`, { reply: replies });
            console.log('Question replied successfully:', response.data);
            // Update the question in the list with the new reply
            const updatedQuestions = questions.map(question => {
                if (question._id === questionId) {
                    return { ...question, reply: replyInput };
                }
                return question;
            });
            setQuestions(updatedQuestions);
            // Clear reply input for the replied question
            setReplyInput('');
        } catch (error) {
            console.error('Error replying to question:', error);
        }
    };

    return (
        <div className="admin-questions-container">
            <AdminNavBar/>
            <h2 className="admin-questions-heading">Questions</h2>
            <ul>
                {questions.map(question => (
                    <li key={question._id} className="question-item">
                        <div>
                            <h3 className="question-text">{question.text}</h3>
                            {question.reply ? (
                                <p>Replied: {question.response}</p>
                            ) : (
                                <div>
                                    <input
                                        className="reply-input"
                                        type="text"
                                        value={replies[question._id] || ''}
                                        onChange={(e) =>
                                            setReplies({
                                                ...replies,
                                                [question._id]: e.target.value,
                                            })
                                        }
                                    />
                                    <button className="submit-reply-button"
                                            onClick={() => handleSubmitReply(question._id)}>Submit Reply
                                    </button>
                                </div>
                            )}
                            <button className="delete-button" onClick={() => handleDelete(question._id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminQuestions;
