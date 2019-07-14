import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, Row } from 'react-grid';
import WordListItem from './WordListItem';
import axios from 'axios';

const AddButton = styled.button`
    float: right;
    font-weight: bold;
    font-size: 16px;
    font-family: Montserrat;
    padding: 10px 20px;
    margin-bottom: 10px;
    border: 2px solid #486D87;
    background: white;
    color: #486D87;
    cursor: pointer;

    &:hover {
        background-color: #486D87;
        color: white;
    }
`;

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

  const handleClick = () => {
    const filename = './files/words.csv'
    axios.post("/upload", filename)
  }

  return (
    <Container className="list-page">
      <Row className="page-title">
        <h1>Words List</h1>
      </Row>
      {isError && <div>Something went wrong ...</div>}
      <Container className="words-list shadow-box">
        <AddButton onClick={handleClick}>Add words</AddButton>
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