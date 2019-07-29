import React, { useEffect, useState } from "react";
import { Redirect, withRouter } from "react-router-dom";
import axios from "axios";
import QuizContent from "../components/QuizContent";
import Branch from "../components/Branch";
import Error from "../components/Error";

const Empty = () => 
  <div className="chart shadow-box">
    <p>No words found :(</p>
  </div>
  // <ShadowBox wide>{text.QuizPage.empty}</ShadowBox>

const QuizPage = props => {
  const [quiz, setQuiz] = useState([]);
  const [done, setDone] = useState(false);
  const [isError, setIsError] = useState(false);
  // console.log(`props: `, props)

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      try {
        const result = await axios.get("/quiz");
        const words = result.data;
        const withAnswerField = words.map(el => el = {...el, correct: false})
        setQuiz(withAnswerField);
      } catch (error) {
        setIsError(true);
      }
    };

    const fetchLast = async () => {
      setIsError(false);
      try {
        const result = await axios.get("/quiz_repeat");
        const words = result.data;
        const withAnswerField = words.map(el => el = {...el, correct: false})
        setQuiz(withAnswerField);
      } catch (error) {
        setIsError(true);
      }
    };

    const mode = props.location.state;
    if (mode === "repeat") fetchLast();
    else fetchData();
  }, []);

  const handleChange = (word_id, ans) => {
    const arr = [...quiz];
    const obj = arr.find(obj => obj.id === Number(word_id));
    obj.answer = ans;
    if (obj.answer === obj.translation) {
      obj.correct = true;
    } else {
      obj.correct = false;
    }
    setQuiz(arr);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const newQuiz = [...quiz];
    axios.patch("/save_quiz", newQuiz);
    setDone(true);
  };

  const notEmpty = (data) => data.length > 0;

  return (
    <React.Fragment>
      {/* {isError && <Error/>} */}
      {done ? (
        <Redirect to={{ pathname: "/results", state: { quiz } }} />
      ) : (
        <Branch 
          condition={notEmpty(quiz)} 
          Component={QuizContent} 
          Alt={Empty} 
          quiz={quiz}
          onSubmit={handleSubmit}
          onChange={handleChange}
        />
      )}
    </React.Fragment>
  );
};

export default withRouter(QuizPage);
