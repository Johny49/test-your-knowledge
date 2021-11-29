var scoreListEl = document.querySelector(".score-list");

// check local storage for saved scores, display if exists
function loadSavedScores() {
 var savedScores = localStorage.getItem(saved-scores);
 if (savedScores) {
    for (score in savedScores) {
        var output = savedScores[score];
        scoreListEl.children[score].textContent = output;
    }
 }
};