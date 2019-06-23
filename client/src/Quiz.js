import React, {Component} from 'react';
import axios from 'axios';
import QuizItem from './QuizItem';

class Quiz extends Component {
    constructor(){
      super()
      this.state = {
        quiz: [],
        answers: []
      }

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    componentDidMount() {
        axios.get('/quiz')
        .then(res => {
            this.setState({ quiz: res.data });
        })
    }

    // the problem is that I can't set an answer connected to a certain word, and get answer saved after every key input.
    // try merging in object or google how to submit a form and get all values from it
    handleChange(id, answer) {
        let newAnswer = [{id : id, answer: answer}]
        this.setState({answers: [...this.state.answers, newAnswer]});
    }

    handleSubmit(event) {
        alert('Answers: ' + this.state.answers);
        event.preventDefault();
    }
    
    render () {
        return (
            <div className="quiz-content">
                <table>
                    <tbody>
                    {this.state.quiz.map(word =>
                        <tr key={word.id}>
                            <QuizItem word={word.word} id={word.id} onChange={this.handleChange} />
                        </tr>
                    )}
                    </tbody>
                </table>
                <button type="submit" onSubmit={this.handleSubmit} >Done!</button>
            </div>
        )
    }
}

export default Quiz;