import React from 'react';
import { withRouter } from 'react-router-dom';
import WordCard from './WordCard';

const Results = (props) => { 
    const data = props.location.state.quiz
    //console.log(`props: `, props)
    return (
    <React.Fragment>
        <div className="results-page">
            <div className="page-title">
                <h1>Results</h1>
            </div>
            <div className="results">
                {data.map(word =>
                    <WordCard key={word.id} word={word.word} answer={word.answer} translation={word.translation} isCorrect={word.correct} theme={`correct-${word.correct}`} />
                )}
            </div>
        </div>
    </React.Fragment>
    )
}

export default withRouter(Results);