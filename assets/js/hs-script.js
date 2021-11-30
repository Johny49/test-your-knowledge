var scoreListEl = document.querySelector(".score-list");

// check local storage for saved scores, display if exists
function loadSavedScores() {
 var savedScores = localStorage.getItem(savedScores);
 if (savedScores) {
    for (score in savedScores) {
        var output = savedScores[score];
        console.log(output);
        scoreListEl.children[score].textContent = output;
    }
 }
};

// function to return to main page when Go Back to Game button pressed
function goBack() {
    window.history.back();
}