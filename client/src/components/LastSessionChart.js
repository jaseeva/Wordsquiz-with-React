import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import PieGraph from "./PieGraph";
import Error from "./Error";

const LastSessionChart = () => {
  const [last, setLast] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchLast = async () => {
      setIsError(false);
      try {
        const res = await axios.get("/last_quiz");
        const item = res.data[0];

        const update = [];

        if (item) {
          const cor = { name: "Correct" };
          cor.value = item.answered_correct;

          const wro = { name: "Wrong" };
          wro.value = item.answered_wrong;

          update.push(cor);
          update.push(wro);
        }
        setLast(update);
      } catch (error) {
        setIsError(true);
      }
    };
    fetchLast();
  }, []);

  return (
    <div className="chart shadow-box">
      {isError && <Error/>}
      {last.length > 0 ? (
        <React.Fragment>
          <PieGraph data={last} />
          <div className="wrap-comment">
            <div className="pie-comment">
              <p>
                Correct: {last[0].value}
                <br />
                Wrong: {last[1].value}
              </p>
              <div className="nav-item">
                <NavLink to={{ pathname: "/quiz", state: "repeat" }}>
                  Repeat last quiz
                </NavLink>
              </div>
            </div>
          </div>
        </React.Fragment>
      ) : (
        <p>Looks like you haven't done any quizzes yet!</p>
      )}
    </div>
  );
};

export default LastSessionChart;
