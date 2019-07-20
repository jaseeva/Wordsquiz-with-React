import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import StackedBarGraph from "./StackedBarGraph";

const HistoryChart = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await axios.get("/quiz_history");
      const quizzes = res.data;
      const stats = [];

      quizzes.forEach(el => {
        const i = {};
        i.name = moment(el.quiz_date).format("D/M");
        i.c = el.answered_correct;
        i.w = el.answered_wrong;
        stats.push(i);
      });

      //console.log(`stats: `, stats)
      await setHistory(stats);
      //console.log(`history: `, history)
    };
    fetchHistory();
  }, []);

  return (
    <div className="chart shadow-box">
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
