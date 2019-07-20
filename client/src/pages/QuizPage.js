import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Redirect, withRouter } from "react-router-dom";
import axios from "axios";
import WordCard from "../components/WordCard";

const DoneButton = styled.button`
  width: 90%;
  font-weight: bold;
  font-size: 16px;
  font-family: Montserrat;
  margin: auto;
  padding: 20px;
  border: 2px solid #486d87;
  background: #f7f6ee;
  color: #486d87;
  cursor: pointer;

  &:hover {
    background-color: #486d87;
    color: white;
  }
`;

const QuizPage = props => {
  const [quiz, setQuiz] = useState([]);
  const [done, setDone] = useState(false);
  // console.log(`props: `, props)

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("/quiz");
      const words = result.data;
      words.forEach(el => {
        el.correct = false;
      });
      await setQuiz(words);
    };

    const fetchLast = async () => {
      const result = await axios.get("/quiz_repeat");
      const words = result.data;
      words.forEach(el => {
        el.correct = false;
      });
      await setQuiz(words);
    };

    const mode = props.location.state;
    if (mode === "repeat") fetchLast();
    else fetchData();
  }, []);

  const handleChange = (word_id, ans) => {
    const arr = [...quiz];
    // eslint-disable-next-line
    let obj = arr.find(obj => obj.id == word_id);
    obj.answer = ans;
    if (obj.answer === obj.translation) {
      obj.correct = true;
    } else {
      obj.correct = false;
    }
    setQuiz(arr);
  };

  const updateData = async () => {
    const newQuiz = [...quiz];
    axios.patch("/save_quiz", newQuiz);
  };

  const handleSubmit = event => {
    event.preventDefault();
    updateData();
    setDone(true);
  };

  return (
    <React.Fragment>
      {done ? (
        <Redirect to={{ pathname: "/results", state: { quiz } }} />
      ) : (
        <div className="quiz-content">
          <form onSubmit={handleSubmit}>
            {quiz.map(word => (
              <WordCard
                key={word.id}
                isQuiz
                word={word.word}
                id={word.id}
                onChange={handleChange}
                theme="quiz"
              />
            ))}
            <DoneButton type="submit">Done!</DoneButton>
          </form>
        </div>
      )}
    </React.Fragment>
  );
};

export default withRouter(QuizPage);
