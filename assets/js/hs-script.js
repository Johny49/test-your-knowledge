var scoreListEl = document.querySelector(".score-list");

// check local storage for saved scores, display if exists
function loadSavedScores() {
    var savedScores = JSON.parse(localStorage.getItem("savedScores")) || [];

    // sort scores
        console.log(savedScores.sort(sortScores));

    // add elements and display scores
    for (score in savedScores) {
        var output = savedScores[score]["initials"] + " - " + savedScores[score]["score"];
        console.log(output)
        var newLi = document.createElement("li");
        newLi.textContent = output;
        scoreListEl.appendChild(newLi);
    }
};

function sortScores(a, b) {
    const scoreA = a.score;
    const scoreB = b.score;

    let comparison = 0;
    if (scoreA > scoreB) {
        comparison = 1;
    } else if (scoreA < scoreB) {
        comparison = -1;
    }
    return comparison * -1;
}

loadSavedScores();

// function to return to main page when Go Back to Game button pressed
function goBack() {
    window.history.back();
}