import React from "react";

const QuizInput = ({ word, id, onChange }) => {
  const handleChange = e => {
    onChange(e.target.id, e.target.value);
  };

  return <input type="text" id={id} onChange={handleChange} autoComplete="off" />
};

export default QuizInput;
