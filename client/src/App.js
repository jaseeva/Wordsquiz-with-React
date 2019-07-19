import React from 'react';
import { Container, Row, Col } from 'react-grid';
import { Route, NavLink, HashRouter, Switch } from "react-router-dom";
import styled from 'styled-components';
import WordsPage from './pages/WordsPage';
import QuizPage from './pages/QuizPage';
import ResultsPage from './pages/ResultsPage';
import Dashboard from './pages/Dashboard';

const NavTitle = styled.a`
  text-decoration: none;
  color: black;
  width: auto;

  &:hover {
    color: #486D87;;
  }
`;

const App = () => {
    return (
      <HashRouter>
        <Container className="App">
          <Row className="navigation">
            <Col className="nav-title"><NavTitle href="/"><h1>Words Quiz App</h1></NavTitle></Col>
            <Col md='auto' className="nav-item"><NavLink to={{pathname: "/quiz", state:'nav'}}>Start Quiz</NavLink></Col>
            <Col md='auto' className="nav-item"><NavLink to="/list">Words List</NavLink></Col>
          </Row>
          <Container className="page-content">
            <Switch>
              <Route exact path="/" component={Dashboard}/>
              <Route path="/quiz" component={QuizPage}/>
              <Route path="/list" component={WordsPage}/>
              <Route path="/results" component={ResultsPage}/>
            </Switch>
          </Container>
        </Container>
      </HashRouter>
    );
  }
    
export default App;