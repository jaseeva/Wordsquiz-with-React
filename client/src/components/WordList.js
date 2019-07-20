import React from "react";
import WordListItem from "../components/WordListItem";

const WordList = ({ data }) => {
  return (
    <table>
      <tr>
        <th>Word</th>
        <th>Translation</th>
        <th>Rating</th>
        <th>Last answered</th>
      </tr>
      <tbody>
        {data.map(word => (
          <tr key={word.id}>
            <WordListItem
              word={word.word}
              translation={word.translation}
              rating={word.learned_rating}
              date={word.last_answered}
            />
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WordList;
