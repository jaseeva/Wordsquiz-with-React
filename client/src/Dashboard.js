import React, {useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { PieChart, Pie, Sector, Cell, BarChart, Bar, XAxis, } from 'recharts';
import moment from 'moment';

const COLORS = ['#2CA18C', '#C14364']; 

const Dashboard = () => {
  const [last, setLast] = useState([])
  const [history, setHistory] = useState([])

  useEffect(() => {
    const fetchLast = async () => {
        const res = await axios.get('/last_quiz')
        const item = res.data[0]
        
        const update = []
        
        if (item) {
          const cor = {name: 'Correct'}
          cor.value = item.answered_correct
          
          const wro = {name: 'Wrong'}
          wro.value = item.answered_wrong
          
          update.push(cor)
          update.push(wro)
        }
        
        //console.log(`update: `, update)
        await setLast(update)
        //console.log(`last: `, last)
    }
    const fetchHistory = async () => {
      const res = await axios.get('/quiz_history')
      const quizzes = res.data
      const stats = []
      
      quizzes.forEach(el => {
        const i = {}
        i.name = moment(el.quiz_date).format('D/M')
        i.c = el.answered_correct
        i.w = el.answered_wrong
        stats.push(i)
      });
      
      //console.log(`stats: `, stats)
      await setHistory(stats)
      //console.log(`history: `, history)
  }
    fetchLast()
    fetchHistory()
  },[])

    return (
        <React.Fragment>
            <div className="dashboard-page">
                <div className="page-title">
                    <h1>Last quiz</h1>
                </div>
                <div className="chart shadow-box">
                  {last.length > 0 ? 
                  (<React.Fragment>
                    <PieChart width={250} height={150} className="pie">
                    <Pie
                    data={last} 
                    dataKey="value"
                    cx='50%'
                    cy='75%' 
                    startAngle={180}
                    endAngle={0}
                    innerRadius={40}
                    outerRadius={80} 
                    fill="#8884d8"
                    paddingAngle={0}
                    >
                      {
                        last.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)
                      }
                    </Pie>
                  </PieChart>
                  <div className="wrap-comment"> 
                    <div className="pie-comment">
                        <p>Correct: {last[0].value}<br/>
                        Wrong: {last[1].value}</p>
                        <div className='nav-item' ><NavLink to={{pathname: "/quiz", state:'repeat'}}>Repeat last quiz</NavLink></div>
                    </div>
                  </div>
                  </React.Fragment>
                  ) : (<p>Looks like you haven't done any quizzes yet!</p>)}
                </div>
                <div className="page-title">
                  <h1>Performance</h1>
                </div>
                <div className="chart shadow-box">
                  {history.length > 0 ? (
                    <React.Fragment>
                      <div className="bar-comment">
                          Here you can see your stats for the last 10 quizzes
                      </div>
                      <BarChart
                        className="bar"
                        width={500}
                        height={300}
                        data={history}
                        margin={{
                        top: 20, right: 30, left: 20, bottom: 5,
                        }}
                      >
                        <XAxis dataKey="name" />
                        <Bar barSize={40} dataKey="c" stackId="a" fill="#2CA18C" />
                        <Bar barSize={40} dataKey="w" stackId="a" fill="#C14364" />
                      </BarChart>
                    </React.Fragment>
                  ) : (
                    <p>No quizzes answered yet :(</p>
                  )}
                </div>
            </div>
        </React.Fragment>
    )
}

export default Dashboard;