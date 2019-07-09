import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { PieChart, Pie, Sector, Cell, } from 'recharts';

const COLORS = ['#00C49F', '#FF8042']; 
const data = [{name: 'Correct', value: 4}, {name: 'Wrong', value: 6}]

const Dashboard = () => {
    return (
        <React.Fragment>
            <div className="dashboard-page">
                <div className="page-title">
                    <h1>Last quiz</h1>
                </div>
                <div className="charts">
                  <PieChart width={350} height={150} >
                    <Pie
                    data={data} 
                    cx='50%'
                    cy='75%' 
                    startAngle={180}
                    endAngle={0}
                    innerRadius={60}
                    outerRadius={80} 
                    fill="#8884d8"
                    paddingAngle={5}
                    >
                      {
                        data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
                      }
                    </Pie>
                  </PieChart>
                  <div className="pie-comment">
                      <p>Correct: {data[0].value}   Wrong: {data[1].value}</p>
                  </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Dashboard;