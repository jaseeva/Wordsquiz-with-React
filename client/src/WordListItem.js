import React from 'react';

const WordListItem = ({
    word,
    translation,
    rating,
    date
// }) => <li>{word} - {translation}</li>

}) => 
    <React.Fragment>
        <td>{word}</td>
        <td>{translation}</td>
        <td>{rating}</td>
        <td>{date}</td>
    </React.Fragment>

export default WordListItem;