import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import StackedBarGraph from "./StackedBarGraph";
import Error from "./Error";

const HistoryChart = () => {
  const [history, setHistory] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      setIsError(false);
      try {
        const res = await axios.get("/quiz_history");
        const quizzes = res.data;
        const stats = quizzes.map(el => {
          return {
            name: moment(el.quiz_date).format("D/M"),
            c: el.answered_correct,
            w: el.answered_wrong
          }
        })
        setHistory(stats);
      } catch (error) {
        setIsError(true);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="chart shadow-box">
      {isError && <Error/>}
      {history.length > 0 ? (
        <React.Fragment>
          <div className="bar-comment">
            Here you can see your stats for the last 10 quizzes
          </div>
          <StackedBarGraph data={history} />
        </React.Fragment>
      ) : (
        <p>No quizzes answered yet :(</p>
      )}
    </div>
  );
};

export default HistoryChart;
