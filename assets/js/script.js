// score vars
var numCorrectEl = document.getElementById("num-correct");
var questionsAskedEl = document.getElementById("questions-asked");
// timer-related vars
var secondsRemainingEl = document.getElementById("seconds-remaining");
var gameTimeEl = document.getElementById("game-time");
var gameTime = 120; //set time for game in seconds
// pregame and game card sections
var preGameEl = document.querySelector(".pregame");
var startBtn = document.getElementById("start-btn");
var quizOptions = document.querySelector(".quiz-options");
var gameCardEl = document.querySelector(".game-card");

// game state
var playingGame = false;


// initial ui set up and presentation of pregame to user with quiz options from quiz-data.json
function init() {
    secondsRemainingEl.textContent = gameTime;
    gameTimeEl.textContent = gameTime;

// TODO get quiz names from JSON and set to li
}

// et game state, hide pregame and display game-card, start timer
function startGame() {
    playingGame = true;

    preGameEl.style.display = "none";
    gameCardEl.style.display = "block";

    // start game timer
    fireGameTimer(gameTime);
}

// start countdown timer and refresh display every 1000ms
function fireGameTimer(time) {
    var timer = time;

    var timeInterval = setInterval(function () {
        secondsRemainingEl.textContent = timer;
        console.log(timer)

        if (timer > 0 && timer > 9) {
            secondsRemainingEl.textContent = timer;
            timer--;
        } else if (timer <= 9 && timer > 0) {
            // set color when time runs out
            secondsRemainingEl.style.color = "red";
            secondsRemainingEl.style.fontSize = "2em";

            secondsRemainingEl.textContent = timer;
            timer--;
        } else {
            clearInterval(timeInterval);
            gameOver();
        } 
    }, 1000);    
}

function loadQuestionData() {
    // GET QUESTION DATA AND DISPLAY TO USER
}

function checkAnswer() {
// CHECK USER INPUT AGAINST SAVED ANSWER FOR QUESTION
}

function gameOver() {
    //DO STUFF HERE WHEN THE GAME IS DONE
    playingGame = false;
    console.log("GAME OVER MAN");
}


init();

// EVENT LISTENERS
startBtn.addEventListener("click", startGame);

