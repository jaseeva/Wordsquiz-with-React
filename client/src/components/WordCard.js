import React from "react";
import Word from "./Word";
import styled from "styled-components";
import QuizInput from "./QuizInput";
import ResultItem from "./ResultItem";

const Card = styled.div`
  padding: 20px 40px;
  margin: 15px auto;
  text-align: center;
  line-height: 40px;
  background-color: white;
  border: none;
  ${props => props.theme === 'quiz' && "margin: 5%;"};
  ${props => props.theme === 'correct-true' && `
    background-color: rgba(75, 180, 98, 0.3);
    border: 1px solid rgba(75, 180, 98, 0.3);
    width: 50%;`
  }
  ${props => props.theme === 'correct-false' && `
    background-color: rgba(253, 33, 84, 0.3);
    border: 1px solid rgba(253, 33, 84, 0.3);
    width: 50%;`
  }
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
