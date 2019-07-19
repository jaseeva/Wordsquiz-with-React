import React from 'react';
import moment from 'moment';

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
        <td>{date ? moment(date).format('D MMM, HH:mm') : 'never'}</td>
    </React.Fragment>
    )
}

export default WordListItem;