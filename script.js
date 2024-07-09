const startButton = document.getElementById('start-btn');
const questionContainerElement = document.getElementById('question-container');
const answerButtonsElement = document.getElementById('answer-buttons');
const questionElement = document.getElementById('question');
const scoreContainerElement = document.getElementById('score-container');
const scoreElement = document.getElementById('score');
const viewAnswersButton = document.getElementById('view-answers-btn');
const answersContainerElement = document.getElementById('answers-container');
const answersListElement = document.getElementById('answers-list');

let shuffledQuestions, currentQuestionIndex;
let score = 0;
let answeredQuestions = [];

const questions = [
    {
        question: "What does CPU stand for?",
        answers: [
            { text: "Central Processing Unit", correct: true },
            { text: "Central Processor Unit", correct: false },
            { text: "Computer Processing Unit", correct: false },
            { text: "Control Processing Unit", correct: false }
        ]
    },
    {
        question: "What is the basic unit of digital memory in computing?",
        answers: [
            { text: "Byte", correct: true },
            { text: "Bit", correct: false },
            { text: "Kilobyte", correct: false },
            { text: "Megabyte", correct: false }
        ]
    },
    {
        question: "Which company developed the Java programming language?",
        answers: [
            { text: "Sun Microsystems", correct: true },
            { text: "Microsoft", correct: false },
            { text: "Apple", correct: false },
            { text: "Google", correct: false }
        ]
    },
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hypertext Markup Language", correct: true },
            { text: "Hyper Text Markup Language", correct: false },
            { text: "High Tech Markup Language", correct: false },
            { text: "Hypertext Mode Language", correct: false }
        ]
    },
    {
        question: "What is the main function of a GPU?",
        answers: [
            { text: "Graphics Processing", correct: true },
            { text: "General Processing", correct: false },
            { text: "Gaming Processing", correct: false },
            { text: "Geographical Processing", correct: false }
        ]
    },
    {
        question: "Which programming language is often used for developing mobile apps?",
        answers: [
            { text: "Swift", correct: false },
            { text: "Java", correct: false },
            { text: "JavaScript", correct: false },
            { text: "All of the above", correct: true }
        ]
    },
    {
        question: "What does VPN stand for?",
        answers: [
            { text: "Virtual Private Network", correct: true },
            { text: "Very Personal Network", correct: false },
            { text: "Virtual Personal Network", correct: false },
            { text: "Vital Private Network", correct: false }
        ]
    },
    {
        question: "Which company created the first commercially available computer?",
        answers: [
            { text: "IBM", correct: true },
            { text: "Apple", correct: false },
            { text: "Microsoft", correct: false },
            { text: "Google", correct: false }
        ]
    },
    {
        question: "What is the main purpose of an operating system?",
        answers: [
            { text: "Manage computer hardware and software resources", correct: true },
            { text: "Control network connections", correct: false },
            { text: "Execute program instructions", correct: false },
            { text: "Handle graphics processing", correct: false }
        ]
    },
    {
        question: "What does URL stand for?",
        answers: [
            { text: "Uniform Resource Locator", correct: true },
            { text: "Universal Resource Language", correct: false },
            { text: "Unified Resource Link", correct: false },
            { text: "Unified Resource Locator", correct: false }
        ]
    }
];

startButton.addEventListener('click', startGame);
viewAnswersButton.addEventListener('click', viewAnswers);

function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    answeredQuestions = [];
    scoreContainerElement.classList.add('hide');
    answersContainerElement.classList.add('hide');
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    if (correct) {
        score++;
    }
    saveAnswer(currentQuestionIndex, selectedButton.innerText, correct);
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
        setNextQuestion();
    } else {
        endGame();
    }
}

function saveAnswer(questionIndex, selectedAnswer, correct) {
    const question = shuffledQuestions[questionIndex];
    const correctAnswer = question.answers.find(answer => answer.correct).text;
    answeredQuestions.push({
        question: question.question,
        selectedAnswer: selectedAnswer,
        correctAnswer: correctAnswer,
        correct: correct
    });
}

function endGame() {
    questionContainerElement.classList.add('hide');
    const totalQuestions = questions.length;
    const scoreText = `${score} / ${totalQuestions}`;
    scoreElement.innerText = scoreText;
    scoreContainerElement.classList.remove('hide');
    startButton.innerText = 'Restart Quiz';
    startButton.classList.remove('hide');
}

function viewAnswers() {
    const answersHTML = generateAnswersHTML();
    const newWindow = window.open('');
    newWindow.document.write(answersHTML);
}

function generateAnswersHTML() {
    let html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Quiz Answers</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f7f7f7;
                    padding: 20px;
                }
                .question {
                    margin-bottom: 20px;
                    padding: 10px;
                    border: 1px solid #ccc;
                    background-color: #fff;
                }
                .correct {
                    background-color: #28a745;
                }
                .incorrect {
                    background-color: #dc3545;
                }
            </style>
        </head>
        <body>
            <h1>Quiz Answers</h1>
            <div id="answers-list">
    `;
    answeredQuestions.forEach(answer => {
        const answerClass = answer.correct ? 'correct' : 'incorrect';
        html += `
            <div class="question ${answerClass}">
                <h3>${answer.question}</h3>
                <p>Your answer: ${answer.selectedAnswer}</p>
                <p>Correct answer: ${answer.correctAnswer}</p>
            </div>
        `;
    });
    html += `
            </div>
        </body>
        </html>
    `;
    return html;
}
