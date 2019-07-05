import React from 'react';

function QuizItem ({word, id, onChange}) {
    const handleChange = (e) => {
        onChange(e.target.id, e.target.value);
    }

    return (
        <div className="quiz-item">
            <label>{word}</label>
            <input type="text" id={id} onChange={handleChange} autocomplete="off"/>
        </div>
    )
}

export default QuizItem;