import React, {Component} from 'react';
import axios from 'axios';

class Quiz extends Component {
    constructor(){
      super()
      this.state = {
        median: 0
      };
    }
  
    componentDidMount() {
        axios.get('/median')
        .then(res => {
            console.log(`res_: `, res);
            this.setState({ median: res.data });
        })
    }
    
    render () {
        return (
            <p>Here's a quiz! 
            Median is {this.state.median}</p>
        )
    }
}

export default Quiz;