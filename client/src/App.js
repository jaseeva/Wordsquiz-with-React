import React from 'react';
import { Container, Row, Col } from 'react-grid';
import { Route, NavLink, HashRouter } from "react-router-dom";
import List from './List';
import Quiz from './Quiz';

function App () {
  return (
    <HashRouter>
      <Container className="App">
        <Row className="navigation">
          <Col className="nav-title"><h1>Words Quiz App</h1></Col>
          <Col md='auto' className="nav-item"><NavLink to="/quiz">Start Quiz</NavLink></Col>
          <Col md='auto'className="nav-item"><NavLink to="/list">Word List</NavLink></Col>
        </Row>
        <Container className="page-content">
          <Route path="/quiz" component={Quiz}/>
          <Route path="/list" component={List}/>
        </Container>
      </Container>
    </HashRouter>
  );
}
    
export default App;