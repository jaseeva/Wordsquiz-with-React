import React from 'react';
import { Container, Row, Col } from 'react-grid';
import { Route, NavLink, HashRouter, Switch } from "react-router-dom";
import styled from 'styled-components';
import List from './pages/List';
import Quiz from './pages/Quiz';
import Results from './pages/Results';
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
            <Col md='auto' className="nav-item"><NavLink to="/list">Word List</NavLink></Col>
          </Row>
          <Container className="page-content">
            <Switch>
              <Route exact path="/" component={Dashboard}/>
              <Route path="/quiz" component={Quiz}/>
              <Route path="/list" component={List}/>
              <Route path="/results" component={Results}/>
            </Switch>
          </Container>
        </Container>
      </HashRouter>
    );
  }
    
export default App;