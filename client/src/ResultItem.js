import React from 'react';
import styled from 'styled-components';

const Result = styled.div`
    width: 50%;
    border: solid 3px;
    padding: 20px 40px;
    margin: 15px auto;
    text-align: center;
    line-height: 40px;
    background-color: ${props =>
        (props.right ? 'rgba(75, 180, 98, 0.3)' : 'rgba(253, 33, 84, 0.3)')};
    border: ${props =>
        (props.right ? '1px solid rgba(75, 180, 98, 0.3)' : '1px solid rgba(253, 33, 84, 0.3)')};
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
                {word}<br/>
                {answer} 
            </Result> 
        ) : (
            <Result>
                {word}<br/>
                {answer ? (<div className="user-answer">{answer}</div>) : "not answered" }<br/>
                {translation}
            </Result>
        )}
    </React.Fragment>
    )
}

export default ResultItem;