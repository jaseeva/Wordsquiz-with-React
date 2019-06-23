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
            <td>{this.props.word}</td>
            <td><input type="text" value={this.props.answer} id={this.props.id} onChange={this.handleChange}/></td>
        </div>
        )
    }
}

export default QuizItem;