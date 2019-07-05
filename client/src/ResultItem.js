import React from 'react';
import styled from 'styled-components';

const Result = styled.div`
    width: 50%;
    border: solid 3px;
    padding: 20px 40px;
    border: 1px solid black;
    margin: 15px auto;
    text-align: center;
    background-color: ${props =>
        (props.right ? 'rgba(75, 180, 98, 0.3)' : 'rgba(253, 33, 84, 0.3)')};
`;

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
            <Result right>
                {word} - {answer} 
            </Result> 
        ) : (
            <Result>
                {word} - {answer ? (<div className="user-answer">{answer}</div>) : "not answered" } - {translation}
            </Result>
        )}
    </React.Fragment>
    )
}

export default ResultItem;