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
        // .then(res => {
        //     const arr = []
        //     this.state.quiz.map(word => {
        //         const item = {id: word.id, answer: ""}
        //         arr.push(item)
        //         console.log(`arr: `, arr)
        //     })
        //     this.setState({answers: arr})
        // })
    }

    // the problem is that I can't set an answer connected to a certain word, and get answer saved after every key input.
    // try merging in object or google how to submit a form and get all values from it
    handleChange(id, answer) {
        // let key = id
        // this.setState(prevState => ({
        //     quiz: prevState.quiz.map(el => 
        //         el.id === key ? { ...el, answer: answer } : el
        //     )
        // }))
        this.addAnswer(id, answer)
        // let newAnswer = Object.assign({}, this.state.answers, {id: key, answer:answer});
        // this.setState({answers: newAnswer});
    }

    addAnswer(id, answer) {
        const a = [...this.state.answers, {id: id, answer: answer}]
        this.setState({answers: a})

    }

    handleSubmit(event) {
        event.preventDefault();
        // const id = event.target.id
        // const answer = event.target.answer
        // const item = [{id : id, answer: answer}]
        // this.setState({answers: [...this.state.answers, item]})

        //     axios.post(`https://jsonplaceholder.typicode.com/users`, { user })
        //   .then(res => {
        //     console.log(res);
        //     console.log(res.data);
        //   })
    }
    
    render () {
        return (
            <div className="quiz-content">
                <form onSubmit={this.handleSubmit} >
                    {this.state.quiz.map(word =>
                        <div key={word.id}>
                            <QuizItem word={word.word} id={word.id} onChange={this.handleChange} />
                        </div>
                    )}
                    <input type="submit" value="Done!" />
                </form>
            </div>
        )
    }
}

export default Quiz;