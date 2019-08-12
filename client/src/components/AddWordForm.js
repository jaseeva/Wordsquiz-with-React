import React from "react";
import ActionButton from "./ActionButton";

const AddWordForm = ({ onChange, onSubmit }) => {
  const handleChange = e => {
    onChange(e.target.value);
  };

  return (
    <form onSubmit={onSubmit} className="word-form">
      <input
        type="text"
        autoComplete="off"
        placeholder="word;translation"
        onChange={handleChange}
        pattern="[- \w\u00c0-\u024f]+;[- \w\u00c0-\u024f]+"
      />
      <ActionButton text="Add" type="submit" />
    </form>
  );
};

export default AddWordForm;
