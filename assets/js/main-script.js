// top info section (score and timer)
var topInfoEl = document.querySelector(".top-info");
// score vars
var numCorrectEl = document.getElementById("num-correct");
var numAskedEl = document.getElementById("questions-asked");
// timer-related vars
var secondsRemainingEl = document.getElementById("seconds-remaining");
var gameTime = 120; //set time for game in seconds
// restart btn element to end current game
var restartBtnEl = document.getElementById("restart-btn");
// pregame elements
var preGameEl = document.querySelector(".pregame");
var startBtn = document.getElementById("start-btn");
var quizOptions = document.querySelector(".quiz-options");
// game-card elements
var gameCardEl = document.querySelector(".game-card");
var questionEl = document.querySelector(".question");
var answerChoicesEl = document.querySelector(".answer-choices");
var answerValidateEl = document.querySelector(".answer-validate");
// postgame element
var postgameEl = document.querySelector(".postgame");
var postgameMessageEl = document.getElementById("postgame-message");
var playAgainBtnEl = document.getElementById("play-again-btn"); 
// high score form elements
var initialsInputEl = document.getElementById("initials-input");
var submitHighScoreBtn = document.getElementById("submit-high-score-btn");
// game state
var playingGame = false;

// track questions correct and attempted
var numCorrect = 0;
var numAsked = 0;

// control whether we are at START, PLAYING, OR SCORE SCREEN
function manageState(state) {
    switch (state) {
        case "PREGAME": {
            preGameEl.style.display = "flex";
            topInfoEl.style.display = "none";
            gameCardEl.style.display = "none";
            restartBtnEl.style.display = "none";
            postgameEl.style.display = "none";
            break;
        }
        case "PLAYING": {
            preGameEl.style.display = "none";
            topInfoEl.style.display = "flex";
            gameCardEl.style.display = "flex";
            restartBtnEl.style.display = "inline-block";
            postgameEl.style.display = "none";
            break;
        }
        case "POSTGAME": {
            preGameEl.style.display = "none";
            topInfoEl.style.display = "none";
            gameCardEl.style.display = "none";
            restartBtnEl.style.display = "none";
            postgameEl.style.display = "flex";
            break;
        }
        default: {
            console.log("Something went wrong. Current state is " + state);
        }
    }

}

// initial ui set up and presentation of pregame to user with quiz options from quiz-data.json
function gameInit() {
    manageState("PREGAME");
    // ensure timer and game info is reset and game state set to false
    gameTime = 120;
    secondsRemainingEl.textContent = gameTime;
    // reset style on seconds element so it isn't red
    secondsRemainingEl.style.color = "darkblue";
    secondsRemainingEl.style.fontSize = "1.5em";

    numCorrect = 0;
    numCorrectEl.textContent = numCorrect;
    numAsked = 0;
    numAskedEl.textContent = numAsked;
}

// set game state, hide pregame and display game-card, start timer
function startGame() {
    manageState("PLAYING");
    // display and start game timer
    fireGameTimer(gameTime);
    loadQuestionData();
}

// start countdown timer and refresh display every 1000ms
function fireGameTimer() {
    var timeInterval = setInterval(function () {
        secondsRemainingEl.textContent = gameTime;

        if (gameTime > 0 && gameTime > 9) {
            secondsRemainingEl.textContent = gameTime;
            gameTime--;
        } else if (gameTime <= 9 && gameTime > 0) {
            // set color when time runs out
            secondsRemainingEl.style.color = "red";
            secondsRemainingEl.style.fontSize = "2em";

            secondsRemainingEl.textContent = gameTime;
            gameTime--;
        } else {
            clearInterval(timeInterval);
            gameOver();
        } 
    }, 1000);    
}

function loadQuestionData() {
    //show next question based on number of questions already asked (numAsked var)
    var question = quizdata[numAsked].question;
    questionEl.textContent = question;

    // show corresponding choices in answer-choices ol
    var choices = quizdata[numAsked].choices;
    for (choice in choices) {
        answerChoicesEl.children[choice].textContent = choices[choice];
        }
    };

function checkAnswer(userAnswer) {
    console.log("ua =" + userAnswer);
    // get saved answer for current question
    var answer = quizdata[numAsked].answer;

    // Check User Input Against Saved Answer For Question
    if (userAnswer == answer) {
        showResult(true);
        //increase score and update element
        numCorrect++;
        numCorrectEl.textContent = numCorrect;
    } else {
        showResult(false);
        // check time remaining; if at least 10 seconds, subtract from timer; otherwise end game.
        if (gameTime > 10) {
            gameTime -= 10; // subtract 10 seconds from clock
        } else {
            gameTime = 0;
            gameOver();
        }
    }
        // update questions asked
        numAsked++;
        numAskedEl.textContent =numAsked;
        // load next question if numasked <=9; otherwise end game after 1.5 sec. delay (to allow user to see result of final question)
        (numAsked <= 9) ? loadQuestionData() : setTimeout(gameOver, 1500);
}

function showResult(result) {
if (result) {
    // create and style CORRECT MESSAGE and update display 
    answerValidateEl.textContent = "CORRECT";
    answerValidateEl.style.background = "green";
    } else {
        // create and style WRONG MESSAGE and update display 
        answerValidateEl.textContent = "WRONG";
        answerValidateEl.style.background = "red";
    }
}

// display score, reset to initial and show postgame when game ends
function gameOver() {
    manageState("POSTGAME");
    postgameMessageEl.textContent = "You answered " + numCorrect + " out of " + numAsked + "!";
}

function submitHighScore(event) {
    event.preventDefault();

    var savedScores = JSON.parse(localStorage.getItem("savedScores")) || [];
    var newScore = {
      initials: initialsInputEl.value,
      score: numCorrect
    };
    savedScores.push(newScore);
    // store object in storage and JSON.stringify to convert it as a string
    localStorage.setItem("savedScores", JSON.stringify(savedScores));

    alert("Your score has been saved");
}

// EVENT LISTENERS
// game start btn clicked
startBtn.addEventListener("click", startGame);
// end current game and reset
restartBtnEl.addEventListener("click", gameOver);
// listener for answer choices clicked
answerChoicesEl.addEventListener("click", function(e) {
    checkAnswer(e.target.id);
});
// submit high score
submitHighScoreBtn.addEventListener("click", submitHighScore);
// play again 
playAgainBtnEl.addEventListener("click", gameInit);


//Set up quiz for initial play
gameInit();


// #################################################### //
//     "JavaScript Quiz":
    var quizdata = [
    {
            "question": "Inside which HTML element do we put the JavaScript?",
            "choices": [
                "<script>",
                "<javascript>",
                "<js>",
                "<header>"
            ],
            "answer": "0"
        },
    {
            "question": "Which shows the correct way to write a JavaScript array?",
            "choices": [ 
                "var fruits = (1:\”kiwi\”, 2:\”pear\”, 3:\”apple\”);",
                "var fruits = \“kiwi\”, \“pear\”, \“apple\”;",
                "var fruits = [\“kiwi\”, \“pear\”, \“apple\”];",
                "var fruits = 1 = (\“kiwi\”), 2 = (\“pear\”), 3 = (\“apple\”);"
            ],
            "answer": "2"
        },
        {
            "question": "Which event occurs when the user clicks on an HTML element?",
            "choices": [
                "onmouseover",
                "onmouseclick",
                "onclick",
                "onbutton"
            ],
            "answer": "2"
        },
        {
            "question": "8. Which of the following is not a reserved word in JavaScript?",
            "choices": [
                "throws",
                "short",
                "interface",
                "program"
            ],
            "answer": "3"
        },
        {
            "question": "What is the correct syntax for referring to an external script called main.js”",
            "choices": [
                "<script src=\”main.js\”",
                "<script href=\”main.js\”>",
                "<script name=\”main.js\”>",
                "<script ref=\"main.js\”>"
            ],
            "answer": "0"
        },
        {
            "question": "Which built-in method returns the character at the specified index?",
            "choices": [
                "charAt",
                "characterAt",
                "getCharAt",
                "showChar"
            ],
            "answer": "0"
        },
        {
            "question": "How can you get the type of arguments passed to a function?",
            "choices": [
                "using the toString method",
                "using the getType method",
                "using the charCodeAt method",
                "using the typeof operator"
            ],
            "answer": "3"
        },
        {
            "question": "Which function can be used to add a new item to the end of an array?",
            "choices": [
                "pull()",
                "push()",
                "pop()",
                "shift()"
            ],
            "answer": "1"
        },
        {
            "question": "Which type of variable is only visible within the function where it is defined?",
            "choices": [
                "global",
                "local",
                "both are correct",
                "neither are correct"
            ],
            "answer": "1"
        },
        {
            "question": "What is the correct syntax to display \"Hello\" in an alert box using JavaScript?",
            "choices": [
                "msgbox(\"Hello\");",
                "alertbox(\"Hello\");",
                "msg(\"Hello\");",
                "alert(\"Hello\");"
            ],
            "answer": "3"
        }
    ];