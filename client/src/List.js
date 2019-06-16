import React, { Component } from 'react';
import WordListItem from './WordListItem';
import axios from 'axios';

class List extends Component {
  constructor(){
    super()
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    axios.get('/list')
      .then(res => {
        this.setState({ items: res.data });
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Words List</h1>
        </header>
        {this.state.items.map(word =>
          <div key={word.word}><WordListItem word={word.word} translation={word.translation} rating={word.learned_rating} date={word.last_answered} /></div>
        )}
      </div>
    );
  }
}

export default List;