# Wordsquiz-with-React
A web app to learn new words in another language. Like flashcards, but better.

**Features:**
- upload .csv file with words which are added to db immediately
- see the list of words
- start a quiz that selects random 5 words with the worst learned_rating (below median)
- see results after completing the quiz
- repeat last quiz
- see chart for the last quiz results and bar graph for past 10 quizzes
- empty states are handled (mostly)

**Setup:**
Works only locally for now.
From the root folder, `npm start` to run the server; 
From the /client folder `npm start` to run the app; 
Test file that can be uploaded is in /files/words.csv

**Tech:**
FE: React with functional components and hooks + occasional styled components; Data fetching with axios.
BE: Express and sqlite database.

**Possible ToDo's:**
- [ ] delete word from the list
- [ ] add sorting for the list columns
- [ ] add error state when starting quiz with no words
- [ ] make responsive and mobile-friendly
- [ ] add loading state for quiz and list
