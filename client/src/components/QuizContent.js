import React from "react";
import styled from "styled-components";
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

const QuizContent = ({ quiz, onSubmit, onChange }) => {
  const handleSubmit = e => {
    onSubmit(e);
  };

  return (
    <div className="quiz-content">
        <form onSubmit={handleSubmit}>
        {quiz.map(word => (
            <WordCard
            key={word.id}
            isQuiz
            word={word.word}
            id={word.id}
            onChange={onChange}
            theme="quiz"
            />
        ))}
        <DoneButton type="submit">Done!</DoneButton>
        </form>
    </div>
  )
};

export default QuizContent;
