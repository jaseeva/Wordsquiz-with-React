import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { PieChart, Pie, Sector, Cell, BarChart, Bar, XAxis, YAxis, } from 'recharts';

const COLORS = ['#2CA18C', '#C14364']; 
const data = [{name: 'Correct', value: 4}, {name: 'Wrong', value: 6}]
const data_bar = [{name: '1', c: 4, w: 6}, {name: '2', c: 8, w: 2}]

const RepeatButton = styled.button`
    width: 100%;
    font-weight: bold;
    font-size: 16px;
    font-family: Montserrat;
    margin: auto;
    padding: 10px 20px;
    border: 2px solid #486D87;
    background: white;
    color: #486D87;
    cursor: pointer;

    &:hover {
        background-color: #486D87;
        color: white;
    }
`;

const Dashboard = () => {
    return (
        <React.Fragment>
            <div className="dashboard-page">
                <div className="page-title">
                    <h1>Last quiz</h1>
                </div>
                <div className="chart shadow-box">
                  <PieChart width={250} height={150} className="pie">
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
                  <div className="wrap-comment"> 
                    <div className="pie-comment">
                        <p>Correct: {data[0].value}<br/>
                        Wrong: {data[1].value}</p>
                        <RepeatButton>Repeat last quiz</RepeatButton>
                    </div>
                  </div>
                </div>
                <div className="page-title">
                  <h1>Performance</h1>
                </div>
                <div className="chart shadow-box">
                  <div className="bar-comment">
                      Here you can see your stats for the last 10 quizzes
                  </div>
                  <BarChart
                    className="bar"
                    width={500}
                    height={300}
                    data={data_bar}
                    margin={{
                    top: 20, right: 30, left: 20, bottom: 5,
                    }}
                  >
                    <XAxis dataKey="name" />
                    <Bar barSize={40} dataKey="c" stackId="a" fill="#2CA18C" />
                    <Bar barSize={40} dataKey="w" stackId="a" fill="#C14364" />
                  </BarChart>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Dashboard;