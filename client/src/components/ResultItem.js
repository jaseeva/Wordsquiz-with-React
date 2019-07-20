import React from "react";
import styled from "styled-components";

const Translation = styled.text`
  font-style: italic;
`;

const UserAnswerIncorrect = styled.text`
  text-decoration: line-through;
  display: inline;
`;

const ResultItem = ({ word, answer, translation, isCorrect }) => {
  return (
    <React.Fragment>
      {isCorrect ? (
        <React.Fragment>
          <Translation>{answer}</Translation>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {answer ? (
            <UserAnswerIncorrect>{answer}</UserAnswerIncorrect>
          ) : (
            "not answered"
          )}
          <br />
          <Translation>{translation}</Translation>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ResultItem;
