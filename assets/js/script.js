// score vars
var numCorrectEl = document.getElementById("num-correct");
var questionsAskedEl = document.getElementById("questions-asked");
// timer-related vars
var secondsRemainingEl = document.getElementById("seconds-remaining");
var gameTimeEl = document.getElementById("game-time");
var gameTime = 120; //set time for game in seconds
// pregame elements
var preGameEl = document.querySelector(".pregame");
var startBtn = document.getElementById("start-btn");
var quizOptions = document.querySelector(".quiz-options");
// game-card elements
var gameCardEl = document.querySelector(".game-card");
var answerChoicesEl = document.querySelector(".answer-choices");
// postgame element
var postgameEl = document.querySelector(".postgame");
// quizzes in json
var quizzes;
// game state
var playingGame = false;
var numCorrect = 0;
var numAsked = 0;


// initial ui set up and presentation of pregame to user with quiz options from quiz-data.json
function init() {
    // retrieve quiz names from JSON and set to li
    // getQuizData(loadQuestionData);


    secondsRemainingEl.textContent = gameTime;
    gameTimeEl.textContent = gameTime;


}

// set game state, hide pregame and display game-card, start timer
function startGame() {
    playingGame = true;

    preGameEl.style.display = "none";
    gameCardEl.style.display = "block";

    // start game timer
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

    var question = "What is the question that goes here?";
    var choices = ["first choice", "second choice", "third choice", "fourth choice"];

    //show question
    questionEl.textContent = question;

    // iterate choices and show on screen
    for (choice in choices) {
        answerChoicesEl.children[choice].textContent = choices[choice];
        }
    };

function checkAnswer(userAnswer) {
    console.log(userAnswer);
    var answer = 1;
    // CHECK USER INPUT AGAINST SAVED ANSWER FOR QUESTION
    if (userAnswer === answer) {
        // Display CORRECT MESSAGE AND UPDATE 
        console.log("CORRECT");
        numCorrect++;
    } else {
        // Display WRONG MESSAGE
        console.log("WRONG");
        // check time remaining; if at least 10 seconds, subtract from timer; otherwise end game.
        if (gameTime > 10) {
            gameTime -= 10; // subtract 10 seconds from clock
        } else {
            clearInterval(timeInterval);
            gameOver();
        }
    }
        // update questions asked
        numAsked++;
}

function gameOver() {
    //DO STUFF HERE WHEN THE GAME IS DONE
    playingGame = false;
    gameCardEl.style.display = "none";
    postgameEl.style.display = "block";
    console.log("GAME OVER MAN");
}


init();

// EVENT LISTENERS
// game start btn clicked
startBtn.addEventListener("click", startGame);
// listener for answer choices clicked
answerChoicesEl.addEventListener("click", checkAnswer(this.id));


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
        },
        "q10": {
            "question": "Ask a question here?",
            "choices": [
                "first choice",
                "second choice",
                "third choice",
                "fourth choice"
            ],
            "answer": "a"
        }
    },
    "Cat Quiz": {
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
        },
        "q10": {
            "question": "Ask a question here?",
            "choices": [
                "first choice",
                "second choice",
                "third choice",
                "fourth choice"
            ],
            "answer": "a"
        }
    }
};