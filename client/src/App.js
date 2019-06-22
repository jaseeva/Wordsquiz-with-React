import React from 'react';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import List from './List';
import Quiz from './Quiz';

function App () {
  return (
    <HashRouter>
      <div className="App">
        <div className="navigation">
          <ul className="nav-buttons">
            <li><NavLink to="/quiz">Start Quiz</NavLink></li>
            <li><NavLink to="/list">Word List</NavLink></li>
          </ul>
        </div>
        <div className="page-content">
          <Route path="/quiz" component={Quiz}/>
          <Route path="/list" component={List}/>
        </div>
      </div>
    </HashRouter>
  );
}
    
export default App;