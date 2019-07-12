import React from 'react';
import styled from 'styled-components';
import Word from './Word';

const Result = styled.div`
    width: 50%;
    box-shadow: 5px 5px 10px 0px rgba(0,0,0,0.5);
    padding: 20px 40px;
    margin: 15px auto;
    text-align: center;
    line-height: 40px;
    background-color: ${props =>
        (props.right ? 'rgba(75, 180, 98, 0.3)' : 'rgba(253, 33, 84, 0.3)')};
    border: ${props =>
        (props.right ? '1px solid rgba(75, 180, 98, 0.3)' : '1px solid rgba(253, 33, 84, 0.3)')};
`;

// const Word = styled.text`
//     font-weight: bold;
//     font-size: larger;
// `;

const Translation = styled.text`
    font-style: italic;
`;

const UserAnswerIncorrect = styled.text`
    text-decoration: line-through;
    display: inline;
`;


const ResultItem = ({
    word,
    answer,
    translation,
    correct
}) => { 
    return (
    <React.Fragment>
        {correct 
        ? (
            <Result right>
                <Word text={word} /><br/>
                <Translation>{answer}</Translation> 
            </Result> 
        ) : (
            <Result>
                <Word text={word} /><br/>
                {answer ? (<UserAnswerIncorrect>{answer}</UserAnswerIncorrect>) : "not answered" }<br/>
                <Translation>{translation}</Translation>
            </Result>
        )}
    </React.Fragment>
    )
}

export default ResultItem;