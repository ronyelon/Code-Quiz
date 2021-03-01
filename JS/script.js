//Identify the elements to be used
var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");

var currentQuestionIndex = 0;
var time = questions.length * 55;
var timerId;

function startQuiz() {
  
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");

  
  questionsEl.removeAttribute("class");

  //this starts the timer
  timerId = setInterval(clockTick, 1000);

  // this shows the starting time
  timerEl.textContent = time;

  getQuestion();
}

function getQuestion() {
  // this gets the question
  var currentQuestion = questions[currentQuestionIndex];

  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  //this clears the old question choices
  choicesEl.innerHTML = "";

  currentQuestion.choices.forEach(function(choice, i) {
    
    //this creats a new button for each answer
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;

    //this attaches  event listener to each selection
    choiceNode.onclick = questionClick;

    // displays
    choicesEl.appendChild(choiceNode);
  });
}

function questionClick() {
  
  //this will check if answer is incorrect
  if (this.value !== questions[currentQuestionIndex].answer) {
    //this deducts time if incorrect answer 
    time -= 50;

    if (time < 0) {
      time = 0;
    }
    //this displays the time
    timerEl.textContent = time;
    feedbackEl.textContent = "Wrong!";
    feedbackEl.style.color = "red";
    feedbackEl.style.fontSize = "300%";
  } else {
    feedbackEl.textContent = "Correct!";
    feedbackEl.style.color = "green";
    feedbackEl.style.fontSize = "300%";
  }

  // Gives wrong or right answer feedback
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 500);

  // continue to next question
  currentQuestionIndex++;

  // Time
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  // Clears the timer
  clearInterval(timerId);

  // displays the end screen
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  // shows score
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  // hidse the questions section
  questionsEl.setAttribute("class", "hide");
}

function clockTick() {
  // updates the time
  time--;
  timerEl.textContent = time;

  // if time runs out end quiz
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  // gets the initials 
  var initials = initialsEl.value.trim();

  if (initials !== "") {
    // gets scores from local storage
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    //sets format for the new score
    var newScore = {
      score: time,
      initials: initials
    };

    // saves to local storage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // takes you back 
    window.location.href = "score.html";
  }
}

// submits the initials
submitBtn.onclick = saveHighscore;

// starts the quiz
startBtn.onclick = startQuiz;