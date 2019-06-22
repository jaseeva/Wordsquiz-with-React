import React, {Component} from 'react';
import axios from 'axios';
import QuizItem from './QuizItem';

class Quiz extends Component {
    constructor(){
      super()
      this.state = {
        quiz: []
      };
    }
  
    componentDidMount() {
        axios.get('/quiz')
        .then(res => {
            this.setState({ quiz: res.data });
        })
    }
    
    render () {
        return (
            <div className="quiz-content">
                <table>
                    <tbody>
                    {this.state.quiz.map(word =>
                        <tr key={word.id}>
                            <QuizItem word={word.word} translation={word.translation} rating={word.learned_rating} date={word.last_answered} />
                        </tr>
                    )}
                    </tbody>
                </table>
                <button type="submit">Done!</button>
            </div>
        )
    }
}

export default Quiz;