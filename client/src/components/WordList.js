import { React } from "react";
import WordListItem from "../components/WordListItem";

const WordList = ({ data, handleRemove }) => {
  return (
    <React.Fragment>
      <p>Total words: {data.length}</p>
      <table>
        <thead>
          <tr>
            <th>Word</th>
            <th>Translation</th>
            <th>Rating</th>
            <th>Last answered</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map(word => (
            <tr key={word.id}>
              <WordListItem
                id={word.id}
                word={word.word}
                translation={word.translation}
                rating={word.learned_rating}
                date={word.last_answered}
                onClick={handleRemove}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default WordList;
