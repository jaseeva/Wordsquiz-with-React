import React from 'react';

function WordListItem ({
    word,
    translation,
    rating,
    date
}) { 
    // const answered = ({date}) => {
    //     console.log(`date: `, {date})
    //     if ({date} != null) {
    //         return date
    //     }
    //     return "not answered yet"
    // }
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