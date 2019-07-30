# Wordsquiz-with-React
A web app to learn new words in another language. Like flashcards, but better.

**Features:**
- upload .csv file with words which are added to db immediately
- see the list of words with current rating and last access date
- delete words from list
- reset learned_rating for all words
- start a quiz that selects random 5 words with the worst learned_rating (below median)
- see results after completing the quiz
- repeat last quiz
- see chart for the last quiz results and bar graph for past 10 quizzes
- empty states are handled (mostly)

**Setup:**
Works only locally for now. Make sure you have node.js installed.
1) From the root folder, run `npm install` and then `npm start` to run the server; 
2) In another terminal, from the /client folder do the same 2 commands to run the app; 
Test file that can be uploaded is in `/files/words.csv`

**Tech:**
FE: React with functional components and hooks + occasional styled components; Data fetching with axios.
BE: Express and sqlite database.

**Possible ToDo's:**
- [x] create folder structure with pages and components
- [x] add empty state when starting quiz with no words
- [x] delete word from the list
- [x] reset word ratings
- [x] improve components composition (ongoing)
- [ ] better error handling
- [ ] make server and app run with 1 command
- [ ] add simple login and update routing
- [ ] add component tests
- [ ] add sorting for the list columns
- [ ] add pagination for the word list
- [ ] add a graph/progress bar showing overall success rate for the whole list
- [ ] make responsive and mobile-friendly
- [ ] add loading state for quiz and list
- [ ] extract text and store it separately
