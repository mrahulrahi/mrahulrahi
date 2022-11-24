const questions = [
    {
        prompt: "What is the only country lemurs are native to?",
        correctAnswer: "Madagascar",
        answers: ["Madagascar", "Japan", "Brazil", "Romania"]
    },
    {
        prompt: "What is the worlds largest mammal?",
        correctAnswer: "Blue Whale",
        answers: ["Polar Bear","Blue Whale", "Sperm Whale", "Humpback Whale"]
    },
    {
        prompt: "What is the largest fish species?",
        correctAnswer: "Whale Shark",
        answers: ["Great White Shark", "Sturgeon", "Whale Shark", "Basking Shark"]
    },
    {
        prompt: "What type of tree is the largest in the world?",
        correctAnswer: "Redwood",
        answers: ["Redwood", "Oak", "Sequoias", "Eucalyptus"]
    },
    {
        prompt: "what is the worlds fastest bird?",
        correctAnswer: "Peregrine Falcon",
        answers: ["Golden Eagle", "Frigate Bird", "Gryfalcon", "Peregrine Falcon"]
    }
];

let questionNumber = 0;
let score = 0;


function getQuestionAndAnswers() {
    if (questionNumber < questions.length) {
      
        $('.the-question').html(questions[questionNumber].prompt);
        $('.choice-1').html(questions[questionNumber].answers[0]);
        $('.choice-2').html(questions[questionNumber].answers[1]);
        $('.choice-3').html(questions[questionNumber].answers[2]);
        $('.choice-4').html(questions[questionNumber].answers[3]);
        $('input[id=1]').val(questions[questionNumber].answers[0]);
        $('input[id=2]').val(questions[questionNumber].answers[1]);
        $('input[id=3]').val(questions[questionNumber].answers[2]);
        $('input[id=4]').val(questions[questionNumber].answers[3]);
        
    } else {
        results();
        restart();
        $(".question-count").html(5);
    }
}


function updateNumberCount() {
    questionNumber ++;
    $(".question-count").html(questionNumber+1);
}

function updateScore() {
    score += 20;
    $(".current-score").html(score);
}

function startGame() {
    $(".start-page").on('click', ".start-button", function(event) {
        $(".start-page").addClass('hidden');
        $(".question-form").removeClass('hidden');
        $(".question-count").html(1);
        event.preventDefault();   
        console.log(questionNumber);   
    });
}

function clearChoices() {
    $('input[type=radio]').prop('checked', false);
}

function wrongFeedback() {
    $(".question-form").addClass('hidden');
    $(".wrong-feedback").removeClass('hidden');
    $(".feedback").find('.correct-answer-alert').html(`correct answer is: ${questions[questionNumber].correctAnswer}`);
}
function correctFeedback() {
    $(".question-form").addClass('hidden');
    $(".correct-feedback").removeClass('hidden');
    $(".feedback").find('.correct-answer-alert').html(`correct answer is: ${questions[questionNumber].correctAnswer}`);
}

function evaluateChoice() {
    $('.answers').on('submit', function(event) {
    let selected = $('input:checked');
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
    $(".restartButton").on('click', function(event) {
        location.reload();
    })
}

function nextQuestion() {
    console.log(questionNumber);
    $(".next").on('submit', function(event) {
        $(".question-form").removeClass('hidden');
        $(".correct-feedback").addClass('hidden');
        $(".wrong-feedback").addClass('hidden');
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











