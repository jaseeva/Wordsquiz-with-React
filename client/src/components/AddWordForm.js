import React from "react";
import ActionButton from "./ActionButton";
import axios from "axios";

const AddWordForm = ({onChange, onSubmit, value}) => {

  const handleChange = e => {
    onChange(e.target.value)
  }

  return (
    <form onSubmit={onSubmit} className="word-form">
        <input type="text" autoComplete="off" placeholder="word;translation" value={value} onChange={handleChange} />
        <ActionButton text="Add" type="submit" />
    </form>
    // TODO: style input form
    // figure out why it's not reloading
  )
};

export default AddWordForm;