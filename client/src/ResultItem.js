import React from 'react';

function ResultItem ({
    word,
    answer,
    translation,
    correct
}) { 
    return (
    <React.Fragment>
        {correct ?
            <div className="result-correct">
                {word} - {answer} 
            </div> 
        :
            <div className="result-wrong">
                {word} - <div className="user-answer">{answer}</div> - {translation}
            </div>
        }
    </React.Fragment>
    )
}

export default ResultItem;