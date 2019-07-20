import React, { useState, useEffect } from "react";
import { Container, Row } from "react-grid";
import axios from "axios";
import FileUpload from "../components/FileUpload";
import WordList from "../components/WordList";

const WordsPage = () => {
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      try {
        const result = await axios.get("/list");
        //console.log(`result: `, result.data)
        setData(result.data);
      } catch (error) {
        setIsError(true);
      }
    };
    fetchData();
  }, []);

  return (
    <Container className="list-page">
      <Row className="page-title">
        <h1>Words List</h1>
      </Row>

      <Container className="words-list shadow-box">
        {isError && <div>Something went wrong ...</div>}
        <FileUpload />
        {data.length > 0 ? (
          <WordList data={data} />
        ) : (
          <p>Please upload a .csv file to add some words</p>
        )}
      </Container>
    </Container>
  );
};

export default WordsPage;
