import React from "react";
import LastSessionChart from "../components/LastSessionChart";
import HistoryChart from "../components/HistoryChart";

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <div className="page-title">
        <h1>Last quiz</h1>
      </div>
      <LastSessionChart />
      <div className="page-title">
        <h1>Performance</h1>
      </div>
      <HistoryChart />
    </div>
  );
};

export default Dashboard;
