import React, { useState, useEffect } from "react";
import { Container, Row } from "react-grid";
import axios from "axios";
import moment from "moment";
import FileUpload from "../components/FileUpload";
import WordList from "../components/WordList";
import Branch from "../components/Branch";
import Error from "../components/Error";
import ModalBox from "../components/ModalBox";
import ActionButton from "../components/ActionButton";
import AddWordForm from "../components/AddWordForm";

const Empty = () => <p>Please upload a .csv file to add some words</p>;

const WordsPage = () => {
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [show, setShow] = useState(false);
  const [sort, setSort] = useState({column: null, order: 'desc'})
  const [value, setValue] = useState()

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

  const notEmpty = data => data.length > 0;

  const onWordChange = (newValue) => {
    setValue(newValue)
  }

  const onWordSubmit = () => {
    if (value) {
      const newWord = [value]
      axios.post("/new_word", newWord)
      window.location.reload()
    }
  }

  const onSort = (column) => (e) => {
    const order = sort.column ? (sort.order === 'asc' ? 'desc' : 'asc') : 'desc';
    const sortedData = data.sort((a, b) => {
      if (column === 'rating') {
        return a.learned_rating - b.learned_rating;
      } else {
        const dateA = a.last_answered ? moment(a.last_answered).format("x") : 0
        const dateB = b.last_answered ? moment(b.last_answered).format("x") : 0
        return dateA - dateB;
      }
    });
      
    if (order === 'desc') {
      sortedData.reverse();
    }
    
    setData(sortedData)
    setSort({column, order}); //why is it properly updated only from 2nd click?
    // console.log(`sort: `, sort)
  };

  const showModal = () => {
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };

  const handleRemove = id => {
    axios.delete(`/delete_word/${id}`);
    const newData = data.filter(el => el.id !== id);
    setData(newData);
  };

  const resetRatings = () => {
    axios.patch(`/reset_ratings`);
    setShow(false);
    // do I have to mock what I did in database? is there abother way to immediately refresh data?
    const newData = data.map(el => (el = { ...el, learned_rating: 0 }));
    setData(newData);
  };

  return (
    <Container className="list-page">
      <Row className="page-title">
        <h1>Words List</h1>
      </Row>

      <Container className="words-list shadow-box">
        <FileUpload />
        <AddWordForm onChange={onWordChange} onSubmit={onWordSubmit} />
        {isError && <Error />}
        <Branch
          condition={notEmpty(data)}
          Component={WordList}
          Alt={Empty}
          data={data}
          handleRemove={handleRemove}
          handleSort={onSort}
        />
        <ModalBox show={show} handleClose={hideModal}>
          <p>
            Are you sure you want to reset all learned ratings to 0? This action
            can't be undone and you'll never prove that you ever knew anything
            at all.
          </p>
          <ActionButton handleClick={resetRatings} text="Reset" />
        </ModalBox>
        {notEmpty(data) && (
          <button className="action-icon" onClick={showModal}>
            Reset word ratings
          </button>
        )}
      </Container>
    </Container>
  );
};

export default WordsPage;
