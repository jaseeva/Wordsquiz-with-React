import React from 'react';

function ResultItem ({
    word,
    answer,
    translation,
    correct
}) { 
    return (
    <React.Fragment>
        {correct 
        ? (
            <td className="result-correct">
                {word} - {answer} 
            </td> 
        ) : (
            <td className="result-wrong">
                {word} - {answer ? (<div className="user-answer">{answer}</div>) : "not answered" } - {translation}
            </td>
        )}
    </React.Fragment>
    )
}

export default ResultItem;