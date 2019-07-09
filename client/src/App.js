import React from 'react';
import { Container, Row, Col } from 'react-grid';
import { Route, NavLink, HashRouter, Switch } from "react-router-dom";
import styled from 'styled-components';
import List from './List';
import Quiz from './Quiz';
import Results from './Results';
import Dashboard from './Dashboard';

const NavTitle = styled.a`
  text-decoration: none;
  color: black;
  width: auto;

  &:hover {
    color: #AE3F7B;
  }
`;

function App () {
    return (
      <HashRouter>
        <Container className="App">
          <Row className="navigation">
            <Col className="nav-title"><NavTitle href="/"><h1>Words Quiz App</h1></NavTitle></Col>
            <Col md='auto' className="nav-item"><NavLink to="/quiz">Start Quiz</NavLink></Col>
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

// function App () {
//   return (
//     <HashRouter>
//       <Container className="App">
//         <Row className="navigation">
//           <Col className="nav-title"><h1>Words Quiz App</h1></Col>
//           <Col md='auto' className="nav-item"><NavLink to="/quiz">Start Quiz</NavLink></Col>
//           <Col md='auto'className="nav-item"><NavLink to="/list">Word List</NavLink></Col>
//         </Row>
//         <Container className="page-content">
//           <Route path="/quiz" component={Quiz}/>
//           <Route path="/list" component={List}/>
//         </Container>
//       </Container>
//     </HashRouter>
//   );
// }
    
export default App;