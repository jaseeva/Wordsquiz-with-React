import React from 'react';
import ResultItem from './ResultItem';

function ResultsPage ({data}) { 
    return (
    <React.Fragment>
        <div className="results-page">
            <div className="page-title">
                <h1>Results</h1>
            </div>
            <div className="results">
                {data.map(word =>
                    <div key={word.id} className="result" ><ResultItem word={word.word} answer={word.answer} translation={word.translation} correct={word.correct} /></div>
                )}
            </div>
        </div>
    </React.Fragment>
    )
}

export default ResultsPage;