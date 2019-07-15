import React from 'react';
import Word from './Word';

const QuizItem = ({word, id, onChange}) => {
    const handleChange = (e) => {
        onChange(e.target.id, e.target.value);
    }

    return (
        <React.Fragment>
            <Word text={word} /><br/>
            <input type="text" id={id} onChange={handleChange} autoComplete="off"/>
        </React.Fragment>
    )
}

export default QuizItem;