import React from 'react';
import ResultItem from './ResultItem';

function ResultsPage ({data}) { 
    return (
    <React.Fragment>
        <table>
        {data.map(word =>
            <tr key={word.id} className="result" ><ResultItem word={word.word} answer={word.answer} translation={word.translation} correct={word.correct} /></tr>
        )}
        </table>
    </React.Fragment>
    )
}

export default ResultsPage;