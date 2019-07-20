import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const COLORS = ["#2CA18C", "#C14364"];

const PieGraph = ({ data }) => {
  return (
    <React.Fragment>
      <PieChart width={250} height={150} className="pie">
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="75%"
          startAngle={180}
          endAngle={0}
          innerRadius={40}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={0}
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </React.Fragment>
  );
};

export default PieGraph;
