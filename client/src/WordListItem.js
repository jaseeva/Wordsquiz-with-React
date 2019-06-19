import React from 'react';

function WordListItem ({
    word,
    translation,
    rating,
    date
}) { 
    return (
    <React.Fragment>
        <td>{word}</td>
        <td>{translation}</td>
        <td>{rating}</td>
        <td>{date ? {date} : 'not answered'}</td>
    </React.Fragment>
    )
}

export default WordListItem;