import React from 'react';
import styled from 'styled-components';

const WordLabel = styled.text`
font-weight: bold;
font-size: larger;
`;

const Word = ({text}) => {
    return (
        <WordLabel>{text}</WordLabel>
    )
}

export default Word;