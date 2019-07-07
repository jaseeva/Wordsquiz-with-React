import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
//import {Redirect, Route} from 'react-router-dom';
import axios from 'axios';
import QuizItem from './QuizItem';
import ResultsPage from './ResultsPage';

const DoneButton = styled.button`
    width: 100%;
    font-weight: bold;
    font-size: 16px;
    font-family: Montserrat;
    margin: auto;
    padding: 20px;
    border: 2px solid #AE3F7B;
    color: #AE3F7B;
    background: white;
    cursor: pointer;

    &:hover {
        background-color: #AE3F7B;
        color: white;
    }
`;

function Quiz () {
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
            <ResultsPage data={quiz} />
        ) : (
            <div className="quiz-content">
                <form onSubmit={handleSubmit} >
                    {quiz.map(word =>
                        <div key={word.id}>
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

export default Quiz;