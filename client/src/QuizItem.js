import React, {Component} from 'react';

class QuizItem extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(e) {
        this.props.onChange(e.target.id, e.target.value);
    }

    render () {
        return (
        <div className="quiz-item">
            <label>{this.props.word}</label>
            <input type="text" id={this.props.id} onChange={this.handleChange} />
        </div>
        )
    }
}

export default QuizItem;