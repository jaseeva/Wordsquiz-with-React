import React from 'react';
import List from './List';
import Quiz from './Quiz';

function Page ({page}) {
    //maybe better use state?
    if (page === "main") {
        return (
            <div class="navigation">
                <button name="list" onClick={page = "list"}>Word List</button>
                <button name="quiz" onClick={page = "quiz"}>Start Quiz</button>
            </div>
        )
    }
    else if (page === "list") {
        return (
            <List />
        )
    }
    else if (page === "quiz") {
        return (
            <Quiz />
        )
    }
}

export default Page;