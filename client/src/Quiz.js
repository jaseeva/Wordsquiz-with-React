import React, {Component} from 'react';
import axios from 'axios';

class Quiz extends Component {
    constructor(){
      super()
      this.state = {
        median: 0,
        quiz: []
      };
    }
  
    componentDidMount() {
        axios.get('/median')
        .then(res => {
            console.log(`res_: `, res);
            this.setState({ median: res.data });
        })

        axios.get('/quiz?m={this.state.median}')
        .then(res => {
            this.setState({ quiz: res.data });
        })
    }
    
    render () {
        return (
            <p>Here's a quiz! <br/>
            Median is {this.state.median} <br/>
            Quiz is for {this.state.quiz.word}</p>
        )
    }
}

export default Quiz;