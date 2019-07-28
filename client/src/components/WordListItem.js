import React from "react";
import moment from "moment";
import ActionIcon from "./ActionIcon";

function WordListItem({ id, word, translation, rating, date, onClick }) {
  const handleClick = event => {
    onClick(id)
  }

  return (
    <React.Fragment>
      <td>{word}</td>
      <td>{translation}</td>
      <td>{rating}</td>
      <td>{date ? moment(date).format("D MMM, HH:mm") : "never"}</td>
      <td><button className="action-icon" onClick={handleClick}><ActionIcon name='clear' /></button></td>
    </React.Fragment>
  );
}

export default WordListItem;
