import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-grid';
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

  return (
    <Container className="list-page">
      <Row className="page-title">
        <h1>Words List</h1>
      </Row>
      {isError && <div>Something went wrong ...</div>}
      <Container className="words-list">
        <table>
          <tr>
            <th>Word</th>
            <th>Translation</th>
            <th>Rating</th>
            <th>Last answered</th>
          </tr>
            {data.map(word =>
              <tr key={word.id}><WordListItem word={word.word} translation={word.translation} rating={word.learned_rating} date={word.last_answered} /></tr>
            )}
        </table>
      </Container>
    </Container>
  );
}

export default List;