import React from 'react';
import { BarChart, Bar, XAxis } from 'recharts';

const StackedBarGraph = ({data}) => {
  return (
    <BarChart
        className="bar"
        width={500}
        height={300}
        data={data}
        margin={{
            top: 20, right: 30, left: 20, bottom: 5,
        }}
    >
    <XAxis dataKey="name" />
    <Bar barSize={40} dataKey="c" stackId="a" fill="#2CA18C" />
    <Bar barSize={40} dataKey="w" stackId="a" fill="#C14364" />
  </BarChart>
  )
}

export default StackedBarGraph;