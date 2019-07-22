import React, { useState, useEffect } from "react";
import { Container, Row } from "react-grid";
import axios from "axios";
import FileUpload from "../components/FileUpload";
import WordList from "../components/WordList";
import Branch from "../components/Branch";

const Empty = () => <p>Please upload a .csv file to add some words</p>;

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

  const notEmpty = (data) => data.length > 0;

  return (
    <Container className="list-page">
      <Row className="page-title">
        <h1>Words List</h1>
      </Row>

      <Container className="words-list shadow-box">
        <FileUpload />
        {isError && <p>Something went wrong ...</p>}
        <Branch condition={notEmpty(data)} Component={WordList} Alt={Empty} data={data} />
      </Container>
    </Container>
  );
};

export default WordsPage;
