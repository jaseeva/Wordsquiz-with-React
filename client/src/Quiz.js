import React, {useEffect, useState} from 'react';
import axios from 'axios';
import QuizItem from './QuizItem';

function Quiz () {
    const [quiz, setQuiz] = useState([])

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

    const handleSubmit = (event) => {
        event.preventDefault();
        //     axios.post(`https://jsonplaceholder.typicode.com/users`, { user })
        //   .then(res => {
        //     console.log(res);
        //     console.log(res.data);
        //   })
    }
    
    return (
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
    )
}

export default Quiz;