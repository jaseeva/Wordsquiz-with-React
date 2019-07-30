import React from "react";
import WordCard from "../components/WordCard";
import ActionButton from "./ActionButton";

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
        <ActionButton type="submit" text="Done!" />
        </form>
    </div>
  )
};

export default QuizContent;
