import React, { useState, useEffect } from 'react';
import WordListItem from './WordListItem';
import axios from 'axios';

function List () {
  const [data, setData] = useState([])
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      try {
      const result = await axios.get('/list',);
      //console.log(`result: `, result.data)
      setData(result.data);
      } catch (error) {
        setIsError(true);
      }

    };
    fetchData();
  },[]);

  // componentDidMount() {
  //   axios.get('/list')
  //     .then(res => {
  //       this.setState({ items: res.data });
  //     });
  // }

    return (
      <div className="list-page">
        <header className="App-header">
          <h1 className="App-title">Words List</h1>
        </header>
        {isError && <div>Something went wrong ...</div>}
        <table>
          <thead>
            <th>Word</th>
            <th>Translation</th>
            <th>Rating</th>
            <th>Last answered</th>
          </thead>
          <tbody>
            {data.map(word =>
              <tr key={word.id}><WordListItem word={word.word} translation={word.translation} rating={word.learned_rating} date={word.last_answered} /></tr>
            )}
          </tbody>
        </table>
      </div>
    );
}

export default List;