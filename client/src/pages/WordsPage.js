import React, { useState, useEffect } from "react";
import { Container, Row } from "react-grid";
import axios from "axios";
import FileUpload from "../components/FileUpload";
import WordList from "../components/WordList";
import Branch from "../components/Branch";
import Error from "../components/Error";
import ModalBox from "../components/ModalBox";

const Empty = () => <p>Please upload a .csv file to add some words</p>;

const WordsPage = () => {
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [show, setShow] = useState(false);

  const showModal = () => {
    setShow(true)
  }

  const hideModal = () => {
    setShow(false)
  }

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

  const handleRemove = (id) => {
    axios.delete(`/delete_word/${id}`)
    const newData = data.filter(el => el.id !== id)
    setData(newData)
  }

  const resetRatings = () => {
    axios.patch(`/reset_ratings`)
    setShow(false)
    // do I have to mock what I did in database? is there abother way to immediately refresh data?
    const newData = data.map(el => el = {...el, learned_rating: 0})
    setData(newData)
  }

  return (
    <Container className="list-page">
      <Row className="page-title">
        <h1>Words List</h1>
      </Row>

      <Container className="words-list shadow-box">
        <FileUpload />
        {isError && <Error/>}
        <Branch condition={notEmpty(data)} Component={WordList} Alt={Empty} data={data} handleRemove={handleRemove} />
        <ModalBox show={show} handleClose={hideModal}>
          <p>Are you sure you want to reset all learned ratings to 0? This action can't be undone and you'll never prove that you ever knew anything at all.</p>
          <button onClick={resetRatings}>BURN!!1</button>
        </ModalBox>
        {notEmpty(data) && <button className="action-icon" onClick={showModal}>Reset word ratings</button>}
      </Container>
    </Container>
  );
};

export default WordsPage;
