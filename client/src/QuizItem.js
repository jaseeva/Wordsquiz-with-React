import React from 'react';

function QuizItem ({
    word,
    translation,
    rating,
    date
}) { 
    return (
    <div className="quiz-item">
        <td>{word}</td>
        <td><input type="text"></input></td>
    </div>
    )
}

export default QuizItem;