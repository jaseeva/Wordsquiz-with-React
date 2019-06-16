import React, { Component } from 'react';

const WordListItem = ({
    word,
    translation,
    rating,
    date
}) => <div>{word} - {translation}</div>

export default WordListItem;