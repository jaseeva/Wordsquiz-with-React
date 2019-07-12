import React from 'react';

const QuizItem = ({word, id, onChange}) => {
    const handleChange = (e) => {
        onChange(e.target.id, e.target.value);
    }

    return (
        <React.Fragment>
            <label>{word}</label><br/>
            <input type="text" id={id} onChange={handleChange} autoComplete="off"/>
        </React.Fragment>
    )
}

export default QuizItem;