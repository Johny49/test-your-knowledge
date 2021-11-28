// top info section (score and timer)
var topInfoEl = document.querySelector(".top-info");
// score vars
var numCorrectEl = document.getElementById("num-correct");
var numAskedEl = document.getElementById("questions-asked");
// timer-related vars
var secondsRemainingEl = document.getElementById("seconds-remaining");
var gameTimeEl = document.getElementById("game-time");
var gameTime = 120; //set time for game in seconds
// restart btn element to end current game
var restartBtnEl = document.getElementById("restart-btn");
// pregame elements
var preGameEl = document.querySelector(".pregame");
var startBtn = document.getElementById("start-btn");
var quizOptions = document.querySelector(".quiz-options");
// game-card elements
var gameCardEl = document.querySelector(".game-card");
var answerChoicesEl = document.querySelector(".answer-choices");
var answerValidateEl = document.querySelector(".answer-validate");
// postgame element
var postgameEl = document.querySelector(".postgame");
var postgameMessageEl = document.getElementById("postgame-message");
var playAgainBtnEl = document.getElementById("play-again-btn"); 
// quizzes in json
var quizzes;
// game state
var playingGame = false;
var numCorrect = 0;
var numAsked = 0;


// initial ui set up and presentation of pregame to user with quiz options from quiz-data.json
function gameInit() {
    // retrieve quiz names from JSON and set to li
    // getQuizData(loadQuestionData);

    // ensure timer and game info is reset and game state set to false
    gameTime = 120;
    playingGame = false;
    secondsRemainingEl.textContent = gameTime;
    gameTimeEl.textContent = gameTime;
    numCorrect = 0;
    numCorrectEl.textContent = numCorrect;
    numAsked = 0;
    numAskedEl.textContent = numAsked;
}

// set game state, hide pregame and display game-card, start timer
function startGame() {
    playingGame = true;

    preGameEl.style.display = "none";
    postgameEl.style.display = "none";
    restartBtnEl.style.display = "inline-block";
    topInfoEl.style.display = "inline-block";
    gameCardEl.style.display = "flex";

    // display and start game timer
    topInfoEl.style.display = "flex";
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

// RETRIEVE QUIZZES FROM JSON
async function getQuizData() {
    const response = fetch("/assets/data/quiz-data.json")
    .then(response => response.json()) 
    .then(jsonObject => console.log(jsonObject));

    console.log(response.json());
    // {
    //     if (response.ok) {
    //         quizzes= response.json();
    //         // return response.json();
    //     }
    //     return Promise.reject(response);
    // }).catch(function (error) {
    //     console.warn(error);
    //     alert("Unable to load quizzes.");
    // });

}

function loadQuestionData() {
    var questionEl = document.querySelector(".question");

    // GET QUESTION DATA AND DISPLAY TO USER 
    // quizzes = JSON.parse(quizJson);
    // console.log(quizzes);
    quiz = quizJson["JavaScript Quiz"];
    qNum = ("q" + numAsked);
    // console.log(quiz.qNum[0]);
    var xyz = quiz.q0.choices[3];
    console.log(xyz);

    var question = quiz.q0.question;
    var choices = quiz.q0.choices;
    // ["first choice", "second choice", "third choice", "fourth choice"];

    //show question
    questionEl.textContent = question;

    // iterate choices and show on screen
    for (choice in choices) {
        answerChoicesEl.children[choice].textContent = choices[choice];
        }
    };

function checkAnswer(userAnswer) {
    console.log("ua =" + userAnswer);
    var answer = 1;
    // CHECK USER INPUT AGAINST SAVED ANSWER FOR QUESTION
    if (userAnswer == answer) {
        // create and style CORRECT MESSAGE and update display 
        answerValidateEl.textContent = "CORRECT";
        answerValidateEl.style.background = "green";
        numCorrect++;
        numCorrectEl.textContent = numCorrect;
    } else {
        // create and style WRONG MESSAGE and update display 
        answerValidateEl.textContent = "WRONG";
        answerValidateEl.style.background = "red";
        // check time remaining; if at least 10 seconds, subtract from timer; otherwise end game.
        if (gameTime > 10) {
            gameTime -= 10; // subtract 10 seconds from clock
            gameTimeEl = gameTime; // update display with new time
        } else {
            gameTime = 0;
            gameOver();
        }
    }
        // update questions asked
        numAsked++;
        numAskedEl.textContent =numAsked;
        // load next question if numasked <=9; otherwise end game after 2 sec. delay (to allow user to see result of final question)
        (numAsked <= 9) ? loadQuestionData() : setTimeout(gameOver, 2000);
}

// display score, reset to initial and show postgame when game ends
function gameOver() {
    postgameMessageEl.textContent = "You answered " + numCorrect + " out of " + numAsked + "!"

    //TODO add check for high score and update as needed

    gameInit();
    restartBtnEl.style.display = "none";
    topInfoEl.style.display = "none";
    gameCardEl.style.display = "none";
    postgameEl.style.display = "block";
    console.log("GAME OVER MAN");
}

//Set up quiz for initial play
gameInit();

// EVENT LISTENERS
// game start btn clicked
startBtn.addEventListener("click", startGame);
// end current game and reset
restartBtnEl.addEventListener("click", gameOver);
// listener for answer choices clicked
answerChoicesEl.addEventListener("click", function(e) {
    checkAnswer(e.target.id);
});
// play again 
playAgainBtnEl.addEventListener("click", startGame);

// // RETRIEVE QUIZZES FROM JSON
// async function getQuizData() {
//     const response = await fetch("/assets/data/quiz-data.json");
//     quizzes= await response.json();
//     // console.log(response.status)
//     if (response.status == 200) {
//         getQuizData()
//     } else {
//         alert("Unable to load quizzes.");
//     }

// }

var quizJson = {
    "JavaScript Quiz": {
        "q0": {
            "question": "Ask a question here?",
            "choices": [
                "first choice",
                "second choice",
                "third choice",
                "fourth choice"
            ],
            "answer": "a"
        },
        "q1": {
            "question": "Ask a question here?",
            "choices": [ 
                "first choice",
                "second choice",
                "third choice",
                "fourth choice"
            ],
            "answer": "c"
        },
        "q2": {
            "question": "Ask a question here?",
            "choices": [
                "first choice",
                "second choice",
                "third choice",
                "fourth choice"
            ],
            "answer": "c"
        },
        "q3": {
            "question": "Ask a question here?",
            "choices": [
                "first choice",
                "second choice",
                "third choice",
                "fourth choice"
            ],
            "answer": "d"
        },
        "q4": {
            "question": "Ask a question here?",
            "choices": [
                "first choice",
                "second choice",
                "third choice",
                "fourth choice"
            ],
            "answer": "a"
        },
        "q5": {
            "question": "Ask a question here?",
            "choices": [
                "first choice",
                "second choice",
                "third choice",
                "fourth choice"
            ],
            "answer": "a"
        },
        "q6": {
            "question": "Ask a question here?",
            "choices": [
                "first choice",
                "second choice",
                "third choice",
                "fourth choice"
            ],
            "answer": "d"
        },
        "q7": {
            "question": "Ask a question here?",
            "choices": [
                "first choice",
                "second choice",
                "third choice",
                "fourth choice"
            ],
            "answer": "b"
        },
        "q8": {
            "question": "Ask a question here?",
            "choices": [
                "first choice",
                "second choice",
                "third choice",
                "fourth choice"
            ],
            "answer": "b"
        },
        "q9": {
            "question": "Ask a question here?",
            "choices": [
                "first choice",
                "second choice",
                "third choice",
                "fourth choice"
            ],
            "answer": "d"
        }
    },
    "Cat Quiz": {
        "q0": {
            "question": "Ask a question here?",
            "choices": [
                "first choice",
                "second choice",
                "third choice",
                "fourth choice"
            ],
            "answer": "a"
        },
        "q1": {
            "question": "Ask a question here?",
            "choices": [
                "first choice",
                "second choice",
                "third choice",
                "fourth choice"
            ],
            "answer": "c"
        },
        "q2": {
            "question": "Ask a question here?",
            "choices": [
                "first choice",
                "second choice",
                "third choice",
                "fourth choice"
            ],
            "answer": "c"
        },
        "q3": {
            "question": "Ask a question here?",
            "choices": [
                "first choice",
                "second choice",
                "third choice",
                "fourth choice"
            ],
            "answer": "d"
        },
        "q4": {
            "question": "Ask a question here?",
            "choices": [
                "first choice",
                "second choice",
                "third choice",
                "fourth choice"
            ],
            "answer": "a"
        },
        "q5": {
            "question": "Ask a question here?",
            "choices": [
                "first choice",
                "second choice",
                "third choice",
                "fourth choice"
            ],
            "answer": "a"
        },
        "q6": {
            "question": "Ask a question here?",
            "choices": [
                "first choice",
                "second choice",
                "third choice",
                "fourth choice"
            ],
            "answer": "d"
        },
        "q7": {
            "question": "Ask a question here?",
            "choices": [
                "first choice",
                "second choice",
                "third choice",
                "fourth choice"
            ],
            "answer": "b"
        },
        "q8": {
            "question": "Ask a question here?",
            "choices": [
                "first choice",
                "second choice",
                "third choice",
                "fourth choice"
            ],
            "answer": "b"
        },
        "q9": {
            "question": "Ask a question here?",
            "choices": [
                "first choice",
                "second choice",
                "third choice",
                "fourth choice"
            ],
            "answer": "d"
        }
    }
};