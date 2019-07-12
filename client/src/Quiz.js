import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import QuizItem from './QuizItem';

const DoneButton = styled.button`
    width: 90%;
    font-weight: bold;
    font-size: 16px;
    font-family: Montserrat;
    margin: auto;
    padding: 20px;
    border: 2px solid #486D87;
    background: #F7F6EE;
    color: #486D87;
    cursor: pointer;

    &:hover {
        background-color: #486D87;
        color: white;
    }
`;

const Quiz = (props) => {
    const [quiz, setQuiz] = useState([])
    const [done, setDone] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('/quiz')
            const words = result.data
            words.forEach(el => {
                el.correct = false
            });
            await setQuiz(words)
        }
        fetchData()
    },[])
  
    const handleChange = (word_id, ans) => {
        const arr = [...quiz]
        let obj = arr.find(obj => obj.id == word_id);
        obj.answer = ans
        if (obj.answer === obj.translation) {obj.correct = true}
        else {obj.correct = false}
        setQuiz(arr)
    }

    const updateData = async () => {
        const newQuiz = [...quiz]
        axios.patch('/save_quiz', newQuiz)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        updateData()
        setDone(true)
    }
    
    return (
      <React.Fragment>
        {done 
        ? (
            <Redirect to={{pathname: "/results", state: {quiz}}} />
        ) : (
            <div className="quiz-content">
                {/* <div className="page-title">
                    <h1>Quiz</h1>
                </div> */}
                <form onSubmit={handleSubmit} >
                    {quiz.map(word =>
                        <div className="quiz-item shadow-box" key={word.id}>
                            <QuizItem word={word.word} id={word.id} onChange={handleChange} />
                        </div>
                    )}
                    <DoneButton type="submit">Done!</DoneButton>
                </form>
            </div>
        )}
      </React.Fragment>
    )
}

export default withRouter(Quiz);