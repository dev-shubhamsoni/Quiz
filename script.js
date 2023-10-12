const url = 'https://opentdb.com/api.php?amount=10&category=22&difficulty=medium&type=multiple';
let apiData = [];
let counterQuestion = 0;
let totalCorrectAnswer = 0;
let finish;
let checkWrongOrRight = false;
let isChecked = false;
const answerBlock = document.getElementById('answer-block');
const answerSpan = document.querySelectorAll('span');
const question = document.getElementById('question');
const buttonStartQuiz = document.getElementById('button-start-quiz');
const startPage = document.getElementById('start-page');
const questionsPage = document.getElementById('questions-page');
const wrongAnswer1 = document.getElementById('wrong-answer-1');
const wrongAnswer2 = document.getElementById('wrong-answer-2');
const wrongAnswer3 = document.getElementById('wrong-answer-3');
const rightAnswer = document.getElementById('right-answer');
const nextButtonContainer = document.getElementById('next-button-container');
const resultScreen = document.getElementById('result-screen');
const allCorrectAnswer = document.getElementById('total-correct-answer');
const totalWrongAnswer = document.getElementById('total-wrong-answer');
const next = document.getElementById('next');
const spanArray = Array.from(answerSpan);

const gettingQuizData = async () => {
  startPage.hidden = true;
  questionsPage.hidden = false;
  const res = await fetch(url);
  const data = await res.json();
  apiData = data;
  populatingItems(apiData, counterQuestion);
  next.disabled = true;
}

function colorYellowW1() {
  wrongAnswer1.classList.add('yellow');
  wrongAnswer2.classList.remove('yellow');
  wrongAnswer3.classList.remove('yellow');
  rightAnswer.classList.remove('yellow');
}

function colorYellowW2() {
  wrongAnswer1.classList.remove('yellow');
  wrongAnswer2.classList.add('yellow');
  wrongAnswer3.classList.remove('yellow');
  rightAnswer.classList.remove('yellow');
}

function colorYellowW3() {
  wrongAnswer1.classList.remove('yellow');
  wrongAnswer2.classList.remove('yellow');
  wrongAnswer3.classList.add('yellow');
  rightAnswer.classList.remove('yellow');
}

function colorYellowR1() {
  wrongAnswer1.classList.remove('yellow');
  wrongAnswer2.classList.remove('yellow');
  wrongAnswer3.classList.remove('yellow');
  rightAnswer.classList.add('yellow');
}

function populatingItems(apiData, counter) {
  question.textContent = apiData.results[counter].question;
  rightAnswer.textContent = apiData.results[counter].correct_answer;
  
  wrongAnswer1.textContent = apiData.results[counter].incorrect_answers[0];
  wrongAnswer2.textContent = apiData.results[counter].incorrect_answers[1];
  wrongAnswer3.textContent = apiData.results[counter].incorrect_answers[2];
  const shuffledItems = spanArray.sort(() => Math.random() - 0.5);
  shuffledItems.forEach((span) => {
    answerBlock.appendChild(span);
  });
  counterQuestion++;
  if (checkWrongOrRight) {
    totalCorrectAnswer++;
  }
  wrongAnswer1.classList.remove('yellow');
  wrongAnswer2.classList.remove('yellow');
  wrongAnswer3.classList.remove('yellow');
  rightAnswer.classList.remove('yellow');
  checkWrongOrRight = false;
  next.disabled = true;
  if (counterQuestion === 10) {
    nextButtonContainer.removeChild(next);
    finish = document.createElement('button');
    finish.className = 'finish';
    finish.setAttribute("id", "finish-button");
    finish.textContent = 'Finish and see Results';
    nextButtonContainer.appendChild(finish);
    finish.disabled = true;
  }
  addAnswerClickListeners();
}

function results(totalCorrect) {
  
  startPage.hidden = true;
  questionsPage.hidden = true;
  resultScreen.hidden = false;
  const totalIncorrect = 10 - totalCorrect;
  allCorrectAnswer.textContent = `Toal Correct answers: ${totalCorrect}`;
  totalWrongAnswer.textContent = `Total Incorrect answer: ${totalIncorrect}`;
}

function handleFinishClick() {
  results(totalCorrectAnswer);
}

buttonStartQuiz.addEventListener('click', gettingQuizData);
next.addEventListener('click', () => populatingItems(apiData, counterQuestion));

function addAnswerClickListeners() {
  wrongAnswer1.addEventListener('click', () => {
    checkWrongOrRight = false;
    isChecked = true;
    colorYellowW1();
    next.disabled = false;
    addFinishClickListener();
  });

  wrongAnswer2.addEventListener('click', () => {
    checkWrongOrRight = false;
    isChecked = true;
    colorYellowW2();
    next.disabled = false;
    addFinishClickListener();
  });

  wrongAnswer3.addEventListener('click', () => {
    checkWrongOrRight = false;
    isChecked = true;
    colorYellowW3();
    next.disabled = false;
    addFinishClickListener();
  });

  rightAnswer.addEventListener('click', () => {
    checkWrongOrRight = true;
    isChecked = true;
    colorYellowR1();
    next.disabled = false;
    addFinishClickListener();
  });
}

function addFinishClickListener() {
  if (finish && finish.classList.contains('finish')) {
    finish.disabled = false;
    finish.addEventListener('click', handleFinishClick);
  }
}
