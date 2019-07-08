import React from 'react';

const QuizItem = ({word, id, onChange}) => {
    const handleChange = (e) => {
        onChange(e.target.id, e.target.value);
    }

    return (
        <div className="quiz-item">
            <label>{word}</label>
            <input type="text" id={id} onChange={handleChange} autoComplete="off"/>
        </div>
    )
}

export default QuizItem;