const questions = [
  {
    prompt: "How many sizes of headers are available in HTML by default?",
    correctAnswer: "6",
    answers: ["5", "1", "3", "6"],
  },
  {
    prompt:
      "Which attribute is used to provide a unique name to an HTML element?",
    correctAnswer: "id",
    answers: ["id", "class", "type", "None of above"],
  },
  {
    prompt: "Which property allows an image link to show a text label?",
    correctAnswer: "alt",
    answers: ["str", "alt", "alternative", "None of above"],
  },
  {
    prompt:
      "The CSS property used to specify the transparency of an element is?",
    correctAnswer: "opacity",
    answers: ["opacity", "visibility", "filter", "None of above"],
  },
  {
    prompt:
      "Which of the following CSS property is used to specify the space between every letter inside an element?",
    correctAnswer: "letter-spacing",
    answers: [
      "alpha-spacing",
      "character-spacing",
      "letter-spacing",
      "alphabet-spacing",
    ],
  },
  {
    prompt:
      "The CSS property used to specify whether the text is written in the horizontal or vertical direction?",
    correctAnswer: "writing-mode",
    answers: ["writing-mode", "text-indent", "word-break", "None of above"],
  },
  {
    prompt: "In JavaScript, what kind of scoping is used?",
    correctAnswer: "Lexical scoping",
    answers: [
      "Literal scoping",
      "Sequential scoping",
      "Segmental scoping",
      "Lexical scoping",
    ],
  },
  {
    prompt: "Which of the following is not a JavaScript Data Types?",
    correctAnswer: "Float",
    answers: ["Boolean", "Undefined", "Number", "Float"],
  },
  {
    prompt: "Which of the following is not a JavaScript framework or library?",
    correctAnswer: "Cassandra",
    answers: ["Polymer", "Meteor", "jQuery", "Cassandra"],
  },
  {
    prompt: "What was the original name of JavaScript when it discovered?",
    correctAnswer: "Mocha",
    answers: ["LiveScript", "EScript", "JScript", "Mocha"],
  },
];

let questionNumber = 0;
let score = 0;

function getQuestionAndAnswers() {
  if (questionNumber < questions.length) {
    $(".the-question").html(questions[questionNumber].prompt);
    $(".choice-1").html(questions[questionNumber].answers[0]);
    $(".choice-2").html(questions[questionNumber].answers[1]);
    $(".choice-3").html(questions[questionNumber].answers[2]);
    $(".choice-4").html(questions[questionNumber].answers[3]);
    $("input[id=1]").val(questions[questionNumber].answers[0]);
    $("input[id=2]").val(questions[questionNumber].answers[1]);
    $("input[id=3]").val(questions[questionNumber].answers[2]);
    $("input[id=4]").val(questions[questionNumber].answers[3]);
  } else {
    results();
    restart();
    $(".question-count").html(10);
  }
}

function updateNumberCount() {
  questionNumber++;
  $(".question-count").html(questionNumber + 1);
}

function updateScore() {
  score += 20;
  $(".current-score").html(score);
}

function startGame() {
  $(".start-page").on("click", ".start-button", function (event) {
    $(".start-page").addClass("hidden");
    $(".question-form").removeClass("hidden");
    $(".question-count").html(1);
    event.preventDefault();
    console.log(questionNumber);
  });
}

function clearChoices() {
  $("input[type=radio]").prop("checked", false);
}

function wrongFeedback() {
  $(".question-form").addClass("hidden");
  $(".wrong-feedback").removeClass("hidden");
  $(".feedback")
    .find(".correct-answer-alert")
    .html(`correct answer is: ${questions[questionNumber].correctAnswer}`);
}
function correctFeedback() {
  $(".question-form").addClass("hidden");
  $(".correct-feedback").removeClass("hidden");
  $(".feedback")
    .find(".correct-answer-alert")
    .html(`correct answer is: ${questions[questionNumber].correctAnswer}`);
}

function evaluateChoice() {
  $(".answers").on("submit", function (event) {
    let selected = $("input:checked");
    let choice = selected.val();
    let rightAnswer = questions[questionNumber].correctAnswer;
    if (choice === rightAnswer) {
      correctFeedback();
      updateScore();
      console.log(choice);
      console.log(rightAnswer);
    } else {
      wrongFeedback();
      console.log(choice);
      console.log(rightAnswer);
    }
    event.preventDefault();
  });
}

function results() {
  $(".question-form").html(`<h2>your score: ${score}</h2>
    <button class="restartButton">Restart Quiz</button></div>`);
}

function restart() {
  $(".restartButton").on("click", function (event) {
    location.reload();
  });
}

function nextQuestion() {
  console.log(questionNumber);
  $(".next").on("submit", function (event) {
    $(".question-form").removeClass("hidden");
    $(".correct-feedback").addClass("hidden");
    $(".wrong-feedback").addClass("hidden");
    updateNumberCount();
    getQuestionAndAnswers();
    clearChoices();
    event.preventDefault();
  });
}

function quiz() {
  startGame();
  getQuestionAndAnswers();
  evaluateChoice();
  nextQuestion();
}

$(quiz);
