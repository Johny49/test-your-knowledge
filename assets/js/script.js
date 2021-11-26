// score vars
var numCorrectEl = document.getElementById("num-correct");
var questionsAskedEl = document.getElementById("questions-asked");
// timer vars
var secondsRemainingEl = document.getElementById("seconds-remaining");
var gameTime = 120; //set time for game in seconds
// pregame and game card sections
var preGameEl = document.querySelector(".pregame");
var gameCardEl = document.querySelector(".game-card");

// game state
var playingGame = false;


// initial setup and presentation to user
function init() {
    // SET UP UI AND SHOW PREGAME WITH QUIZ OPTIONS FROM QUIZ DATA JSON
}

//set game state, hide pregame and display game-card, start timer
function startGame() {
    playingGame = true;

    preGameEl.style.display = "none";
    gameCardEl.style.display = "block";

    // TODO: start timer here
}

function fireGameTimer(gameTime) {
    var timer = gameTime;

        secondsRemainingEl.textContent = timer;
        timer--;
    
}

function loadQuestionData() {
    // GET QUESTION DATA AND DISPLAY TO USER
}

function checkAnswer() {
// CHECK USER INPUT AGAINST SAVED ANSWER FOR QUESTION
}

function gameOver() {
    //DO STUFF HERE WHEN THE GAME IS DONE
}


// EVENT LISTENERS


