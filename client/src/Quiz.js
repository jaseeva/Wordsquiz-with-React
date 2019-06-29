import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import QuizItem from './QuizItem';

function Quiz () {
    const [quiz, setQuiz] = useState([])
    const [done, setDone] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('/quiz')
            await setQuiz(result.data)
        }
        fetchData()
    },[])
  
    const handleChange = (word_id, ans) => {
        const arr = [...quiz]
        let obj = arr.find(obj => obj.id == word_id);
        obj.answer = ans
        setQuiz(arr)
    }

    const updateData = async () => {
        quiz.forEach(el => {
            let correct = false
            if (el.translation === el.answer) {correct = true}
            el = {...el, correct}
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
        {done ? <Redirect to="/results" /> : null}
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
        </React.Fragment>
    )
}

export default Quiz;