import React from "react";

const ActionButton = ({ text, handleClick }) => {
  return (
    <button className="action-button" onClick={handleClick}>
      {text}
    </button>
  );
};

export default ActionButton;
