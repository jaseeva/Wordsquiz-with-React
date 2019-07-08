import React from 'react';
import { withRouter } from 'react-router-dom';
import ResultItem from './ResultItem';

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
                    <div key={word.id} className="result" ><ResultItem word={word.word} answer={word.answer} translation={word.translation} correct={word.correct} /></div>
                )}
            </div>
        </div>
    </React.Fragment>
    )
}

export default withRouter(Results);