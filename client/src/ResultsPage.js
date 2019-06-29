import React from 'react';
import ResultItem from './ResultItem';

function ResultsPage ({data}) { 
    return (
    <React.Fragment>
        {data.map(word =>
            <div key={word.id}><ResultItem word={word.word} answer={word.answer} translation={word.translation} correct={word.correct} /></div>
        )}
        {console.log(`data: `, data)}
    </React.Fragment>
    )
}

export default ResultsPage;