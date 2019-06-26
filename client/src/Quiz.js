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

    const postData = async () => {
        await axios.post(`/result`, { quiz })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        postData()
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