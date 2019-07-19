import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, Row } from 'react-grid';
import WordListItem from '../components/WordListItem';
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
  const [file, setFile] = useState([])

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

  const handleChange = (event) => {
    //console.log(`selected: `, event.target.files[0])
    setFile(event.target.files[0])
    console.log(`file: `, file)
  }

  const handleSubmit = (event) => {
    //event.preventDefault();

    const data = new FormData();
    data.append('file', file);
    console.log(`data: `, data)
    axios.post("/upload", data)
  }

  return (
    <Container className="list-page">
      <Row className="page-title">
        <h1>Words List</h1>
      </Row>
      {isError && <div>Something went wrong ...</div>}
      <Container className="words-list shadow-box">
        <form encType="multipart/form-data" className='upload-form' onSubmit={handleSubmit}>
          <input type='file' accept=".csv" name='newWords' onChange={handleChange} />
          <AddButton type='submit'>Add words</AddButton>
        </form>
        {data.length > 0 ? (
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
        ) : (
          <p>Please upload a .scv file to add some words</p>
        )}
      </Container>
    </Container>
  );
}

export default List;