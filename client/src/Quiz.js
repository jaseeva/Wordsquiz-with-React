import React, {useEffect, useState} from 'react';
import {Redirect, Route} from 'react-router-dom';
import axios from 'axios';
import QuizItem from './QuizItem';
import ResultsPage from './ResultsPage';

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
        setQuiz(arr)
    }

    const updateData = async () => {
        const newQuiz = [...quiz]
        newQuiz.forEach(el => {
            axios.patch(`/results`, { el })
        });
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
                    <input type="submit" value="Done!" />
                </form>
            </div>
        )}
        </React.Fragment>
    )
}

export default Quiz;