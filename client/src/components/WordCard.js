import React from "react";
import Word from "./Word";
import styled from "styled-components";
import QuizInput from "./QuizInput";
import ResultItem from "./ResultItem";

const Card = styled.div`
  width: ${props => props.theme !== "quiz" && "50%"};
  padding: 20px 40px;
  margin: ${props => (props.theme === "quiz" ? "5%" : "15px auto")};
  text-align: center;
  line-height: 40px;
  background-color: ${props =>
    props.theme === "correct-true"
      ? "rgba(75, 180, 98, 0.3)"
      : props.theme === "correct-false"
        ? "rgba(253, 33, 84, 0.3)"
        : "white"};
  border: ${props =>
    props.theme === "correct-true"
      ? "1px solid rgba(75, 180, 98, 0.3)"
      : props.theme === "correct-false"
        ? "1px solid rgba(253, 33, 84, 0.3)"
        : "none"};
`;

const WordCard = ({
  word,
  isQuiz,
  onChange,
  id,
  answer,
  translation,
  isCorrect,
  theme
}) => {
  return (
    <React.Fragment>
      {isQuiz ? (
        <Card theme={theme} className="quiz-item shadow-box">
          <Word text={word} />
          <br />
          <QuizInput word={word} id={id} onChange={onChange} />
        </Card>
      ) : (
        <Card theme={theme} className="result shadow-box">
          <Word text={word} />
          <br />
          <ResultItem
            word={word}
            answer={answer}
            translation={translation}
            isCorrect={isCorrect}
          />
        </Card>
      )}
    </React.Fragment>
  );
};

export default WordCard;
